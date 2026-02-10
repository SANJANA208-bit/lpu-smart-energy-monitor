# 🚀 READY TO PUSH - Git Commands to Run

## ⚠️ IMPORTANT: Restart PowerShell First!

After installing Git, you **MUST** close PowerShell completely and open a NEW PowerShell window.

**How to restart PowerShell:**
1. Close ALL PowerShell windows
2. Press `Windows Key` + `X`
3. Click "Windows PowerShell" or "Terminal"
4. You're ready!

---

## ✅ Step 1: Verify Git is Working

After restarting PowerShell, run:

```powershell
git --version
```

**Expected output:** `git version 2.x.x`

If you see this, Git is working! Continue below.

---

## 📝 Step 2: Configure Git (One-Time Setup)

```powershell
git config --global user.name "SANJANA.S"
git config --global user.email "sanjana208.bit@gmail.com"
```

Replace the email if you use a different one for GitHub.

---

## 🌐 Step 3: Create GitHub Repository

**Before running commands, create the repository on GitHub:**

1. Go to: https://github.com/new
2. Repository name: `lpu-smart-energy-monitor`
3. Description: `LPU Time-Aware Smart Campus Energy Monitor - Topcoder × LPU Hackathon 2026`
4. **Visibility**: ✅ **PUBLIC** (CRITICAL!)
5. **DO NOT check any boxes**
6. Click "Create repository"

---

## 💻 Step 4: Run These Commands

**Copy and paste these commands ONE BY ONE:**

```powershell
# Navigate to your project
cd c:\Users\SANJANA\Desktop\Project

# Step 1: Initialize Git repository
git init

# Step 2: Add all files
git add .

# Step 3: Create first commit
git commit -m "feat: Complete LPU Smart Energy Monitor - Topcoder Hackathon Submission"

# Step 4: Rename branch to main
git branch -M main

# Step 5: Connect to GitHub
git remote add origin https://github.com/SANJANA208-bit/lpu-smart-energy-monitor.git

# Step 6: Push to GitHub
git push -u origin main
```

---

## 🔑 Step 5: Authentication

When `git push` asks for credentials:

**Username:** `SANJANA208-bit`

**Password:** **USE A PERSONAL ACCESS TOKEN** (NOT your GitHub password)

### How to Create a Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. **Name**: `Topcoder Hackathon`
4. **Expiration**: 30 days
5. **Scopes**: Check ✅ **`repo`** (Full control)
6. Click: **"Generate token"**
7. **COPY THE TOKEN** (shown only once!)
8. **Paste it as your password** when pushing

---

## ✅ Step 6: Verify Success

After pushing, go to:
```
https://github.com/SANJANA208-bit/lpu-smart-energy-monitor
```

You should see:
- ✅ All your files
- ✅ Professional README.md
- ✅ "Public" badge on the repository

---

## 📋 What's Being Pushed

Your repository includes ALL required components:

### ✅ Complete Source Code
- `src/` folder with all React components
- `backend/` folder with complete API
- All utility files and logic

### ✅ Proper Folder Structure
```
lpu-smart-energy-monitor/
├── src/
│   ├── components/      # 7 React components
│   ├── data/           # Energy dataset (144 records)
│   ├── utils/          # Rule-based logic
│   └── services/       # API integration
├── backend/
│   ├── config/         # Database config
│   ├── models/         # MongoDB schemas
│   ├── controllers/    # Business logic
│   ├── routes/         # API endpoints
│   └── utils/          # Seed data
├── README.md           # Professional documentation ✅
├── package.json        # Dependencies
└── submission-info.txt # Topcoder file
```

### ✅ Well-Written README.md

Your README.md includes:
- ✅ **Project Overview** - Problem statement and solution
- ✅ **Features Implemented** - All 40+ features listed
- ✅ **Tech Stack Used** - React, Vite, Recharts, Node.js, MongoDB
- ✅ **Steps to Run Locally** - Complete installation guide
- Plus: Deployment instructions, SDG alignment, etc.

---

## 🐛 Troubleshooting

### "git: command not found" after restart
**Solution:** 
1. Check Git installation: Go to `C:\Program Files\Git`
2. If not there, reinstall Git
3. Restart computer (not just PowerShell)

### "remote origin already exists"
**Solution:**
```powershell
git remote remove origin
git remote add origin https://github.com/SANJANA208-bit/lpu-smart-energy-monitor.git
git push -u origin main
```

### "fatal: not a git repository"
**Solution:** Make sure you're in the right folder:
```powershell
cd c:\Users\SANJANA\Desktop\Project
git init
```

### Authentication fails
**Solution:** 
- Make sure you're using the Personal Access Token, NOT your password
- Generate a new token if needed
- Username should be: `SANJANA208-bit`

---

## 🎯 Quick Checklist

Before pushing:
- [ ] Closed and reopened PowerShell
- [ ] `git --version` works
- [ ] Created PUBLIC repository on GitHub
- [ ] Generated Personal Access Token

After pushing:
- [ ] Repository is visible at https://github.com/SANJANA208-bit/lpu-smart-energy-monitor
- [ ] Repository shows "Public" badge
- [ ] README.md displays correctly
- [ ] All files are visible

---

## 🎉 After Successful Push

Once your code is on GitHub:

1. **Update submission-info.txt:**
   - Confirm GitHub URL is correct
   - Keep for Topcoder submission

2. **Next step: Deploy to Vercel**
   - See `TOPCODER_SUBMISSION_CHECKLIST.md` for deployment

3. **Create ZIP for Topcoder**
   - After deployment is live
   - Include updated submission-info.txt

---

**Ready?** 

1. ✅ **Restart PowerShell now**
2. ✅ **Create GitHub repository** (Step 3)
3. ✅ **Run the commands** (Step 4)

**You've got this!** 🚀

---

**Project**: LPU Time-Aware Smart Campus Energy Monitor  
**Developer**: SANJANA.S  
**GitHub**: [@SANJANA208-bit](https://github.com/SANJANA208-bit)
