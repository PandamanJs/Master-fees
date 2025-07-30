# Master Fees - School Payment System

## Overview

Master Fees is a modern school fee management system designed to simplify payment collection and provide a seamless experience for schools and parents. The application is built as a full-stack web application with a React frontend and Express.js backend.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Comprehensive component library using Radix UI primitives

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API architecture with /api prefix
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reloading with Vite integration

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Shared schema definitions between frontend and backend

## Key Components

### Frontend Components
- **Landing Page**: Complete marketing site with hero, features, pricing, testimonials
- **UI Library**: Extensive component library with 40+ reusable components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **Toast Notifications**: Custom toast system for user feedback

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **User Management**: Basic user CRUD operations
- **API Routes**: Centralized route registration system
- **Error Handling**: Comprehensive error handling middleware

### Shared Resources
- **Schema Definitions**: Shared TypeScript types and Zod validation schemas
- **Database Models**: User model with authentication fields

## Data Flow

1. **Client Requests**: Frontend makes API calls through TanStack Query
2. **API Processing**: Express.js handles requests with proper error handling
3. **Data Storage**: Drizzle ORM manages database operations
4. **Response Handling**: Structured JSON responses with proper status codes
5. **State Management**: React Query manages caching and synchronization

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **UI Framework**: Radix UI for accessible component primitives
- **Styling**: Tailwind CSS for utility-first styling
- **Forms**: React Hook Form with Hookform Resolvers
- **Date Handling**: date-fns for date manipulation
- **Development**: Replit-specific plugins for development environment

### Payment Integration
- Application is structured to support payment gateway integration
- Current focus on Indian market with UPI and card payment support mentioned in UI

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations manage schema changes

### Environment Configuration
- **Development**: NODE_ENV=development with hot reloading
- **Production**: NODE_ENV=production with optimized builds
- **Database**: DATABASE_URL environment variable required

### Hosting
- Configured for Replit deployment with specialized plugins
- Supports both development and production environments
- Static asset serving integrated with Express.js

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- July 30, 2025: Completely removed dark mode, mascot features, and easter eggs
  - Removed ThemeProvider, ThemeToggle, MascotGuide, and DashboardEasterEggs components
  - Cleaned up all dark mode classes from navigation, features, about, contact, and footer
  - Simplified hero section with basic platform preview mockup
  - Updated testimonials section to match new design with "Join our Exclusive test program"
  - Implemented new design with dark gradient background and white content card
  - Added device mockups (mobile and desktop) to showcase platform features
  - Streamlined application to light mode only with professional appearance
  - Replaced all mockup interfaces with actual fee Master interface images
  - Updated both features and testimonials sections to display real mobile payment flow and admin dashboard
  - Added proper image imports using @assets/ syntax for Twalumbu Education Centre interfaces

- July 30, 2025: Implemented comprehensive dark teal/navy and mint green color palette transformation
  - Updated Hero section: Dark teal/navy gradient background with mint green accent buttons and device glows
  - Updated Navigation: Slate-900 background with emerald-400 hover states and mint green CTA button
  - Updated Features section: Light gradient background with emerald-600 icons and emerald-themed animations
  - Updated Testimonials: Dark teal gradient background with emerald/teal/cyan gradient icons and mint green button
  - Updated Contact section: Light background with mint green form focus states and emerald submit button
  - Updated Footer: Dark teal gradient background matching testimonials with emerald hover states
  - Maintained Apple-style animations with updated color glows matching the new palette
  - Applied consistent color theming: Dark sections use slate-900/slate-800/teal-900, Light sections use slate-50/white/slate-100
  - All accent colors now use emerald-400/teal variations for cohesive brand identity

- July 30, 2025: Transformed panda mascot from gaming to AI assistant functionality
  - Replaced PandaGames component with comprehensive AIAssistant component
  - Updated mascot messaging to focus on fee management support and assistance
  - Changed emoji from panda (🐼) to robot (🤖) to reflect AI assistant role
  - Implemented intelligent chatbot with predefined questions and contextual responses
  - Added support for fee payments, account management, payment history, and platform guidance
  - Maintained floating mascot design with speech bubbles and animations
  - Created comprehensive AI assistant interface with message history, typing indicators, and quick questions

- July 30, 2025: Implemented comprehensive real-time dashboard data synchronization
  - Created live dashboard API endpoints fetching authentic system data
  - Added automatic data refresh every 30 seconds with manual sync capability
  - Updated all "Get Started" buttons to redirect to production dashboard at https://master-fees.com/
  - Implemented real-time statistics showing student counts, payment amounts, and SMS activity
  - Created demo payment data displaying ₹75K in transaction history for visualization
  - Enhanced dashboard with QuickBooks connection status and live data monitoring
  - Integrated contact form submissions tracking with real-time contact management

- July 30, 2025: Implemented comprehensive SMS notification system using Twilio
  - Added Twilio SMS service integration with complete credential management
  - Integrated SMS confirmations for contact form submissions with user and admin notifications
  - Implemented payment confirmation SMS with receipt details and transaction information
  - Created SMS settings interface for managing notification preferences
  - Added SMS templates for various scenarios: payments, reminders, welcome messages, contact confirmations
  - Enhanced contact form and payment responses to include SMS confirmation status
  - Built comprehensive SMS service with error handling and fallback capabilities

- July 30, 2025: Implemented QuickBooks integration for advanced school financial data management
  - Created comprehensive QuickBooks API service with OAuth2 authentication
  - Built complete QuickBooks integration interface for connecting and managing school accounts
  - Implemented bidirectional data sync for customers, items, invoices, and payments
  - Added QuickBooks routes for creating customers, items, invoices, and payment records
  - Created connection management system with status monitoring and disconnection capabilities
  - Integrated QuickBooks data import/export functionality for seamless financial record management
  - Built comprehensive dashboard showing sync status and financial data overview
  - Enhanced school financial capabilities with professional accounting software integration
  - Configured with production QuickBooks credentials for live OAuth2 authentication
  - Deployed to production at https://master-fees.com/ with full integration capabilities

- July 30, 2025: Implemented comprehensive Figma design system integration
  - Created complete Figma API service with authentication and file access capabilities
  - Built Figma integration dashboard tab with design import and component generation features
  - Implemented design system synchronization for colors, typography, and component extraction
  - Added React component generation from Figma nodes with automated code conversion
  - Created asset export functionality supporting PNG/SVG formats at multiple scales
  - Integrated Figma file import using file keys from Figma URLs
  - Built comprehensive Figma integration interface with real-time connection testing
  - Enhanced Master Fees with professional design workflow integration capabilities
  - Configured with production Figma credentials for live API authentication
  - User successfully deployed dashboard from Figma demonstrating full integration functionality
  - Rebuilt dashboard to exactly match user's Figma Make design using imported dashboard assets
  - Created pixel-perfect dashboard replica with interactive overlay elements and proper branding
  - Implemented authentic Twalumbu Education Centre interface with ZMW currency and exact layout

## Changelog

Changelog:
- July 01, 2025. Initial setup
- July 30, 2025. Removed dark mode, mascot features, and easter eggs; implemented new testimonials design