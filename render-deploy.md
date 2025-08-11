# Render Deployment Guide for Master Fees

## Quick Setup

1. **Connect Repository**: Link your GitHub repository to Render
2. **Create Web Service**: 
   - Service Type: Web Service
   - Build Command: `npm ci && npm run build`
   - Start Command: `npm start`
   - Node Version: 20

## Environment Variables (Required)

Set these in Render Dashboard:

```
NODE_ENV=production
DATABASE_URL=<your_postgres_connection_string>
```

## Optional Environment Variables

```
OPENAI_API_KEY=<your_openai_key>
FIGMA_ACCESS_TOKEN=<your_figma_token>
SENDGRID_API_KEY=<your_sendgrid_key>
TWILIO_ACCOUNT_SID=<your_twilio_sid>
TWILIO_AUTH_TOKEN=<your_twilio_token>
TWILIO_PHONE_NUMBER=<your_twilio_phone>
```

## Database Setup

1. **Create PostgreSQL Database** in Render Dashboard
2. **Copy the DATABASE_URL** from database settings
3. **Set DATABASE_URL** environment variable in your web service
4. **Database will auto-migrate** on first deployment

## Build Configuration

The application is configured with:
- ✅ Automatic port detection (Render sets PORT automatically)
- ✅ Production static file serving
- ✅ Database connection with Neon PostgreSQL
- ✅ Health check endpoint at `/api/health`
- ✅ Error handling and logging

## Common Issues & Solutions

### Build Fails
- Ensure Node.js version is 20+ in Render settings
- Check build logs for specific errors
- Verify all dependencies are in package.json

### App Won't Start
- Check that DATABASE_URL is set correctly
- Verify the start command is `npm start`
- Review application logs for errors

### Database Connection Issues
- Confirm DATABASE_URL format: `postgresql://user:pass@host:port/dbname`
- Ensure database is running and accessible
- Check firewall/network settings

### Static Files Not Loading
- Build process creates `client/dist` folder automatically
- Application detects production mode and serves static files
- Verify build completed successfully

## Health Check

Test your deployment:
```bash
curl https://your-app.onrender.com/api/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2025-08-11T...",
  "environment": "production",
  "database": "connected",
  "version": "1.0.0"
}
```

## Deployment Steps

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy
5. Monitor build logs
6. Test health endpoint
7. Verify application functionality

## Support

If deployment fails:
1. Check Render build logs
2. Verify environment variables
3. Test database connection
4. Review application logs
5. Check the health endpoint response