import { Request, Response, NextFunction } from 'express';
// Using Map for rate limiting without external dependency
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }  
  }
}, 60000); // Clean every minute



interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message?: string; // Error message
  statusCode?: number; // HTTP status code
  skipSuccessfulRequests?: boolean; // Skip successful requests from count
  skipFailedRequests?: boolean; // Skip failed requests from count
  keyGenerator?: (req: Request) => string; // Custom key generator
}

export function createRateLimit(options: RateLimitOptions) {
  const {
    windowMs,
    maxRequests,
    message = 'Too many requests, please try again later.',
    statusCode = 429,
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
    keyGenerator = (req: Request) => req.ip || req.socket.remoteAddress || 'unknown'
  } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    const now = Date.now();
    
    let entry = rateLimitStore.get(key);
    
    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired entry
      entry = {
        count: 0,
        resetTime: now + windowMs
      };
    }
    
    // Check if request should be counted
    const shouldCount = () => {
      if (skipSuccessfulRequests && res.statusCode < 400) return false;
      if (skipFailedRequests && res.statusCode >= 400) return false;
      return true;
    };
    
    // Increment count
    entry.count++;
    rateLimitStore.set(key, entry);
    
    // Set rate limit headers
    res.set({
      'X-RateLimit-Limit': maxRequests.toString(),
      'X-RateLimit-Remaining': Math.max(0, maxRequests - entry.count).toString(),
      'X-RateLimit-Reset': new Date(entry.resetTime).toISOString(),
    });
    
    // Check if limit exceeded
    if (entry.count > maxRequests) {
      return res.status(statusCode).json({
        error: 'Rate limit exceeded',
        message,
        retryAfter: Math.ceil((entry.resetTime - now) / 1000)
      });
    }
    
    // Hook into response to potentially skip counting
    const originalEnd = res.end;
    res.end = function(chunk?: any, encoding?: BufferEncoding) {
      if (!shouldCount()) {
        // Decrement count if we shouldn't count this request
        const currentEntry = rateLimitStore.get(key);
        if (currentEntry) {
          currentEntry.count = Math.max(0, currentEntry.count - 1);
          rateLimitStore.set(key, currentEntry);
        }
      }
      return originalEnd.call(this, chunk, encoding);
    };
    
    next();
  };
}

// Predefined rate limiters for different use cases
export const strictRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests per 15 minutes
  message: 'Too many requests from this IP, please try again after 15 minutes.'
});

export const moderateRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 1000, // 1000 requests per 15 minutes
});

export const lenientRateLimit = createRateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per minute
});

// API-specific rate limiters
export const authRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 login attempts per 15 minutes
  message: 'Too many authentication attempts, please try again later.',
  skipSuccessfulRequests: true
});

export const uploadRateLimit = createRateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  maxRequests: 10, // 10 uploads per 5 minutes
  message: 'Upload rate limit exceeded, please wait before uploading again.'
});

export const apiRateLimit = createRateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  maxRequests: 50, // 50 API requests per minute
  message: 'API rate limit exceeded, please slow down your requests.'
});