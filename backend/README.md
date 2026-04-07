# Money Mentor Backend (NestJS + Prisma + PostgreSQL)

Production-oriented backend for Money Mentor.

## Stack
- NestJS (modular architecture)
- PostgreSQL
- Prisma ORM + migrations
- JWT access/refresh auth
- Swagger/OpenAPI docs
- Validation + throttling + security headers
- Request IDs + structured logs
- RBAC + audit logging foundation

## Local setup
1. Copy `.env.example` to `.env` and update values.
2. Install dependencies:
   npm install
3. Generate prisma client:
   npm run prisma:generate
4. Run migrations:
   npm run prisma:migrate
5. Start dev server:
   npm run start:dev

## API docs
- Swagger UI: `/docs`

## Core modules
- auth
- users
- transactions
- audit

## Next modules to implement (already modeled in Prisma schema)
- categories
- budgets
- goals
- analytics
- reports
- insights
- projections
- notifications
- settings

## Deployment notes (Render)
- Set all env vars from `.env.example`
- Use `npm run prisma:deploy` during release
- Start command: `npm run start`
