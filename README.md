# RMLuthor.us - The Luthor.Tech AI Ecosystem Core

A futuristic personal portfolio and AI ecosystem website featuring a custom cyberpunk aesthetic. Built as a full-stack TypeScript application with React frontend, Express backend, and PostgreSQL database.

## Architecture Overview

### Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Auth**: Session-based admin auth + Replit Auth (OpenID Connect) for public users
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
    pages/
      admin-login.tsx       # Admin login form
      admin-dashboard.tsx    # Admin dashboard overview
      admin-projects.tsx     # Portfolio & case study management
      admin-modules.tsx      # Content modules (updates, printing, services)
      admin-settings.tsx     # System settings & configuration
      ...                    # Public pages (Home, Projects, Services, etc.)
    components/
      admin-layout.tsx       # Shared admin layout with sidebar & auth guard
      navigation.tsx         # Public site navigation
      ...                    # Reusable UI components
    hooks/
      useAdminAuth.ts        # Admin session management hook
      useAuth.ts             # Public user auth hook
      ...
    lib/
      queryClient.ts         # TanStack Query client configuration
server/
  routes.ts         # Express API route definitions (includes admin auth endpoints)
  storage.ts        # Database storage layer (IStorage interface + DatabaseStorage)
  replitAuth.ts     # Authentication middleware (isAdmin supports both auth methods)
  googleCalendar.ts # Google Calendar integration
  index.ts          # Server entry point
  vite.ts           # Vite dev server middleware
shared/
  schema.ts         # Drizzle ORM schema + Zod validation + TypeScript types
```

## Admin Control Plane

### Admin Login Flow

1. User navigates to `/admin/login`
2. Enters email and password
3. Backend validates credentials against `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables
4. On success, sets `adminAuthenticated` flag in the server-side session (PostgreSQL-backed)
5. User is redirected to `/admin/dashboard`
6. Session persists across page refreshes via httpOnly cookie
7. Logout clears the session flag and redirects to `/admin/login`

### Route Structure

| Route | Access | Description |
|-------|--------|-------------|
| `/admin/login` | Public | Admin login form |
| `/admin/dashboard` | Protected | Overview with analytics, schedule, quick actions |
| `/admin/projects` | Protected | Portfolio management (projects + case studies) |
| `/admin/modules` | Protected | Content modules (work updates, 3D printing, services) |
| `/admin/settings` | Protected | System configuration and security status |
| `/admin` | Redirect | Redirects to `/admin/dashboard` |

### Security Model

- **Server-side session authentication**: Credentials validated against environment variables on the backend
- **Session storage**: PostgreSQL-backed sessions via `connect-pg-simple` with 1-week TTL
- **httpOnly cookies**: Session cookie is httpOnly and secure, preventing XSS attacks
- **Dual auth support**: The `isAdmin` middleware accepts both admin session auth and Replit Auth (OIDC) with admin email match
- **Auth event logging**: All login attempts (success/failure) and logouts are logged to the server console with IP addresses
- **No hardcoded credentials**: All secrets stored in environment variables

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

#### Admin Auth Endpoints
- `POST /api/admin/login` - Authenticate with email/password
- `GET /api/admin/session` - Check admin session status
- `POST /api/admin/logout` - End admin session

#### Public Endpoints
- `GET /api/projects` - List all projects with case studies
- `GET /api/projects/:slug` - Get single project by slug
- `GET /api/services` - List all services
- `GET /api/blog/updates` - List work updates
- `GET /api/blog/comments/:updateId` - Get comments for a post
- `POST /api/contact` - Submit contact form
- `POST /api/chat/messages` - Send chat message (AI response)

#### Admin Endpoints (require admin session or Replit Auth admin)
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

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `SESSION_SECRET` | Express session secret |
| `ADMIN_EMAIL` | Admin user email for login |
| `ADMIN_PASSWORD` | Admin user password for login |
| `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` | PostgreSQL connection details |

### Running Locally

```bash
npm install
npm run db:push    # Push schema to database
npm run dev        # Start development server on port 5000
```

### Production

The application uses Replit's built-in deployment. Admin routes are server-side protected and inaccessible without valid credentials.

### Database Migrations

Schema changes are managed through Drizzle Kit. After modifying `shared/schema.ts`:

```bash
npm run db:push
```
