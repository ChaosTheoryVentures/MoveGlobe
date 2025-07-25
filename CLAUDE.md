# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MoveGlobe is an AI business consultancy web application featuring interactive 3D globe visualization. It's a multilingual (English/Dutch) platform designed to help organizations achieve financial and operational goals through AI agents and automation.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5000)
npm run dev

# Build for production
npm run build

# Run production server
npm run start

# Type check the codebase
npm run check

# Push database schema changes
npm run db:push
```

## Environment Setup

Create a `.env` file based on `.env.example`:
- `DATABASE_URL`: PostgreSQL connection string from Supabase (required)
- `ADMIN_PASSWORD`: Password for admin panel access
- `SESSION_SECRET`: Secure random string for session encryption
- `PORT`: Server port (defaults to 5000)

## Architecture

### Tech Stack
- **Frontend**: React 18.3 with TypeScript, Three.js/React Three Fiber for 3D graphics, Vite bundler
- **Backend**: Express.js server with TypeScript running on port 5000
- **Database**: PostgreSQL with Drizzle ORM (Neon serverless)
- **UI**: shadcn/ui components (Radix UI primitives), TailwindCSS
- **State Management**: Zustand (audio, game state), React Query (TanStack Query)
- **Routing**: React Router
- **Animations**: Framer Motion
- **Build Tools**: esbuild for server, Vite for client

### High-Level Architecture

The application follows a client-server architecture with a clear separation of concerns:

1. **Client-Server Communication**: The frontend communicates with the backend via RESTful APIs under `/api/*` routes
2. **Storage Abstraction**: The backend uses an interface-based storage pattern (`IStorage`) allowing seamless switching between in-memory and PostgreSQL storage
3. **Form System Architecture**: Dynamic form system with database-driven form types and submissions
4. **3D Rendering Pipeline**: Three.js scene graph with React Three Fiber for declarative 3D components
5. **Authentication Flow**: Session-based authentication with Express sessions (implementation pending)
6. **Development Server**: Uses tsx to run TypeScript directly in development, port is hardcoded to 5000

### Key Components

1. **3D Globe System**
   - Scene.tsx orchestrates Globe.tsx, Lights.tsx, and OrbitControls
   - Custom texture processing with canvas API
   - Responsive scaling (mobile: 0.6x, tablet: 0.8x, desktop: 1x)
   - Touch-optimized controls
   - GLTF model loading from public/geometries/

2. **Multilingual System**
   - LanguageContext provides EN/NL translations
   - Translation keys defined in contexts/LanguageContext.tsx
   - Language persistence via localStorage

3. **Form Submission System**
   - Database-driven form types (formTypes table)
   - Dynamic field storage (formFields table) 
   - File attachment support (formAttachments table)
   - Admin panel at `/admin/form-submissions`
   - API endpoints: `/api/forms/submit`, `/api/forms/types`, `/api/forms/submissions`
   - Client hook: `use-form-submission.tsx` for form handling

4. **Storage Architecture**
   - Interface: `IStorage` in server/storage.ts
   - Implementations: `InMemoryStorage`, `DrizzleStorage`
   - Initialized based on DATABASE_URL availability

5. **Audio System**
   - Zustand store in `lib/audio-store.ts`
   - Background music and sound effects
   - Default muted, user-controlled

### Path Aliases
- `@/` → `client/src/`
- `@shared/` → `shared/`

### TypeScript Configuration
- Strict mode enabled
- Incremental compilation with tsbuildinfo stored in node_modules
- Module: ESNext with bundler resolution
- JSX: preserve mode
- Includes: client/src, shared, server directories

## Important Considerations

### 3D Graphics
- The app heavily uses Three.js for 3D rendering
- GLSL shaders are supported via vite-plugin-glsl
- 3D assets are in public/geometries/ (GLTF format)
- Textures and materials in public/textures/
- Vite configured to handle large 3D models (.gltf, .glb) and audio files

### Database
- Requires DATABASE_URL environment variable (will throw error in drizzle.config.ts if missing)
- Uses Drizzle ORM with PostgreSQL
- Storage can switch between in-memory (InMemoryStorage) and database (DrizzleStorage)
- Schema changes require running `npm run db:push`
- Configuration in drizzle.config.ts
- Tables: users, formTypes, formSubmissions, formFields, formAttachments
- Migrations stored in ./migrations directory

### Build Configuration
- Client: Vite builds to dist/public with React plugin and GLSL support
- Server: Custom build script using esbuild (ESM format, Node 18 target)
- TypeScript strict mode enabled with incremental compilation
- Source maps enabled in production
- Node.js requirement: >=18.0.0

### Server Configuration
- Express server with session middleware
- Request logging for API routes (truncated to 80 chars)
- JSON response capture for debugging
- CORS enabled via middleware
- Development: Vite HMR integration
- Production: Static file serving from dist/public

### Current State
- Frontend is well-developed with comprehensive UI components
- Backend has implemented form submission system with database persistence
- Admin panel for managing form submissions
- Authentication schema exists but not yet implemented
- Server runs on port 5000 with request logging

## Deployment
- Configured for Dokku deployment on Hetzner Cloud (116.203.87.132)
- Docker multi-stage build with Node 18 Alpine
- Health check endpoint at `/api/health`
- Non-root user execution (nodejs:1001)
- Uses dumb-init for proper signal handling
- Environment variables needed: DATABASE_URL, PORT (optional)