# Deployment Troubleshooting Guide

## Common Hosting Provider Issues

### Render
**Issue**: Build or start failures
**Solutions**:
1. Use build command: `npm ci && npm run build`
2. Use start command: `npm start`
3. Set NODE_ENV=production
4. Ensure DATABASE_URL is configured
5. Use Node.js 20+

### Railway
**Issue**: Port binding errors
**Solutions**:
1. Railway auto-sets PORT variable
2. Application auto-detects PORT from environment
3. Uses 0.0.0.0 host binding for Railway

### Vercel
**Issue**: Serverless function timeouts
**Solutions**:
1. Uses static export for frontend
2. API routes handle serverless execution
3. Database connections use connection pooling

### Fly.io
**Issue**: Health check failures
**Solutions**:
1. Health check endpoint: `/api/health`
2. Uses port 8080 in fly.toml
3. TCP and HTTP health checks configured

### Docker
**Issue**: Multi-stage build problems
**Solutions**:
1. Production-optimized Dockerfile included
2. Non-root user for security
3. Health check with curl

## Environment Variables

Required for all platforms:
```bash
DATABASE_URL=postgresql://...
NODE_ENV=production
```

Optional (features disabled if missing):
```bash
OPENAI_API_KEY=sk-...
FIGMA_ACCESS_TOKEN=figd_...
SENDGRID_API_KEY=SG....
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...
```

## Database Setup

1. **PostgreSQL Required**: Application uses PostgreSQL with Drizzle ORM
2. **Auto-Migration**: Schema pushed automatically with `npm run db:push`
3. **Connection Pooling**: Uses Neon serverless for better performance
4. **Health Checks**: Database connectivity tested in health endpoint

## Build Process

1. **Frontend Build**: `vite build` creates client/dist
2. **Backend Build**: `esbuild` bundles server code
3. **Static Serving**: Production mode serves built frontend
4. **External Dependencies**: Database drivers externalized for compatibility

## Logs and Monitoring

- Application logs to console (structured JSON in production)
- Health endpoint: `/api/health` returns status
- Ping endpoint: `/api/ping` for simple connectivity test
- Rate limiting configured for production traffic

## Quick Test Commands

```bash
# Test health endpoint
curl https://your-app.com/api/health

# Test ping endpoint  
curl https://your-app.com/api/ping

# Test main application
curl https://your-app.com/
```

## Platform-Specific Notes

### Replit Deployment
- Uses existing configuration
- Native PostgreSQL integration
- Automatic environment setup

### Traditional VPS/Server
- Use PM2 configuration: `ecosystem.config.js`
- Nginx reverse proxy recommended
- SSL/TLS certificates required for production

### Container Platforms
- Dockerfile optimized for production
- Health checks included
- Multi-stage build for smaller image size