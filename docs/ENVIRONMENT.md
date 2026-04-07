# Environment Variables Reference

## Backend (`backend/.env`)

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

Example local database URL:

`postgresql://postgres:your_password@localhost:5432/moneymentor`

## Landing (`landing/.env`)

Optional:

- `VITE_API_BASE_URL`
- `VITE_DASHBOARD_URL`

## Dashboard (`Mdashboard/.env`)

Optional:

- `VITE_API_BASE_URL`
- `VITE_LANDING_LOGIN_URL`

## Chatbot

No required environment variables at this stage.

## Rules

- Never commit real `.env` files.
- Keep `.env.example` files updated whenever variables change.
- Use production secrets only in deployment platform secret stores.
