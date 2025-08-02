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
- **Aptitude Testing System**: Advanced assessment platform with liquid glass design, adaptive difficulty scaling, real-time skill visualization, multi-step registration, category selection (Frontend and Backend available, others coming soon), timed testing with multiple choice and coding questions, performance tracking with accuracy/speed/confidence metrics, and comprehensive results display with skill assessment. Note: aptitude-apple page removed from onboarding flow as requested.
- **School Onboarding System**: Complete ten-step onboarding flow concluding with success badge and dashboard redirect: 1) intelligent school search featuring preloaded Zambian schools database and AI-powered suggestions, 2) location-based form fields with comprehensive geographic data, 3) detailed school information collection (email, contact, address, categories, logo upload), 4) pricing setup with selectable fee categories (tuition, transportation, accommodation, etc.) and custom category creation, 5) advanced pricing structure configuration with service classes, service groups, hierarchical organization, and detailed price entry management, 6) product grouping system for organizing grade levels into logical service groups for easier management and reporting, 7) receipt template customization allowing schools to design their payment receipts with placeholders for dynamic content, 8) banking integration with Zambian bank account setup supporting major banks like Zanaco, FNB, Standard Chartered, and others with branch selection and account validation, 9) account verification with company details, ownership information, and document upload requirements for compliance, 10) credential creation for dashboard access with email and password setup, and 11) success completion screen with celebration badge and automatic redirect to master-fees.com dashboard.

## External Dependencies

- **Database**: Neon PostgreSQL serverless database
- **UI Framework**: Radix UI
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Date Handling**: date-fns
- **SMS Service**: Twilio
- **Accounting Integration**: QuickBooks API
- **Design Integration**: Figma API