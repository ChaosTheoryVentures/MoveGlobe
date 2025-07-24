# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MoveGlobe is an AI business consultancy web application featuring interactive 3D globe visualization. It's a multilingual (English/Dutch) platform designed to help organizations achieve financial and operational goals through AI agents and automation.

## Development Commands

```bash
# Start development server
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

## Architecture

### Tech Stack
- **Frontend**: React 18.3 with TypeScript, Three.js/React Three Fiber for 3D graphics, Vite bundler
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (Neon serverless)
- **UI**: shadcn/ui components (Radix UI primitives), TailwindCSS
- **State Management**: Zustand (audio, game state), React Query (TanStack Query)
- **Routing**: React Router
- **Animations**: Framer Motion
- **Build Tools**: esbuild for server, Vite for client

### Directory Structure
```
├── client/             # Frontend React application
│   ├── public/        # Static assets (fonts, 3D models, textures, sounds)
│   └── src/
│       ├── components/  # React components including Globe.tsx, Scene.tsx
│       ├── contexts/    # React contexts (LanguageContext for i18n)
│       ├── hooks/       # Custom React hooks (incl. use-form-submission)
│       ├── lib/         # Utilities, stores (Zustand), forms.ts for submissions
│       ├── pages/       # Route components
│       │   ├── admin/   # Admin panel for form submissions
│       │   └── ...      # Public pages (oplossingen, ai-analyse, contact)
│       └── styles/      # Global styles
├── server/             # Backend Express application
│   ├── index.ts       # Server entry point with middleware
│   ├── routes.ts      # API route definitions (forms, health check)
│   ├── storage.ts     # Storage interface (IStorage)
│   ├── db.ts          # PostgreSQL connection setup
│   └── drizzle-storage.ts # Drizzle ORM implementation
├── shared/            # Shared types and schemas
│   └── schema.ts      # Drizzle database schema (users, forms system)
└── scripts/           # Build and utility scripts
```

### Key Components

1. **3D Globe**: Component-based 3D scene composition using React Three Fiber
   - Scene.tsx orchestrates Globe.tsx, Lights.tsx, and OrbitControls
   - Custom texture processing with canvas API
   - Responsive scaling (mobile: 0.6x, tablet: 0.8x, desktop: 1x)
   - Touch-optimized controls
2. **Multilingual Support**: LanguageContext provides EN/NL translations throughout the app
3. **UI Component Library**: Extensive shadcn/ui components in client/src/components/ui/
4. **Form Submission System**: 
   - Flexible form types (formTypes table)
   - Form submissions with dynamic fields
   - Admin panel at `/admin/form-submissions` for management
   - API endpoints: `/api/forms/submit`, `/api/forms/types`, `/api/forms/submissions`
5. **Storage Abstraction**: Interface-based storage allowing switch between in-memory and PostgreSQL
6. **Audio System**: Zustand-based audio management with background music and sound effects (default muted)

### Path Aliases
- `@/` → `client/src/`
- `@shared/` → `shared/`

## Important Considerations

### 3D Graphics
- The app heavily uses Three.js for 3D rendering
- GLSL shaders are supported via vite-plugin-glsl
- 3D assets are in public/geometries/ (GLTF format)
- Textures and materials in public/textures/

### Database
- Requires DATABASE_URL environment variable
- Uses Drizzle ORM with PostgreSQL
- Storage can switch between in-memory (InMemoryStorage) and database (DrizzleStorage)
- Schema changes require running `npm run db:push`
- Configuration in drizzle.config.ts
- Tables: users, formTypes, formSubmissions, formFields, formAttachments

### Form System
- Dynamic form types stored in database
- Form submissions stored with metadata and dynamic fields
- Support for file attachments
- Client utilities in `client/src/lib/forms.ts`
- Hook for form handling: `use-form-submission.tsx`

### Styling
- TailwindCSS with extensive custom configuration
- CSS variables for theming in globals.css
- Custom animations defined in tailwind.config.ts

### Build Configuration
- Client assets extended to support 3D models (.gltf, .glb) and audio files (.mp3, .ogg, .wav)
- Server compiled with esbuild (ESM format, Node 18 target)
- TypeScript strict mode enabled with incremental compilation
- Source maps enabled in production

### Current State
- Frontend is well-developed with comprehensive UI components
- Backend has implemented form submission system with database persistence
- Admin panel for managing form submissions
- Authentication schema exists but not yet implemented
- Server runs on port 5000 (PORT env var) with CORS and request logging

## Deployment
- Configured for Dokku deployment on Hetzner Cloud (116.203.87.132)
- Docker multi-stage build with Node 18 Alpine
- Health check endpoint at `/api/health`
- Non-root user execution (nodejs:1001)
- Uses dumb-init for proper signal handling
- Environment variables needed: DATABASE_URL, PORT (optional)