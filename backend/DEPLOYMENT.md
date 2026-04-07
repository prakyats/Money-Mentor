# Backend Deployment (Render + Vercel Frontend)

## 1. Required env vars
Set these on Render service:
- DATABASE_URL
- JWT_ACCESS_SECRET
- JWT_REFRESH_SECRET
- JWT_ACCESS_EXPIRES_IN (default 15m)
- JWT_REFRESH_EXPIRES_IN (default 7d)
- CORS_ORIGIN (comma-separated)
- SENTRY_DSN (optional)

## 2. Render blueprint
A ready `render.yaml` is provided at repo root.

## 3. Build and start
- Build: `npm ci && npm run prisma:generate && npm run build`
- Start: `npm run prisma:deploy && npm run start`

## 4. First admin setup
After first deploy, run one job/one-off command with env vars:
- ADMIN_EMAIL
- ADMIN_PASSWORD
- ADMIN_FULL_NAME (optional)

Then execute:
- `npm run seed:admin`

## 5. CORS for Vercel
Set `CORS_ORIGIN` like:
- `https://your-app-name.vercel.app,https://*.vercel.app`

## 6. API docs
Swagger docs are available at `/docs`.
