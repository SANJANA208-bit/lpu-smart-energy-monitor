# 🚀 Render Backend Deployment Guide

## ✅ What You'll Get
- **Live Backend API** (e.g., `https://lpu-backend.onrender.com`)
- **Connected Database** (MongoDB Atlas)
- **Full Stack App** (Frontend + Backend linked)

---

## 📋 Step 1: Set Up MongoDB Database (Required)
Since Render doesn't host databases for free, use **MongoDB Atlas** (Free).

1. Go to: **[mongodb.com/atlas](https://www.mongodb.com/cloud/atlas/register)**
2. Sign up (Free)
3. Create a **Shared Cluster** (Free Tier)
4. Create a **Database User** (Username/Password)
5. **Network Access**: Add IP Address `0.0.0.0/0` (Allow all)
6. **Get Connection String**:
   - Click "Connect" → "Drivers"
   - Copy the string (looks like: `mongodb+srv://user:pass@cluster...`)
   - **Replace `<password>` with your actual password!**

---

## 📋 Step 2: Deploy to Render

1. Go to: **[render.com](https://render.com)**
2. Sign up with **GitHub**
3. Click **"New +"** → **"Web Service"**
4. Select **"Build and deploy from a Git repository"**
5. Connect your repo: `lpu-smart-energy-monitor`
6. **Configure Settings:**

   | Setting | Value |
   |---------|-------|
   | **Name** | `lpu-backend` (or similar) |
   | **Region** | Singapore (or closest to you) |
   | **Branch** | `main` |
   | **Root Directory** | `backend` (⚠️ IMPORTANT!) |
   | **Runtime** | Node |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |

7. **Environment Variables** (Scroll down):
   - Click **"Add Environment Variable"**
   - Key: `MONGODB_URI`
   - Value: (Paste your connection string from Step 1)

8. Click **"Create Web Service"**

---

## 📋 Step 3: Wait & Verify

1. Render will start building (takes ~2-3 minutes)
2. Watch the logs. You should see:
   ```
   ✅ MongoDB Connected
   Server running on port 10000
   ```
3. Once live, copy your **Backend URL** (top left, e.g., `https://lpu-backend.onrender.com`)

---

## 📋 Step 4: Connect Frontend to Backend

1. Go to your **Vercel Dashboard**
2. Select your project (`lpu-smart-energy-monitor`)
3. Go to **Settings** → **Environment Variables**
4. Add New Variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.onrender.com/api` (Add `/api` at the end!)
5. Save
6. Go to **Deployments** tab → **Redeploy** the latest commit

---

## 🎉 Success!

Your app is now **Full Stack**:
- **Frontend**: Hosted on Vercel
- **Backend**: Hosted on Render
- **Database**: Hosted on MongoDB Atlas

**Verify:**
- Open your Vercel app
- It should NOT show the "Static Data" banner anymore!
