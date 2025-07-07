# Earth Globe 3D Visualization

## Overview

This is a full-stack web application built with React, Express, and TypeScript that features a 3D interactive Earth globe visualization. The application combines a modern frontend with Three.js for 3D rendering and a backend API structure ready for future expansion.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **3D Rendering**: Three.js with React Three Fiber for declarative 3D scenes
- **UI Components**: Radix UI primitives with Tailwind CSS for styling
- **State Management**: Zustand for game state and audio management
- **Data Fetching**: TanStack Query for server state management

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Storage**: Abstract storage interface with in-memory implementation (expandable to database)
- **API Structure**: RESTful endpoints with `/api` prefix

### Build System
- **Frontend Build**: Vite with React plugin and GLSL shader support
- **Backend Build**: ESBuild for Node.js bundle generation
- **Development**: Hot module replacement with runtime error overlay

## Key Components

### 3D Visualization
- **Globe Component**: Procedurally generated Earth-like texture with landmasses and clouds
- **Scene Management**: Orbital controls, lighting setup, and starfield background
- **Interactive Controls**: Mouse/touch rotation, zoom, and pan controls

### UI System
- **Design System**: Comprehensive UI component library based on Radix UI
- **Responsive Design**: Mobile-first approach with touch-friendly controls
- **Audio System**: Muted-by-default audio with toggle controls

### Data Layer
- **Database Schema**: User management system with Drizzle ORM
- **Type Safety**: End-to-end TypeScript with shared schema definitions
- **Storage Abstraction**: Interface-based storage allowing easy database integration

## Data Flow

1. **Client Rendering**: React app loads and initializes 3D scene
2. **Interactive Controls**: User interactions update camera position via Three.js
3. **State Management**: Game state and audio preferences managed through Zustand
4. **API Communication**: TanStack Query handles server communication with error handling
5. **Database Operations**: Drizzle ORM provides type-safe database interactions

## External Dependencies

### Core Libraries
- **Three.js Ecosystem**: Core 3D library with React Three Fiber and Drei helpers
- **UI Framework**: Radix UI for accessible component primitives
- **Database**: Neon serverless PostgreSQL with connection pooling
- **Styling**: Tailwind CSS with custom design tokens

### Development Tools
- **Build Tools**: Vite for frontend, ESBuild for backend
- **Database Tools**: Drizzle Kit for schema management and migrations
- **Type Checking**: TypeScript with strict configuration

## Deployment Strategy

### Production Build
- **Frontend**: Static assets built to `dist/public` directory
- **Backend**: Bundled Node.js server with external dependencies
- **Database**: Uses `DATABASE_URL` environment variable for connection

### Environment Configuration
- **Development**: Local development server with HMR
- **Production**: Single Node.js process serving both API and static files
- **Database**: Configured for PostgreSQL dialect with migration support

## Changelog

- July 07, 2025. Initial setup
- July 07, 2025. Implemented 3D spinning globe with authentic landmask texture
- July 07, 2025. Added dynamic typing text overlay and CTA button
- July 07, 2025. Created navbar and footer components
- July 07, 2025. Mobile optimized all components for responsive design

## User Preferences

Preferred communication style: Simple, everyday language.