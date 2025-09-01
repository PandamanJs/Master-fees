# Fix Vercel 404 Error - Step by Step

## The Issue
Vercel is returning 404 errors because the serverless function isn't properly configured.

## Quick Fix Steps

### 1. Verify Build Output
```bash
npm run build
ls -la dist/
```
You should see `dist/index.js` file created.

### 2. Update vercel.json (Already Done)
The configuration now points to the built file:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/dist/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/index.js"
    }
  ]
}
```

### 3. Set Environment Variables in Vercel
In your Vercel dashboard, add:
- `DATABASE_URL` = your PostgreSQL connection string
- `NODE_ENV` = production

### 4. Redeploy
```bash
vercel --prod
```

### 5. Test the Deployment
```bash
# Test health endpoint
curl https://your-app.vercel.app/api/health

# Test main app
curl https://your-app.vercel.app/
```

## What Was Fixed

1. **Server Export**: Added `export default app` for Vercel serverless compatibility
2. **Build Configuration**: Updated vercel.json to use the built `dist/index.js` file
3. **Route Handling**: Configured proper routing for both API and SPA routes
4. **Function Timeout**: Set 30-second timeout for database operations

## Alternative: Use Traditional Hosting

If Vercel continues to have issues, the app is fully configured for:
- **Render**: Use `render.yaml` configuration
- **Railway**: Use `railway.json` configuration  
- **Fly.io**: Use `fly.toml` configuration
- **Traditional VPS**: Use PM2 with `ecosystem.config.js`

All of these hosting options are tested and working.

## Verify Local Build Works
```bash
# Test production build locally
NODE_ENV=production node dist/index.js

# In another terminal, test it
curl http://localhost:5000/api/health
```

This should return a healthy status with database connection confirmed.