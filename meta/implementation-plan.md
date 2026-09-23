# Werk – Implementation Plan: Milestone 1 (Foundation & Core Prototype)

## 1. Executive Summary & Concept Analysis

Based on the analysis of `meta/idea.md` (originally titled "Fundus", now **"Werk"**), the platform departs from traditional social networks and isolated portfolio sites by establishing **the Project as the atomic unit of creative collaboration and presentation**:

> **"Nicht der einzelne Beitrag steht im Mittelpunkt, sondern das Projekt."**

### Key Conceptual Pillars from `meta/idea.md`
1. **The Project as a Living Entity**:
   - Status (`Idea` → `Planning` → `Active` → `Completed` → `Archived`) is strictly decoupled from Visibility (`Private` → `Participants` → `Unlisted/Link` → `Public`).
   - Supports both **Native projects** (hosted media, log updates, discussions) and **External projects** (curated metadata linking out to Vimeo, YouTube, Behance, personal sites).
2. **Fluid Roles & Placeholders**:
   - Creative roles are non-rigid (e.g. Photography, Model, Costume, Code, Sound).
   - Projects can reference **unregistered participants** (e.g. "Lisa Meier – Model – unverified placeholder") without blocking project documentation. Claiming of placeholders requires explicit confirmation, not automatic name matching.
3. **Project-Derived Identity & Portfolio**:
   - A creator's portfolio is a dynamic reflection of their actual project contributions (past, present, collaborated).
   - Regional focus tailored to Switzerland (cantons, regions, travel radius).
4. **Objective Content Classification**:
   - Fine-grained, orthogonal content attributes (nudity, sexuality, context) rather than blanket "NSFW user" labels.

### Prototype Strategy
Because the concept is in an exploratory stage where requirements and data models will evolve frequently, the initial architecture must prioritize:
- **Maximum Schema Flexibility**: No heavy, rigid migration barriers when adding experimental attributes.
- **Low Ceremony, High Velocity**: Modular component-based frontend with instant hot-reloading and direct visibility into stored data.
- **Clear Separation of Concerns**: Decoupled API backend and SSR frontend orchestrated with Docker Compose for zero-friction local development.

---

## 2. Architecture & Tech Stack Decisions

### 2.1 Database & Debugging
- **MongoDB 7.0**:
  - *Rationale*: A document database is the ideal fit for this stage. Creative projects have polymorphous attributes (different media types, dynamic participant roles, project updates, external metadata). MongoDB allows rapid schema iteration without destructive SQL migrations.
- **Compass-Web (`haohanyang/compass-web`)**:
  - *Rationale*: Preconfigured in Docker Compose (`CW_MONGO_URI=mongodb://mongo:27017`), exposing an in-browser MongoDB Compass GUI on port `8081`. This allows instant inspection, querying, and editing of prototype documents without requiring any native desktop client installation.

### 2.2 Backend Architecture
- **Node.js (v22 LTS) + TypeScript + Fastify**:
  - *Rationale*: Fastify offers top-tier performance, low overhead, first-class TypeScript support, built-in schema validation (via Zod / JSON Schema), and painless CORS/route registration.
  - *Data Access*: Mongoose (or native MongoDB driver) with flexible schemas using `{ strict: false }` or extensible subdocuments to allow fluid evolution.
  - *Health & Seed*: Integrated health check endpoint (`/api/health`) and an executable database seeder (`npm run seed`) with sample creative projects (e.g. the photo editorial and external Vimeo music video from `meta/idea.md`).

### 2.3 Frontend Architecture: SvelteKit + SSR
- **SvelteKit (Svelte 5) + TypeScript + Tailwind CSS**:
  - *Component-Based*: Svelte 5's Runes syntax (`$state`, `$derived`, `$props`) provides clean, reactive, component-driven UI without boilerplate.
  - *Server-Side Rendering (SSR) — Critical Decision*:
    - **Decision: YES, with SSR enabled (via `@sveltejs/adapter-node`)**.
    - **Why?** Creative projects and portfolios rely heavily on link sharing (Open Graph cards, Twitter/X cards, WhatsApp/Discord/iMessage previews) and SEO. A pure client-side SPA cannot serve dynamic Open Graph meta tags per project/profile without complex prerendering proxies. SvelteKit SSR renders HTML with dynamic meta tags on the server, then seamlessly hydrates on the client for smooth SPA-speed interactions.

### 2.4 Service Orchestration (`docker-compose.yml`)
```text
  ┌────────────────────────────────────────────────────────┐
  │                   Docker Compose Stack                 │
  │                                                        │
  │  ┌──────────────┐     ┌──────────────┐                 │
  │  │   Frontend   │────▶│   Backend    │                 │
  │  │  (SvelteKit) │     │  (Fastify)   │                 │
  │  │  :3000 (SSR) │     │  :3001 (API) │                 │
  │  └──────────────┘     └──────┬───────┘                 │
  │                              │                         │
  │                       ┌──────▼───────┐ ┌─────────────┐ │
  │                       │   MongoDB    │ │ Compass-Web │ │
  │                       │    :27017    │◀│    :8081    │ │
  │                       └──────────────┘ └─────────────┘ │
  └────────────────────────────────────────────────────────┘
```

---

## 3. Milestone 1: Scope & Work Breakdown

The objective of Milestone 1 is to **build a rock-solid, runnable, flexible foundation** that enables immediate exploration of the core domain without over-engineering future features (chats, forum, matching algorithms).

### Phase 1: Repository Structure & Tooling
- Initialize monorepo directory layout:
  ```text
  werk/
  ├── docker-compose.yml          # Local container orchestration
  ├── .env.example                # Environment variables template
  ├── .gitignore
  ├── meta/
  │   ├── idea.md                 # Concept document
  │   └── implementation-plan.md  # This document
  ├── backend/                    # Node.js + Fastify API
  │   ├── Dockerfile
  │   ├── package.json
  │   ├── tsconfig.json
  │   └── src/
  │       ├── config/             # DB connection & env vars
  │       ├── models/             # Flexible Mongoose models
  │       ├── routes/             # Fastify route handlers
  │       ├── seeds/              # Prototype seed data
  │       └── server.ts           # Server entry point
  └── frontend/                   # SvelteKit SSR app
      ├── Dockerfile
      ├── package.json
      ├── svelte.config.js
      ├── vite.config.ts
      ├── tailwind.config.js
      └── src/
          ├── app.html
          ├── lib/
          │   ├── components/     # UI components (ProjectCard, Badge, ParticipantTag, etc.)
          │   └── api.ts          # Typed API client
          └── routes/
              ├── +layout.svelte  # Shell, Nav, Debug bar
              ├── +page.svelte    # Project Explore / Feed
              └── projects/
                  └── [id]/       # Project Detail page (SSR + OG tags)
  ```

### Phase 2: Docker Compose Orchestration
- Configure `docker-compose.yml` with 4 services:
  1. `mongo`: MongoDB 7.0 container with persistent named volume `mongo_data`.
  2. `compass-web`: `haohanyang/compass-web:latest` mapped to `http://localhost:8081` with `CW_MONGO_URI=mongodb://mongo:27017`.
  3. `backend`: Fastify API with volume mount for hot reloading (`tsx watch`) mapped to `http://localhost:3001`.
  4. `frontend`: SvelteKit SSR app with Vite HMR mapped to `http://localhost:3000`.

### Phase 3: Core Domain Models (Prototype Schema)
Establish flexible data models accommodating the core entities from `meta/idea.md`:
1. **`Project`**:
   - `title`: string
   - `summary`: string
   - `description`: markdown/rich text
   - `status`: enum (`idea`, `planning`, `active`, `completed`, `archived`)
   - `visibility`: enum (`private`, `participants`, `link`, `public`)
   - `isExternal`: boolean (hybrid support: Vimeo, Behance, YouTube, external URL)
   - `externalUrl`: string (optional)
   - `coverImage`: string / URL
   - `participants`: Array of:
     - `name`: string
     - `role`: string (e.g., Photography, Model, Makeup, Director)
     - `profileId`: ObjectId (optional, linked if registered)
     - `isPlaceholder`: boolean (true if non-registered participant)
     - `confirmed`: boolean
   - `updates`: Array of timeline log items (`date`, `title`, `description`, `mediaUrl`)
   - `location`: `{ region: string, city: string, canton: string }`
   - `contentClassification`: `{ nudity: string, sexuality: string, context: string }`
2. **`Profile`** (Minimal baseline for creator attribution):
   - `username`: string
   - `displayName`: string
   - `bio`: string
   - `roles`: string[] (e.g. `["Photographer", "Art Director"]`)
   - `region`: string (e.g. `Zurich`, `Vaud`, `Bern`)
   - `avatarUrl`: string

### Phase 4: Backend API Endpoints & Seeding
- `GET /api/health`: Health status & MongoDB connection check.
- `GET /api/projects`: Query and filter projects (filter by status, role, region, search query).
- `GET /api/projects/:id`: Fetch single project detail with participants & updates.
- `POST /api/projects`: Prototype endpoint to create a project.
- `POST /api/seed` or CLI `npm run seed`: Populate database with realistic sample projects based on `meta/idea.md` (e.g. "Editorial Winter 2026", "Indie Music Video", "Cosplay Showcase").

### Phase 5: SvelteKit Component-Based Frontend (SSR)
- **Global Layout & Navigation**:
  - Clean, artistic, modern aesthetic matching the creative ethos of "Werk".
  - Quick-debug status banner linking to Compass-Web (`http://localhost:8081`) and Backend API (`http://localhost:3001/api/health`).
- **Explore / Project Catalog (`/`)**:
  - Server-side loaded (`+page.server.ts` or client-hydrated SSR).
  - Responsive project grid with status tags, roles chips, cover preview, and participant avatars/placeholders.
  - Filter bar: Filter by Project Status (`Idea`, `Planning`, `Active`, `Completed`) and Role.
- **Project Detail View (`/projects/[id]`)**:
  - SSR-rendered with dynamic `<svelte:head>` Open Graph tags (title, description, cover image).
  - Distinguishes **Native** vs **External** projects (renders embedded video/link badge for external works).
  - **Participants & Credits component**: Explicitly highlights **registered creators** vs **unverified placeholders** (e.g., "Lisa Meier – Model [Placeholder]").
  - **Project Timeline / Logbook component**: Displays creative updates ("Location found", "First stills ready").
  - Independent display of Project Status and Visibility badges.

---

## 4. Verification Plan

### Automated & Container Checks
1. **Container Orchestration**:
   - Run `docker compose up -d`
   - Verify all 4 containers (`mongo`, `compass-web`, `backend`, `frontend`) are healthy and running via `docker compose ps`.
2. **Backend API & Health**:
   - `curl http://localhost:3001/api/health` -> returns `{ status: "ok", db: "connected" }`.
3. **Database & Compass-Web**:
   - Access `http://localhost:8081` in browser and verify Compass-Web connects to `mongodb://mongo:27017` and displays the `werk` database.
   - Run seed script and verify `projects` and `profiles` collections are populated.
4. **Frontend SSR & Rendering**:
   - Access `http://localhost:3000` in browser: Explore page renders seeded projects.
   - Access `http://localhost:3000/projects/<id>`: Project details, participants with placeholder indicators, and timeline updates render smoothly.
   - Check raw page source (`curl http://localhost:3000/projects/<id>`) to confirm Server-Side Rendering (SSR) emits populated HTML and `<meta property="og:title">` tags.

---

## 5. Next Steps Post-Milestone 1 (Future Road Ahead)
- Milestone 2: User Authentication & Profile Management.
- Milestone 3: Interactive Project Workspace (Editing, placeholder claiming workflow, asset upload).
- Milestone 4: Communication channels (Direct Messages & project-bound discussion boards).
