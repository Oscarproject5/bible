# Vercel Postgres Database Setup Guide

## Overview
This app is configured to use Vercel Postgres for storing all site data including text content, images, and form submissions. This guide will help you set up the database for production deployment.

## Step 1: Create Vercel Account and Project

1. Go to [vercel.com](https://vercel.com) and sign up
2. Connect your GitHub repository
3. Import this project

## Step 2: Create Postgres Database

1. In your Vercel Dashboard, go to the **Storage** tab
2. Click **Create Database**
3. Select **Postgres**
4. Choose a database name (e.g., `bible-study-db`)
5. Select your region (choose closest to your users)
6. Click **Create**

## Step 3: Get Database Credentials

1. After creation, click on your database
2. Go to the **`.env.local`** tab
3. Copy all the environment variables shown
4. You'll see something like:
   ```
   POSTGRES_URL="..."
   POSTGRES_PRISMA_URL="..."
   POSTGRES_URL_NO_SSL="..."
   POSTGRES_URL_NON_POOLING="..."
   POSTGRES_USER="..."
   POSTGRES_HOST="..."
   POSTGRES_PASSWORD="..."
   POSTGRES_DATABASE="..."
   ```

## Step 4: Add Environment Variables to Vercel

1. Go to your project settings in Vercel
2. Navigate to **Environment Variables**
3. Add all the Postgres variables from Step 3
4. Also add:
   ```
   ADMIN_PASSWORD=your-secure-password-here
   ```
5. Save the changes

## Step 5: For Local Development

1. Copy `.env.example` to `.env.local`
2. Fill in the database credentials from Vercel
3. The app will now use Vercel Postgres locally too

## Step 6: Switch API Route

**IMPORTANT**: Before deploying, rename the API route files:

```bash
# In app/api/admin/site-data/
# Rename the current file-based route
mv route.ts route.file.ts

# Use the Vercel Postgres route
mv route.vercel.ts route.ts
```

## Step 7: Initialize Database

The database tables will be created automatically on first use. The app will:
- Create `site_config` table for storing site settings
- Create `images` table for gallery images
- Create `registrations` table for form submissions

## Step 8: Deploy

```bash
# Deploy to Vercel
vercel --prod
```

## Database Schema

The app uses three main tables:

### site_config
- Stores all text content and settings
- Key-value pairs with JSON support

### images
- Stores gallery images (up to 8)
- Includes alt text and captions
- Images stored as base64 strings

### registrations
- Stores form submissions
- Includes name, email, phone, and timestamp

## Troubleshooting

### Database Connection Errors
- Ensure all environment variables are set correctly
- Check that your IP is whitelisted (Vercel handles this automatically)
- Verify the database is active in Vercel Dashboard

### Data Not Persisting
- Check browser console for errors
- Ensure the API route is using `route.vercel.ts`
- Verify database tables were created

### Local Development Issues
- Make sure `.env.local` has valid credentials
- Restart the dev server after changing environment variables
- Check that `@vercel/postgres` is installed

## Migration from File Storage

If you have existing data in `data/site-data.json`:

1. Keep the file temporarily
2. Deploy with Vercel Postgres
3. Use the admin panel to manually re-enter your content
4. Or create a migration script to import the JSON data

## Costs

Vercel Postgres Free Tier includes:
- 60 compute hours per month
- 256MB storage
- Perfect for small sites

For larger sites, paid plans start at $15/month.

## Security Notes

- Never commit `.env.local` to Git
- Use strong passwords for ADMIN_PASSWORD
- Enable 2FA on your Vercel account
- Regularly backup your database

## Need Help?

- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Next.js Database Integration](https://nextjs.org/docs/app/building-your-application/data-fetching)
- Check the browser console and Vercel function logs for errors