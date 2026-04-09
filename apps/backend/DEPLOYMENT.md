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
- AI_PROVIDER (`auto`, `xai`, or `ollama`)
- XAI_API_KEY
- XAI_MODEL (default grok-4-0709)
- OLLAMA_BASE_URL (default `http://localhost:11434`)
- OLLAMA_MODEL (default `llama3.1:8b`)

## 2. Render blueprint
A ready `render.yaml` is provided at repo root.

## 3. Build and start
- Build: `npm ci && npm run prisma:generate && npm run build`
- Start: `npm run prisma:deploy && npm run start`

## 4. Chatbot model config
- The chatbot backend calls xAI's Grok API through `/v1/chat/completions`.
- Keep `XAI_API_KEY` only in Render env vars or local backend `.env` files.
- Override `XAI_MODEL` only if you want to swap the default Grok model.
- `AI_PROVIDER=auto` tries xAI first and falls back to Ollama.
- Set `AI_PROVIDER=ollama` for fully local inference when you do not want paid APIs.

## 5. First admin setup
After first deploy, run one job/one-off command with env vars:
- ADMIN_EMAIL
- ADMIN_PASSWORD
- ADMIN_FULL_NAME (optional)

Then execute:
- `npm run seed:admin`

## 6. CORS for Vercel
Set `CORS_ORIGIN` like:
- `https://your-app-name.vercel.app,https://*.vercel.app`

## 7. API docs
Swagger docs are available at `/docs`.
