# 🚀 Vercel Deployment Guide - Step by Step

## ✅ What You'll Get

After deployment, your project will be:
- 🌐 **Live on the internet** with a public URL
- ⚡ **Super fast** (Vercel's global CDN)
- 🔄 **Auto-updated** when you push to GitHub
- 🆓 **Free** (Vercel's hobby plan)

---

## 📋 Deployment Steps

### Step 1: Go to Vercel

Open your browser and go to: **https://vercel.com**

### Step 2: Sign Up/Login

**Best option:** Click **"Sign Up with GitHub"**

Why? It automatically connects your GitHub repositories!

1. Click **"Continue with GitHub"**
2. Log in to GitHub if asked
3. **Authorize Vercel** to access your repositories
4. Complete the signup (name, email verification if needed)

### Step 3: Import Your Project

Once logged in:

1. Click **"Add New..."** (top right)
2. Select **"Project"**
3. You'll see a list of your GitHub repositories
4. Find: **`lpu-smart-energy-monitor`**
5. Click **"Import"** next to it

### Step 4: Configure Project (Super Easy!)

Vercel will auto-detect it's a Vite project:

**Build Settings** (should be auto-filled):
- Framework Preset: **Vite** ✅ (auto-detected)
- Build Command: `npm run build` ✅
- Output Directory: `dist` ✅
- Install Command: `npm install` ✅

**Just leave everything as default!**

### Step 5: Deploy!

1. Scroll down
2. Click the big **"Deploy"** button
3. Wait 2-3 minutes while Vercel:
   - Installs dependencies
   - Builds your project
   - Deploys to global CDN

You'll see a progress screen with logs.

### Step 6: Success! 🎉

When deployment finishes:
- You'll see **confetti animation** 🎊
- Your live URL will appear (like: `https://lpu-smart-energy-monitor.vercel.app`)
- Click **"Visit"** to see your live site!

---

## 🔗 Your Live URL

After deployment, you'll get a URL like:
```
https://lpu-smart-energy-monitor-[random].vercel.app
```

You can also get a cleaner URL:
```
https://lpu-smart-energy-monitor.vercel.app
```

---

## ✅ Verify Deployment

After deployment, check:
- [ ] Dashboard loads without errors
- [ ] Charts display correctly
- [ ] Filters work
- [ ] All components render properly
- [ ] No console errors (press F12)

---

## 📝 Update submission-info.txt

Once deployed:

1. **Copy your Vercel URL**
2. **Open** `submission-info.txt`
3. **Update** the "Deployed Application Link" section:
   ```
   Deployed Application Link:
   https://your-actual-url.vercel.app
   ```
4. **Save** the file
5. **Re-upload** to GitHub (update the file)

---

## 🎯 If You Need Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your desired domain
4. Vercel will guide you through DNS setup

---

## 🐛 Troubleshooting

### Build Fails
**Check:**
- package.json is in repository ✅
- All source files uploaded ✅
- No syntax errors in code ✅

**Solution:** Check build logs, fix any errors, push to GitHub again

### Site Shows Error
**Check:**
- Build completed successfully
- dist/ folder was generated
- No missing files

**Solution:** Redeploy from Vercel dashboard

### 404 Error on Routes
**For Vite/React Router:** Add `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

(Already in your project! ✅)

---

## 🔄 Auto-Deployment

**Cool feature:** Every time you push to GitHub:
- Vercel automatically builds and deploys! 🎉
- No manual deployment needed
- Takes 2-3 minutes per update

---

## 📊 What Gets Deployed

Your Vercel deployment includes:
- ✅ Complete React frontend
- ✅ All charts and visualizations
- ✅ All components and features
- ✅ Static energy data (JSON fallback)

**Note:** Backend (Node.js API) is optional:
- Frontend works standalone with static data ✅
- Backend can be deployed separately to Render/Railway

---

## ⚡ Quick Alternative: Deploy from CLI

If you have Node.js installed:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 🎉 You're Almost Done!

After Vercel deployment:
- ✅ Code on GitHub (PUBLIC)
- ✅ App deployed on Vercel (LIVE)
- ⏳ Update submission-info.txt with URL
- ⏳ Create ZIP for Topcoder
- ⏳ Submit to Topcoder!

---

**Follow the steps above and your app will be live in 5 minutes!** 🚀

**Project:** LPU Time-Aware Smart Campus Energy Monitor  
**Developer:** SANJANA.S  
**Submission:** Topcoder × LPU Hackathon 2026
