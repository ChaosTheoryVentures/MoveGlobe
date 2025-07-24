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
- **State Management**: Zustand, React Query (TanStack Query)
- **Routing**: React Router
- **Animations**: Framer Motion

### Directory Structure
```
├── client/             # Frontend React application
│   ├── public/        # Static assets (fonts, 3D models, textures, sounds)
│   └── src/
│       ├── components/  # React components including Globe.tsx, Scene.tsx
│       ├── contexts/    # React contexts (LanguageContext for i18n)
│       ├── hooks/       # Custom React hooks
│       ├── lib/         # Utilities, stores (Zustand), and shared logic
│       ├── pages/       # Route components
│       └── styles/      # Global styles
├── server/             # Backend Express application
│   ├── index.ts       # Server entry point
│   ├── routes.ts      # API route definitions (currently scaffolded)
│   └── storage.ts     # Database operations with Drizzle
├── shared/            # Shared types and schemas
│   └── schema.ts      # Drizzle database schema
└── scripts/           # Build and utility scripts
```

### Key Components

1. **3D Globe**: The centerpiece is a WebGL-powered 3D globe (client/src/components/Globe.tsx) using Three.js
2. **Multilingual Support**: LanguageContext provides EN/NL translations throughout the app
3. **UI Component Library**: Extensive shadcn/ui components in client/src/components/ui/
4. **Database Schema**: User authentication schema defined in shared/schema.ts

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
- Schema changes require running `npm run db:push`

### Styling
- TailwindCSS with extensive custom configuration
- CSS variables for theming in globals.css
- Custom animations defined in tailwind.config.ts

### Current State
- Frontend is well-developed with comprehensive UI components
- Backend routes are scaffolded but not implemented
- No test framework or linting configuration present
- Authentication setup exists but is not connected

## Deployment
The project is configured for Dokku deployment on Hetzner Cloud (116.203.87.132) with Docker containerization support.