# Contributing to Money Mentor

## Workflow

1. Create a feature branch from `main`.
2. Keep each pull request focused on one concern.
3. Use conventional commit messages.
4. Ensure all affected apps build before opening a PR.

## Commit Message Convention

Use this format:

`type(scope): short summary`

Examples:
- `feat(backend): add repository layer for auth and transactions`
- `fix(dashboard): validate session before loading protected routes`
- `docs(root): add monorepo setup and deployment guide`

## Architecture Rules

- Keep backend flow as: controller -> service -> repository -> Prisma.
- Do not access Prisma directly from controllers.
- Keep frontend apps decoupled; communicate only through HTTP APIs.
- Keep configuration in environment variables.

## Local Validation Checklist

From repo root:

```bash
npm run build
npm run lint
npm run test
```

Backend specific:

```bash
cd apps/backend
npm run prisma:generate
npm run prisma:migrate -- --name verify
npm run start:dev
```

## Environment Safety

- Never commit real `.env` values.
- Commit only `.env.example` files.
- Rotate secrets if any value is exposed accidentally.

## Pull Request Checklist

- [ ] Scope is clear and limited
- [ ] Build succeeds for changed projects
- [ ] Environment variable changes are documented
- [ ] README/docs updated when behavior changed
- [ ] No hardcoded hosts, credentials, or ports in business logic
