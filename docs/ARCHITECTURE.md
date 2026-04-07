# Architecture Overview

## Monorepo Layout

- `apps/backend/`: NestJS API with Prisma/PostgreSQL
- `apps/landing/`: Public auth and onboarding frontend
- `apps/dashboard/`: Authenticated finance dashboard frontend
- `apps/chatbot/`: Assistant UI frontend

## Backend Layers

The backend follows strict layering:

1. Controllers: input/output and route binding
2. Services: business orchestration
3. Repositories: persistence access through Prisma
4. Prisma: PostgreSQL access and schema/migrations

## Data and Portability Principles

- PostgreSQL-first design with host-agnostic code
- No infrastructure-coupled business logic
- Database host changes should only require `DATABASE_URL` updates
- No local-only assumptions in domain logic

## Auth and Session Model

- Access token and refresh token JWT flow
- Landing handles login/register
- Dashboard validates token by calling `/api/v1/users/me`
- Dashboard persists transactions via `/api/v1/transactions`

## Runtime and Deployment Model

- Backend: Render web service
- Frontends: Vercel (or equivalent static host)
- CORS driven by environment variables
- Prisma migrations applied during deployment release

## Observability and Operations

- Health endpoint: `/api/v1/health`
- API docs: `/docs`
- Request logging and audit logging available in backend modules

## Future-safe Boundaries

- Keep shared contracts explicit (DTOs/types)
- Avoid direct coupling between frontend internals and DB schema
- Keep API contracts versioned under `/api/v1`
