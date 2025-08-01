# Master Fees - School Payment System

## Overview
Master Fees is a modern school fee management system designed to simplify payment collection for schools and parents. It aims to provide a seamless payment experience, offering core capabilities for managing user accounts, processing payments, and handling financial data. The project envisions significant market potential by streamlining administrative tasks for educational institutions.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui and Radix UI primitives
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Form Handling**: React Hook Form with Zod validation
- **UI/UX Decisions**: Mobile-first responsive design, comprehensive component library, dark teal/navy and mint green color palette, Apple-style design for aptitude testing and admin components, with glass-morphism cards and backdrop blur effects.

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Connect-pg-simple
- **Technical Implementations**: Abstracted storage interface, centralized route registration, comprehensive error handling middleware.

### Database Layer
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit
- **Schema**: Shared schema definitions between frontend and backend.

### Feature Specifications
- **Landing Page**: Marketing site with hero, features, pricing, and testimonials.
- **User Management**: Basic CRUD operations for users.
- **Payment Integration**: Structured to support payment gateway integration, with a focus on Indian market (UPI, card payments).
- **SMS Notification System**: Twilio integration for payment and contact form confirmations.
- **QuickBooks Integration**: OAuth2 authentication, bidirectional data sync for customers, items, invoices, and payments.
- **Figma Integration**: API service for design system synchronization, component generation, and asset export.
- **Aptitude Testing System**: Clean, modern assessment platform with liquid glass design, multi-step registration, category selection (Frontend and Backend available, others coming soon), timed testing with multiple choice and coding questions, and comprehensive results display.

## External Dependencies

- **Database**: Neon PostgreSQL serverless database
- **UI Framework**: Radix UI
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Date Handling**: date-fns
- **SMS Service**: Twilio
- **Accounting Integration**: QuickBooks API
- **Design Integration**: Figma API