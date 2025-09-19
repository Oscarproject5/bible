# Quick Deploy to Vercel

## Option 1: Deploy via Command Line (Recommended)

Run this command in your terminal:

```bash
cd bible-study-app
vercel
```

Follow the prompts:
1. Set up and deploy? **Yes**
2. Which scope? **Your account**
3. Link to existing project? **No** (create new)
4. What's your project's name? **bible-study-app** (or any name)
5. In which directory is your code? **./** (current directory)
6. Want to modify settings? **No**

## Option 2: Deploy via GitHub

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial deployment"
git remote add origin https://github.com/YOUR_USERNAME/bible-study-app.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

## After Deployment

### Set Up Database (Required for Admin Panel)

1. Go to your Vercel Dashboard
2. Select your project
3. Go to **Storage** tab
4. Click **Create Database** → **Postgres**
5. Create the database
6. Go to **Settings** → **Environment Variables**
7. The database variables are added automatically
8. Add one more variable:
   - Name: `ADMIN_PASSWORD`
   - Value: `your-secure-password`

### Enable Database in Code

1. In your local project:
```bash
cd app/api/admin/site-data
mv route.ts route.file.ts
mv route.vercel.ts route.ts
```

2. Commit and push:
```bash
git add .
git commit -m "Enable Vercel Postgres"
git push
```

3. Vercel will automatically redeploy

## Your URLs

After deployment, you'll get:
- Main site: `https://your-app.vercel.app`
- Admin panel: `https://your-app.vercel.app/admin`

## Test Your Site

1. Visit your main URL
2. Go to `/admin` to access the admin panel
3. Use password: `admin123` (change this in production!)
4. Update content and save
5. Check main page to see changes

## Troubleshooting

### Site loads but no data shows
- Database not connected yet (that's okay for now)
- Admin panel saves to localStorage until database is set up

### Can't access admin panel
- Make sure you're using the correct password
- Check browser console for errors

### Changes don't save
- Without database, changes only save in your browser
- Set up Vercel Postgres to persist data

## Next Steps

1. **Custom Domain**: Add your own domain in Vercel settings
2. **Database**: Set up Vercel Postgres for data persistence
3. **Security**: Change admin password in environment variables
4. **Analytics**: Enable Vercel Analytics (free tier available)