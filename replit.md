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

- July 30, 2025: Complete redesign following user's reference image
  - Replaced entire home page with single-page design matching reference image
  - Implemented dark gradient background (slate-800 to brand-teal) with white content card  
  - Created detailed mobile app mockup with realistic UI elements (status bar, payment interface)
  - Built desktop dashboard mockup with browser chrome and analytics dashboard
  - Added "Join our Exclusive test program" header with mint green accent
  - Removed multi-section layout (navigation, hero, features, about, contact, footer)
  - Focused on single conversion-oriented landing page design
  - Enhanced device mockups with proper shadows, bezels, and realistic content

## Changelog

Changelog:
- July 01, 2025. Initial setup
- July 30, 2025. Removed dark mode, mascot features, and easter eggs; implemented new testimonials design