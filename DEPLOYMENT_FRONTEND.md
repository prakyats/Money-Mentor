# Frontend Deployment Guide

Both **landing** and **dashboard** are production-built and ready to deploy.

## Quick Start: Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Fastest)

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy Landing
cd apps/landing
vercel --prod

# Deploy Dashboard  
cd ../dashboard
vercel --prod
```

When prompted, link to your GitHub repo and choose "monorepo" structure.

---

### Option 2: Deploy via GitHub Integration (Recommended)

1. **Connect GitHub to Vercel:**
   - Go to [vercel.com](https://vercel.com) → Sign in → Import Project
   - Select your Money-Mentor repo from GitHub
   - Choose the monorepo structure option

2. **For Landing:**
   - Root directory: `apps/landing`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variables: (see below)

3. **For Dashboard:**
   - Root directory: `apps/dashboard`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variables: (see below)

---

## Environment Variables for Production

### Landing Frontend
```env
VITE_API_BASE_URL=https://money-mentor-backend-b32y.onrender.com/api/v1
```

### Dashboard Frontend
```env
VITE_API_BASE_URL=https://money-mentor-backend-b32y.onrender.com/api/v1
VITE_LANDING_LOGIN_URL=https://your-landing-domain.vercel.app/login
```

---

## Post-Deployment: Update Backend CORS

Once your frontends are deployed, add them to the Render backend CORS allowlist:

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Select Money-Mentor Backend Service**
3. **Environment Variables** → Find `CORS_ORIGIN`
4. **Update to include all frontend origins:**
   ```
   https://your-landing-domain.vercel.app,https://your-dashboard-domain.vercel.app
   ```
5. **Save** and the service will restart automatically

---

## Build Outputs (Already Generated)

| App | Build Output | Size |
|-----|--------------|------|
| `apps/landing/dist` | ~57 KB (gzip) | Ready |
| `apps/dashboard/dist` | TBD | Ready |

---

## Verification After Deploy

1. **Visit Landing:** https://your-landing-domain.vercel.app
2. **Test Sign Up** → Check Network for successful 201
3. **Test Login** → Should redirect to dashboard
4. **Visit Dashboard:** https://your-dashboard-domain.vercel.app
5. **Check Session** → `/users/me` should return current user
6. **Test Transactions** → Create/list should work

---

## If CORS Still Fails After Update

1. Check the exact origin your browser is using (Network tab headers)
2. Ensure it matches exactly in Render `CORS_ORIGIN` (case-sensitive, no trailing slash)
3. Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Wait 30 seconds for Render service restart to complete

---

## Next Steps

1. Deploy both apps to Vercel following Option 1 or 2
2. Note the final URLs (e.g., `landing.vercel.app`, `dashboard.vercel.app`)
3. Update Render `CORS_ORIGIN` with those URLs
4. Run verification tests above
5. Share the live URLs to test

