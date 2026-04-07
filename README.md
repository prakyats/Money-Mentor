# Money Mentor

Money Mentor is a personal finance platform with a modular backend and multiple frontend apps:
- Landing app for authentication and onboarding
- Main dashboard for budgeting, expenses, and analytics
- Chatbot app for assistant-style financial interactions

The system is designed to run on PostgreSQL through Prisma and remain portable across local Postgres and hosted Postgres (for example Supabase) by changing environment variables.

## Repository Structure

- `apps/backend/` - NestJS + Prisma API
- `apps/landing/` - React/Vite landing and auth UI
- `apps/dashboard/` - React/Vite authenticated dashboard UI
- `apps/chatbot/` - React/Vite chatbot UI
- `packages/shared/` - shared client constants and API contract helpers
- `render.yaml` - Render deployment blueprint for backend

## Project Documentation

- `README.md` - setup, build, deploy quickstart
- `CONTRIBUTING.md` - contribution standards and commit conventions
- `docs/ARCHITECTURE.md` - system boundaries and layering rules
- `docs/ENVIRONMENT.md` - environment variable reference

## Monorepo Workflow

This repository uses npm workspaces at the root for consistent developer workflow and CI/CD automation.

Install all dependencies from root:

```bash
npm run install:all
```

Run apps from root:

```bash
npm run dev:backend
npm run dev:landing
npm run dev:dashboard
npm run dev:chatbot
```

Build and quality commands from root:

```bash
npm run build
npm run lint
npm run test
```

## Tech Stack

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- JWT auth (access + refresh)
- Validation, throttling, Swagger docs

### Frontend
- React + Vite
- Tailwind CSS
- Axios

## Architecture Principles

- Environment-driven configuration only (no hardcoded secrets)
- Clean layering: controllers -> services -> repositories -> Prisma
- Stateless API behavior (safe for hosted environments and pooling)
- Database-host agnostic inside PostgreSQL ecosystem
- Shared frontend constants live in `packages/shared` to prevent contract drift

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL 14+

## Local Development (Recommended Order)

### 1. Backend setup

```bash
cd apps/backend
npm install
```

Create local env file:

```bash
cp .env.example .env
```

Set at minimum in `apps/backend/.env`:

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/moneymentor
JWT_ACCESS_SECRET=replace_with_strong_access_secret
JWT_REFRESH_SECRET=replace_with_strong_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

Generate Prisma client and migrate:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

Start backend:

```bash
npm run start:dev
```

Health check:

- `http://localhost:4000/api/v1/health`
- Swagger docs: `http://localhost:4000/docs`

### 2. Landing app setup

```bash
cd apps/landing
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

Optional env (`apps/landing/.env`):

```env
VITE_API_BASE_URL=http://localhost:4000
VITE_DASHBOARD_URL=http://localhost:5174
```

### 3. Dashboard app setup

```bash
cd apps/dashboard
npm install
npm run dev -- --host 0.0.0.0 --port 5174
```

Optional env (`apps/dashboard/.env`):

```env
VITE_API_BASE_URL=http://localhost:4000
VITE_LANDING_LOGIN_URL=http://localhost:5173/login
```

### 4. Chatbot app setup

```bash
cd apps/chatbot
npm install
npm run dev
```

## End-to-End Auth + Data Flow

1. Register or login from landing app
2. Tokens are stored in browser localStorage
3. Dashboard validates session using `/api/v1/users/me`
4. Expenses are persisted via `/api/v1/transactions`
5. Data remains available across refresh and new sessions

## Build Commands

Preferred (root workspace):

```bash
npm run build
```

### Backend

```bash
cd apps/backend
npm run build
```

### Landing

```bash
cd apps/landing
npm run build
```

### Dashboard

```bash
cd apps/dashboard
npm run build
```

### Chatbot

```bash
cd apps/chatbot
npm run build
```

## Deployment

### Backend (Render)

- Use root `render.yaml`
- Build command:
  - `npm ci && npm run prisma:generate && npm run build`
- Start command:
  - `npm run prisma:deploy && npm run start`

Required production env vars:
- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_ACCESS_EXPIRES_IN`
- `JWT_REFRESH_EXPIRES_IN`
- `CORS_ORIGIN`
- `SENTRY_DSN` (optional)

### Frontend (Vercel)

Set frontend env variables to point to deployed backend API.

## Migration Path to Supabase Later

When moving from local Postgres to Supabase-hosted Postgres:

1. Update `DATABASE_URL`
2. Run Prisma sync:
   - Development: `npm run prisma:migrate`
   - Production: `npm run prisma:deploy`

No application code changes should be required.

## Security Notes

- Never commit real secrets
- Rotate JWT secrets for production
- Use strong database credentials
- Keep CORS origin list explicit in production

## Current Status

- Backend is modular and production-oriented
- Auth and token-based session flow is wired end-to-end
- Dashboard expenses are API-backed via transactions endpoints
- Project is ready for iterative module expansion (budgets, goals, analytics, reports)
