# Deployment Guide for Bible Study App

## Current Setup (Local Only)
- Data saves to `data/site-data.json` file
- Works only on your computer
- Not suitable for production hosting

## For Production Deployment

### Recommended: Deploy to Vercel with Database

#### Step 1: Set up Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Import your repository

#### Step 2: Set up Database Storage

**Option A: Vercel KV (Simplest)**
1. In Vercel Dashboard, go to Storage tab
2. Create a KV database
3. Install package: `npm install @vercel/kv`
4. Replace `route.ts` with `route-vercel-kv.ts.example`

**Option B: Supabase (Free tier available)**
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Install: `npm install @supabase/supabase-js`
4. Update API route to use Supabase

#### Step 3: Environment Variables
Add to Vercel dashboard:
```
ADMIN_PASSWORD=your-secure-password-here
KV_URL=your-kv-url
KV_REST_API_URL=your-api-url
KV_REST_API_TOKEN=your-token
KV_REST_API_READ_ONLY_TOKEN=your-read-token
```

#### Step 4: Update Admin Authentication
Replace hardcoded password with environment variable:

```typescript
// In admin/page.tsx
const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
    setIsAuthenticated(true);
    // ...
  }
};
```

## Alternative: Static Hosting (No Admin Panel)
If you don't need users to edit content:
1. Edit `site-data.json` locally
2. Deploy to Netlify, GitHub Pages, or Vercel
3. Rebuild site when content changes

## Security Considerations
1. **Never commit passwords** to GitHub
2. **Use environment variables** for sensitive data
3. **Add authentication** for admin panel
4. **Enable CORS** protection
5. **Use HTTPS** in production

## Cost Comparison

| Service | Free Tier | Best For |
|---------|-----------|----------|
| Vercel + KV | 30MB storage | Small sites |
| Supabase | 500MB database | Medium sites |
| Firebase | 1GB storage | Any size |
| MongoDB Atlas | 512MB | Complex data |

## Deployment Commands

```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

## Need Help?
- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Database options: Check each service's documentation