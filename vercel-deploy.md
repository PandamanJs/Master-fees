# Vercel Deployment Guide for Master Fees

## Quick Setup

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Login**: `vercel login`
3. **Deploy**: `vercel --prod`

## Environment Variables (Required)

Set these in Vercel Dashboard or via CLI:

```bash
# Required
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production

# Optional (features disabled if missing)
OPENAI_API_KEY=sk-...
FIGMA_ACCESS_TOKEN=figd_...
SENDGRID_API_KEY=SG...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...
```

## Vercel Configuration

The `vercel.json` file is configured to:
- Build the application as a serverless function
- Route API calls to `/api/*` to the server
- Route all other requests to the server for SPA handling
- Include necessary files for deployment

## Common Issues & Solutions

### 404 Errors
**Cause**: Vercel routing configuration issues
**Solution**: 
1. **Build first**: Run `npm run build` locally to create `dist/index.js`
2. **Check vercel.json**: Ensure it points to `dist/index.js`
3. **Verify exports**: Server must export Express app as default
4. **Environment variables**: Set `DATABASE_URL` and `NODE_ENV=production`

### Fix for Current 404 Issue:
```bash
# 1. Build the project
npm run build

# 2. Deploy with correct configuration
vercel --prod

# 3. Set environment variables in Vercel dashboard:
#    DATABASE_URL=your_postgres_url
#    NODE_ENV=production
```

### Build Failures
**Cause**: Missing dependencies or build script issues
**Solution**:
- Ensure all dependencies are in `package.json`
- Verify build script works locally: `npm run build`
- Check Node.js version compatibility

### Database Connection Issues
**Cause**: Environment variables not set
**Solution**:
- Set `DATABASE_URL` in Vercel dashboard
- Ensure database allows connections from Vercel IPs
- Test connection string locally

### Function Timeout
**Cause**: Long-running operations
**Solution**:
- Database queries are optimized
- External API calls have timeouts
- Health checks are lightweight

## Deployment Steps

1. **Prepare Repository**:
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push
   ```

2. **Deploy via CLI**:
   ```bash
   vercel --prod
   ```

3. **Or Deploy via Dashboard**:
   - Connect GitHub repository
   - Set environment variables
   - Deploy

4. **Verify Deployment**:
   ```bash
   curl https://your-app.vercel.app/api/health
   ```

## Project Structure for Vercel

```
project/
├── server/           # Server code (becomes serverless function)
├── client/dist/      # Built frontend assets
├── shared/           # Shared schemas and types
├── vercel.json       # Vercel configuration
└── package.json      # Dependencies and scripts
```

## Performance Optimizations

- **Cold Start**: Minimized by lazy loading external services
- **Bundle Size**: Server code optimized for serverless
- **Database**: Connection pooling with Neon serverless
- **Static Assets**: Served efficiently by Vercel CDN

## Monitoring

- **Health Check**: `/api/health` endpoint
- **Logs**: Available in Vercel dashboard
- **Analytics**: Built-in Vercel analytics
- **Errors**: Automatic error tracking

## Troubleshooting

### Check Deployment Status
```bash
vercel ls
```

### View Logs
```bash
vercel logs your-deployment-url
```

### Test Locally
```bash
vercel dev
```

### Redeploy
```bash
vercel --prod --force
```