# Deployment Guide

## GitHub Deployment Steps

Since Git operations are restricted in the Replit environment, follow these steps to deploy to GitHub:

### Step 1: Download Project Files
1. In Replit, click the **three dots menu** (⋯) in the file explorer
2. Select **"Download as ZIP"**
3. Extract the ZIP file to your local machine

### Step 2: Create GitHub Repository
1. Go to [github.com](https://github.com) and log in
2. Click **"New repository"**
3. Name it `stock-market-dashboard` (or your preferred name)
4. Add description: "Modern financial dashboard with React, Express, and PostgreSQL"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these files)
7. Click **"Create repository"**

### Step 3: Local Git Setup
Open terminal in your extracted project folder and run:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Stock Market Dashboard"

# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/stock-market-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Set Up GitHub Pages (Optional)
If you want to deploy the frontend as a static site:

1. Go to your repository settings
2. Navigate to **Pages** section
3. Set source to **GitHub Actions**
4. Create `.github/workflows/deploy.yml` with the build configuration

### Step 5: Environment Variables for Deployment
For production deployment, you'll need to set up:

```env
DATABASE_URL=your_production_database_url
NODE_ENV=production
```

## Alternative Deployment Options

### Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Railway
1. Connect GitHub repository to Railway
2. Add PostgreSQL addon
3. Set environment variables
4. Deploy

### Heroku
1. Create new Heroku app
2. Connect to GitHub repository
3. Add Heroku Postgres addon
4. Configure environment variables
5. Deploy

### DigitalOcean App Platform
1. Create new app from GitHub repository
2. Configure database component
3. Set environment variables
4. Deploy

## Production Considerations

1. **Database**: Set up production PostgreSQL database
2. **Environment Variables**: Configure all required env vars
3. **Build Process**: Ensure `npm run build` works correctly
4. **Security**: Review and update authentication settings
5. **Monitoring**: Set up error tracking and monitoring
6. **SSL**: Ensure HTTPS is configured
7. **Domain**: Configure custom domain if needed

The project is now ready for GitHub deployment and can be easily deployed to various hosting platforms.