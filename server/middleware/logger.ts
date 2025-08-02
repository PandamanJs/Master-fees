import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

// Log levels
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  meta?: any;
  requestId?: string;
  ip?: string;
  userAgent?: string;
  method?: string;
  url?: string;
  statusCode?: number;
  responseTime?: number;
}

class Logger {
  private logLevel: LogLevel;
  private logDir: string;

  constructor(logLevel: LogLevel = LogLevel.INFO) {
    this.logLevel = logLevel;
    this.logDir = path.join(process.cwd(), 'logs');
    this.ensureLogDirectory();
  }

  private ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel;
  }

  private formatLogEntry(entry: LogEntry): string {
    return JSON.stringify(entry) + '\n';
  }

  private writeToFile(filename: string, content: string) {
    const filePath = path.join(this.logDir, filename);
    fs.appendFileSync(filePath, content);
  }

  private log(level: LogLevel, levelName: string, message: string, meta?: any, requestContext?: Partial<LogEntry>) {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: levelName,
      message,
      ...requestContext,
      ...(meta && { meta })
    };

    // Console output with colors
    const colors = {
      ERROR: '\x1b[31m', // Red
      WARN: '\x1b[33m',  // Yellow
      INFO: '\x1b[36m',  // Cyan
      DEBUG: '\x1b[90m', // Gray
      RESET: '\x1b[0m'
    };

    console.log(
      `${colors[levelName as keyof typeof colors]}[${entry.timestamp}] ${levelName}: ${message}${colors.RESET}`,
      meta ? JSON.stringify(meta, null, 2) : ''
    );

    // File output
    const today = new Date().toISOString().split('T')[0];
    this.writeToFile(`app-${today}.log`, this.formatLogEntry(entry));

    // Error-specific file
    if (level === LogLevel.ERROR) {
      this.writeToFile(`error-${today}.log`, this.formatLogEntry(entry));
    }
  }

  error(message: string, meta?: any, requestContext?: Partial<LogEntry>) {
    this.log(LogLevel.ERROR, 'ERROR', message, meta, requestContext);
  }

  warn(message: string, meta?: any, requestContext?: Partial<LogEntry>) {
    this.log(LogLevel.WARN, 'WARN', message, meta, requestContext);
  }

  info(message: string, meta?: any, requestContext?: Partial<LogEntry>) {
    this.log(LogLevel.INFO, 'INFO', message, meta, requestContext);
  }

  debug(message: string, meta?: any, requestContext?: Partial<LogEntry>) {
    this.log(LogLevel.DEBUG, 'DEBUG', message, meta, requestContext);
  }
}

// Global logger instance
export const logger = new Logger(
  process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO
);

// Request ID generator
function generateRequestId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Express middleware for request logging
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const requestId = generateRequestId();
  const startTime = Date.now();

  // Add request ID to request object for use in other middlewares
  (req as any).requestId = requestId;

  const requestContext = {
    requestId,
    ip: req.ip || req.socket.remoteAddress,
    userAgent: req.get('User-Agent'),
    method: req.method,
    url: req.originalUrl || req.url
  };

  // Log incoming request
  logger.info(`${req.method} ${req.originalUrl || req.url}`, {
    body: req.method !== 'GET' ? req.body : undefined,
    query: Object.keys(req.query).length > 0 ? req.query : undefined,
    headers: {
      'content-type': req.get('Content-Type'),
      'accept': req.get('Accept'),
      'authorization': req.get('Authorization') ? '[REDACTED]' : undefined
    }
  }, requestContext);

  // Hook into response to log completion
  const originalSend = res.send;
  res.send = function(body) {
    const responseTime = Date.now() - startTime;
    
    logger.info(`${req.method} ${req.originalUrl || req.url} - ${res.statusCode}`, {
      responseTime: `${responseTime}ms`,
      contentLength: res.get('Content-Length'),
      ...(res.statusCode >= 400 && { responseBody: body })
    }, {
      ...requestContext,
      statusCode: res.statusCode,
      responseTime
    });

    return originalSend.call(this, body);
  };

  next();
}

// Error logging middleware
export function errorLogger(error: Error, req: Request, res: Response, next: NextFunction) {
  const requestContext = {
    requestId: (req as any).requestId,
    ip: req.ip || req.socket.remoteAddress,
    userAgent: req.get('User-Agent'),
    method: req.method,
    url: req.originalUrl || req.url
  };

  logger.error(`Unhandled error: ${error.message}`, {
    stack: error.stack,
    body: req.body,
    query: req.query,
    params: req.params
  }, requestContext);

  next(error);
}

// Performance monitoring
export function performanceMonitor() {
  const startTime = process.hrtime();
  const startUsage = process.cpuUsage();

  return {
    end: (operation: string) => {
      const endTime = process.hrtime(startTime);
      const endUsage = process.cpuUsage(startUsage);
      
      const duration = endTime[0] * 1000 + endTime[1] / 1000000; // Convert to milliseconds
      const cpuUsage = {
        user: endUsage.user / 1000, // Convert to milliseconds
        system: endUsage.system / 1000
      };

      logger.info(`Performance: ${operation}`, {
        duration: `${duration.toFixed(2)}ms`,
        cpu: {
          user: `${cpuUsage.user.toFixed(2)}ms`,
          system: `${cpuUsage.system.toFixed(2)}ms`
        },
        memory: {
          rss: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB`,
          heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`
        }
      });
    }
  };
}