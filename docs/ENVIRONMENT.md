# Environment Variables Reference

## Backend (`apps/backend/.env`)

Required:

- `NODE_ENV`
- `PORT`
- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_ACCESS_EXPIRES_IN`
- `JWT_REFRESH_EXPIRES_IN`
- `CORS_ORIGIN`

Optional:

- `SENTRY_DSN`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_FULL_NAME`
- `AI_PROVIDER` (`auto`, `xai`, or `ollama`; default `auto`)
- `XAI_API_KEY`
- `XAI_MODEL`
- `XAI_TIMEOUT_MS`
- `OLLAMA_BASE_URL`
- `OLLAMA_MODEL`
- `OLLAMA_TIMEOUT_MS`

Example local database URL:

`postgresql://postgres:your_password@localhost:5432/moneymentor`

## Landing (`apps/landing/.env`)

Optional:

- `VITE_API_BASE_URL`
- `VITE_DASHBOARD_URL`

## Dashboard (`apps/dashboard/.env`)

Optional:

- `VITE_API_BASE_URL`
- `VITE_LANDING_LOGIN_URL`
- `VITE_CHATBOT_URL`

## Chatbot

Required:

- `VITE_API_BASE_URL` (defaults to the Render backend URL in the app)

Backend-only chat variables:

- `XAI_API_KEY`
- `XAI_MODEL` (optional, defaults to `grok-4-0709`)

## Rules

- Never commit real `.env` files.
- Keep `.env.example` files updated whenever variables change.
- Use production secrets only in deployment platform secret stores.
