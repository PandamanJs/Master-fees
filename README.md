# Master Fees - School Payment System

A modern school fee management system designed to simplify payment collection for schools and parents.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Environment variables configured (see `.env.example`)

### Local Development
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

The application will be available at `http://localhost:5000`

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** with shadcn/ui components
- **TanStack Query** for state management
- **Wouter** for routing

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **PostgreSQL** with Drizzle ORM
- **RESTful API** design

## 📦 Deployment

This application is configured for deployment on multiple hosting providers:

### Replit
Already configured and ready to deploy.

### Railway
```bash
railway login
railway init
railway up
```

### Render
1. Connect your GitHub repository
2. Use the provided `render.yaml` configuration
3. Set environment variables in Render dashboard

### Vercel
```bash
vercel login
vercel --prod
```

### Fly.io
```bash
fly auth login
fly launch
fly deploy
```

### Docker
```bash
# Build image
docker build -t master-fees .

# Run container
docker run -p 5000:5000 -e DATABASE_URL=your_db_url master-fees
```

### VPS/Traditional Hosting
```bash
# Build the application
npm run build

# Use PM2 for production
npm install -g pm2
pm2 start ecosystem.config.js
```

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `PORT` | No | Server port (default: 5000) |
| `NODE_ENV` | No | Environment (development/production) |
| `OPENAI_API_KEY` | No | For AI features |
| `FIGMA_ACCESS_TOKEN` | No | For Figma integration |
| `SENDGRID_API_KEY` | No | For email notifications |
| `TWILIO_*` | No | For SMS notifications |

## 🏥 Health Checks

The application includes health check endpoints:
- `GET /api/health` - Comprehensive health check with database test
- `GET /api/ping` - Simple ping endpoint

## 🔒 Security Features

- Rate limiting on all endpoints
- Input validation with Zod schemas
- Lazy initialization of external services
- Secure error handling
- Environment-based configuration

## 📊 Features

- School onboarding system
- Payment management
- Student registration
- Aptitude testing platform
- SMS/Email notifications
- Figma design integration
- QuickBooks integration
- AI-powered school suggestions

## 🛠️ Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema

### Database
Uses Drizzle ORM with PostgreSQL. Schema is defined in `shared/schema.ts`.

## 📝 License

MIT License - see LICENSE file for details.