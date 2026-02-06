# RMLuthor.us - The Luthor.Tech AI Ecosystem Core

A futuristic personal portfolio and AI ecosystem website featuring a custom cyberpunk aesthetic. Built as a full-stack TypeScript application with React frontend, Express backend, and PostgreSQL database.

## Architecture Overview

### Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Auth**: Replit Auth (OpenID Connect)
- **Styling**: Tailwind CSS + shadcn/ui + Radix UI

### Data Flow

```
Browser (React) --> REST API (Express) --> Drizzle ORM --> PostgreSQL (Neon)
```

All content (projects, services, blog updates, 3D printing projects) is stored in PostgreSQL and served via REST API endpoints. The frontend fetches data using TanStack Query (React Query) with automatic caching and background refetching.

### Project Structure

```
client/
  src/
    pages/          # Route pages (Home, Projects, Services, Blog, Admin, etc.)
    components/     # Reusable UI components (Navigation, Footer, Chat, etc.)
    hooks/          # Custom React hooks (useAuth, useToast, useMobile)
    lib/            # Utility functions (queryClient, utils)
server/
  routes.ts         # Express API route definitions
  storage.ts        # Database storage layer (IStorage interface + DatabaseStorage)
  replitAuth.ts     # Authentication middleware
  googleCalendar.ts # Google Calendar integration
  index.ts          # Server entry point
  vite.ts           # Vite dev server middleware
shared/
  schema.ts         # Drizzle ORM schema + Zod validation + TypeScript types
```

### Database Schema

| Table | Purpose |
|-------|---------|
| `users` | User profiles synced from Replit Auth |
| `sessions` | Session storage for authentication |
| `projects` | Portfolio projects with slug, tags, status, icon |
| `case_studies` | Case study details linked to projects via `project_id` |
| `services` | Skill sets / service offerings with features list |
| `work_updates` | Blog-style work updates with categories |
| `work_update_reactions` | Visitor reactions on work updates |
| `blog_comments` | Comments on blog posts |
| `printing_projects` | 3D printing project gallery |
| `hologram_uploads` | Custom hologram creations |
| `chat_messages` | AI chat conversation history |
| `contact_submissions` | Contact form entries |

### API Endpoints

#### Public Endpoints
- `GET /api/projects` - List all projects with case studies
- `GET /api/projects/:slug` - Get single project by slug
- `GET /api/services` - List all services
- `GET /api/blog/updates` - List work updates
- `GET /api/blog/comments/:updateId` - Get comments for a post
- `POST /api/contact` - Submit contact form
- `POST /api/chat/messages` - Send chat message (AI response)

#### Admin Endpoints (require authentication + admin email match)
- `POST /api/projects` - Create project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/case-studies` - Create case study
- `PATCH /api/case-studies/:id` - Update case study
- `DELETE /api/case-studies/:id` - Delete case study
- `POST /api/services` - Create service
- `PATCH /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `POST /api/blog/updates` - Create work update
- `DELETE /api/blog/updates/:id` - Delete work update
- `POST /api/seed` - Seed initial data

### Authentication

Uses Replit Auth (OpenID Connect) with session-based authentication backed by PostgreSQL. Admin access is determined by matching the authenticated user's email against the `ADMIN_EMAIL` environment variable.

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `SESSION_SECRET` | Express session secret |
| `ADMIN_EMAIL` | Admin user email for dashboard access |

### Running Locally

```bash
npm install
npm run db:push    # Push schema to database
npm run dev        # Start development server on port 5000
```

### Database Migrations

Schema changes are managed through Drizzle Kit. After modifying `shared/schema.ts`:

```bash
npm run db:push
```
