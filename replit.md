# RMLuthor.us - The Luthor.Tech AI Ecosystem Core

## Overview

RMLuthor.us is a futuristic personal portfolio and AI ecosystem website featuring a custom cyberpunk aesthetic. The application showcases AI architecture, security innovations, and various tech projects through an immersive, visually-driven interface. Built as a full-stack TypeScript application with React frontend and Express backend, it includes an interactive chat system, project showcase, games catalog, blog section, and contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing with support for five main pages: Home, Projects, Games, Blog, and Contact.

**UI Component Library**: shadcn/ui built on Radix UI primitives, providing accessible, customizable components with consistent styling. Components use a "new-york" style variant with custom cyberpunk theming.

**Styling System**: 
- Tailwind CSS with custom configuration for the futuristic/cyberpunk aesthetic
- CSS custom properties for theme variables (HSL color format)
- Dual theme support (light/dark mode) with theme toggle functionality
- Custom neon glow effects using text-shadow and box-shadow
- Typography: Orbitron/Rajdhani for headings, Inter/IBM Plex Sans for body text
- Animated backgrounds with geometric patterns, grids, and particle effects

**State Management**: 
- TanStack Query (React Query) for server state management with custom query client configuration
- React Context for theme management (ThemeProvider)
- React Hook Form with Zod validation for form handling

**Design Pattern**: Component-based architecture with clear separation between page components, reusable UI components, and business logic. Custom hooks (use-mobile, use-toast) for shared functionality.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Design**: RESTful API with JSON responses:
- GET /api/auth/user - Get current authenticated user
- GET /api/auth/is-admin - Check admin status (server-side ADMIN_EMAIL verification)
- PATCH /api/auth/user/type - Update user's account type (personal/enterprise)
- GET /api/projects - List all projects with attached case studies (public)
- GET /api/projects/:slug - Get single project by slug (public)
- POST /api/projects - Create project (admin)
- PATCH /api/projects/:id - Update project (admin)
- DELETE /api/projects/:id - Delete project (admin)
- POST /api/case-studies - Create case study (admin)
- PATCH /api/case-studies/:id - Update case study (admin)
- DELETE /api/case-studies/:id - Delete case study (admin)
- GET /api/services - List all services (public)
- POST /api/services - Create service (admin)
- PATCH /api/services/:id - Update service (admin)
- DELETE /api/services/:id - Delete service (admin)
- GET /api/chat/messages - Retrieve chat messages (scoped to user or anonymous)
- POST /api/chat/messages - Create new chat message with AI response
- DELETE /api/chat/messages - Clear chat history
- POST /api/contact - Submit contact form
- POST /api/holograms/upload - Create custom hologram from user upload
- GET /api/holograms/user - Get user's hologram uploads
- GET /api/holograms/download/:id - Download generated hologram
- POST /api/seed - Seed initial data (admin)
- GET /api/login - Initiate Replit OAuth flow
- GET /api/callback - Handle OAuth callback
- GET /api/logout - End user session

**Storage Layer**: DatabaseStorage class with Drizzle ORM backed by Neon PostgreSQL (using HTTP adapter for reliability). Implements IStorage interface for user management, chat messages, contact submissions, portfolio projects, services, and case studies.

**Request Handling**: 
- Express middleware for JSON parsing with raw body preservation (for webhook verification)
- Request logging middleware tracking method, path, status, duration
- Error handling through custom response structures

**Development Mode**: Vite middleware integration for hot module replacement during development, with SSR-style HTML template injection.

**Build Process**: Custom build script using esbuild for server bundling and Vite for client bundling. Server dependencies are selectively bundled (allowlist) to reduce cold start times.

### Database Schema

**ORM**: Drizzle ORM configured for PostgreSQL with schema-first approach using Neon HTTP adapter.

**Tables**:
- `sessions`: Session storage for Replit Auth with sid, sess (JSONB), and expire columns
- `users`: User profiles with id, email, firstName, lastName, profileImageUrl, userType (personal/enterprise), timestamps
- `projects`: Portfolio projects with id (UUID), slug (unique), title, description, status, tags (text array), icon, url, internalPath, sortOrder
- `case_studies`: Case study details linked to projects via projectId FK - deliverables (text array), tools (text array), closing
- `services`: Service/skill set offerings with id (UUID), title, description, icon, features (text array), highlight, sortOrder
- `chat_messages`: Chat history with id, content, role (user/assistant), userType, userId (optional)
- `contact_submissions`: Contact form entries with id, name, email, subject, message, createdAt
- `hologram_uploads`: Custom hologram creations with id, userId, imageUrl, customMessage, voiceUrl, color, style, status, downloadUrl, createdAt
- `work_updates`: Blog-style work updates with title, content, category
- `work_update_reactions`: Visitor reactions on work updates
- `blog_comments`: Comments on blog posts
- `printing_projects`: 3D printing project gallery entries

**Schema Validation**: Zod schemas generated from Drizzle table definitions for runtime validation, ensuring type safety across the stack.

**Migration Strategy**: Drizzle Kit for schema migrations with push-based deployment to Neon PostgreSQL.

### Authentication & Authorization

**Authentication**: Replit Auth integration using OpenID Connect (OIDC):
- OAuth flow via /api/login, /api/callback, /api/logout endpoints
- Session management with PostgreSQL-backed session store (connect-pg-simple)
- JWT token handling with automatic refresh
- User data synced from Replit profile (email, name, avatar)

**User Types**: Two account types that affect AI assistant behavior:
- Personal: Friendly, casual conversation style for individuals
- Enterprise: Professional, technical responses for business users

**Authorization**: Protected routes use isAuthenticated middleware that validates session and refreshes tokens as needed.

### Styling & Theme System

**Color System**: HSL-based color variables with semantic naming (primary, secondary, muted, accent, destructive). Custom neon colors (cyan, blue) for cyberpunk aesthetic.

**Component Variants**: Class Variance Authority (CVA) for managing component style variants with type safety.

**Responsive Design**: Mobile-first approach with breakpoints handled through Tailwind utilities and custom useIsMobile hook.

**Animations**: Custom CSS animations (pulse-glow, float) combined with Tailwind animation utilities for dynamic visual effects.

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives (@radix-ui/react-*)
- **shadcn/ui**: Pre-built component library using Radix primitives with Tailwind styling
- **Lucide React**: Icon library for consistent iconography
- **cmdk**: Command menu component for potential future search/command functionality

### Database & ORM
- **Neon Serverless**: PostgreSQL database provider with serverless architecture (@neondatabase/serverless)
- **Drizzle ORM**: TypeScript ORM for database operations with schema generation
- **Drizzle Zod**: Integration between Drizzle schemas and Zod validation

### Form & Validation
- **React Hook Form**: Performant form state management with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries

### State Management
- **TanStack Query**: Server state management with caching, background updates, and request deduplication

### Development Tools
- **Vite**: Fast build tool and development server with HMR
- **esbuild**: JavaScript bundler for production server builds
- **TypeScript**: Static type checking across the entire codebase
- **Replit Plugins**: Development environment enhancements (@replit/vite-plugin-*)

### Utility Libraries
- **date-fns**: Modern date manipulation library
- **nanoid**: Unique ID generation
- **clsx & tailwind-merge**: Utility for conditional CSS class composition
- **class-variance-authority**: Type-safe component variants

### External Integrations
- **Outlook Teams Connect**: External Replit app for Microsoft Outlook and Teams integration
  - URL: https://outlook-teams-connect--RisaLuthor.replit.app
  - Accessed from ERP Team Dashboard page
  - Note: User dismissed built-in Replit Outlook connector, using external app instead

### Potential Future Integrations
Based on build script allowlist, the application is configured to support:
- Session management (express-session, connect-pg-simple, memorystore)
- Authentication (passport, passport-local, jsonwebtoken)
- File uploads (multer)
- Email (nodemailer)
- Payment processing (stripe)
- AI services (openai, @google/generative-ai)
- WebSockets (ws)
- Spreadsheet handling (xlsx)
- Rate limiting (express-rate-limit)
- CORS handling (cors)