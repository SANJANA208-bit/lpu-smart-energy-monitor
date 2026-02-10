# 🚀 Git Setup & Push Guide for Topcoder Submission

Follow these exact steps to push your project to GitHub.

---

## ✅ Prerequisites Check

First, verify Git is installed:

```powershell
git --version
```

**If not installed:**
1. Download from: https://git-scm.com/download/win
2. Install with default settings
3. **Restart PowerShell** after installation

---

## 📋 Step-by-Step Instructions

### Step 1: Create GitHub Repository

1. Go to: https://github.com/SANJANA208-bit
2. Click **"New"** (green button) or go to: https://github.com/new
3. Repository name: `lpu-smart-energy-monitor`
4. Description: `LPU Time-Aware Smart Campus Energy Monitor - Topcoder × LPU Hackathon 2026`
5. **Visibility**: ✅ **PUBLIC** (IMPORTANT!)
6. **DO NOT** check "Add a README file"
7. **DO NOT** check "Add .gitignore"
8. **DO NOT** check "Choose a license"
9. Click **"Create repository"**

### Step 2: Configure Git (First Time Only)

Open PowerShell and run:

```powershell
# Set your name
git config --global user.name "SANJANA.S"

# Set your email (use your GitHub email)
git config --global user.email "your-email@example.com"
```

### Step 3: Initialize Local Repository

```powershell
# Navigate to your project
cd c:\Users\SANJANA\Desktop\Project

# Initialize Git repository
git init

# Check status
git status
```

### Step 4: Add All Files

```powershell
# Add all files to staging
git add .

# Verify files are staged
git status
```

You should see all your files in green.

### Step 5: Make Initial Commit

```powershell
git commit -m "Initial commit: LPU Smart Energy Monitor - Complete hackathon project"
```

### Step 6: Rename Branch to 'main'

```powershell
git branch -M main
```

### Step 7: Connect to GitHub

Replace `SANJANA208-bit` with your actual GitHub username if different:

```powershell
git remote add origin https://github.com/SANJANA208-bit/lpu-smart-energy-monitor.git
```

### Step 8: Push to GitHub

```powershell
git push -u origin main
```

**If prompted for credentials:**
- Use your GitHub username
- For password, use a **Personal Access Token** (not your GitHub password)

**To create a Personal Access Token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: `Topcoder Hackathon`
4. Expiration: 30 days
5. Check: `repo` (Full control of private repositories)
6. Click "Generate token"
7. **COPY THE TOKEN** (you won't see it again!)
8. Use this token as your password

---

## 📝 Making Additional Commits (If Needed)

If you need to make changes after initial push:

```powershell
# 1. Make your changes to files

# 2. Add changed files
git add .

# 3. Commit with descriptive message
git commit -m "Add feature: [describe your change]"

# 4. Push to GitHub
git push
```

### Suggested Commit Messages

Use these for organized commit history:

```bash
git commit -m "feat: Add energy dataset and rule-based logic"
git commit -m "feat: Implement dashboard with interactive charts"
git commit -m "feat: Add insight generation and waste scoring"
git commit -m "feat: Implement backend API with MongoDB"
git commit -m "style: Add premium UI with glassmorphism effects"
git commit -m "docs: Add comprehensive README and submission files"
git commit -m "deploy: Prepare for Vercel deployment"
```

---

## 🔍 Verification Steps

After pushing, verify everything is correct:

### 1. Check GitHub Repository

1. Go to: https://github.com/SANJANA208-bit/lpu-smart-energy-monitor
2. Verify:
   - ✅ Repository is **PUBLIC** (you should see a "Public" badge)
   - ✅ All files are visible
   - ✅ README.md displays properly
   - ✅ No sensitive files (like `.env` with actual credentials)

### 2. Check Commit History

1. Click "X commits" (where X is the number of commits)
2. Verify:
   - ✅ Commits have descriptive messages
   - ✅ Your name and email are correct
   - ✅ Dates are accurate

### 3. Update submission-info.txt

Once repository is live, update the file:

1. Open `submission-info.txt`
2. Verify GitHub URL is correct
3. Keep it ready for ZIP submission

---

## 🎯 Creating Clean Commit History (Advanced)

If you want to split the initial commit into multiple logical commits:

```powershell
# Reset to before initial commit (keeps all changes)
git reset HEAD~1

# Now commit in logical chunks:

# 1. Project setup
git add package.json vite.config.js index.html .gitignore
git commit -m "chore: Initialize React project with Vite"

# 2. Data layer
git add src/data/
git commit -m "feat: Add realistic energy dataset (144 records)"

# 3. Rule engine
git add src/utils/
git commit -m "feat: Implement rule-based logic engine"

# 4. Components
git add src/components/
git commit -m "feat: Build dashboard components and charts"

# 5. API integration
git add src/services/ backend/
git commit -m "feat: Add backend API with MongoDB"

# 6. Styling
git add src/index.css src/components/*.css
git commit -m "style: Apply premium design system"

# 7. Documentation
git add README.md submission-info.txt PPT_OUTLINE.md
git commit -m "docs: Add comprehensive documentation"

# Force push (overwrites previous history)
git push -f origin main
```

**⚠️ Warning:** Only do this if you haven't shared the repository yet!

---

## 🐛 Troubleshooting

### Problem: "git: command not found"
**Solution:** Install Git from https://git-scm.com/download/win and restart PowerShell

### Problem: "Permission denied (publickey)"
**Solution:** Use HTTPS URL, not SSH. Use Personal Access Token as password.

### Problem: "Repository not found"
**Solution:** 
- Check repository name is exactly: `lpu-smart-energy-monitor`
- Verify it exists on GitHub
- Check you're using correct username

### Problem: Large files error
**Solution:**
```powershell
# Remove node_modules if accidentally added
git rm -r --cached node_modules
git rm -r --cached backend/node_modules
git commit -m "Remove node_modules"
git push
```

### Problem: ".env file exposed"
**Solution:**
```powershell
# Remove .env from Git
git rm --cached .env
git commit -m "Remove .env file"
git push

# Then change your MongoDB password immediately!
```

---

## ✅ Final Checklist

Before submitting to Topcoder:

- [ ] Repository is PUBLIC on GitHub
- [ ] URL is: `https://github.com/SANJANA208-bit/lpu-smart-energy-monitor`
- [ ] All files are pushed (check on GitHub)
- [ ] README.md displays correctly
- [ ] No `.env` file with real credentials
- [ ] No `node_modules` folder
- [ ] submission-info.txt has correct URLs
- [ ] Commit history looks professional
- [ ] Application is deployed on Vercel
- [ ] Deployed URL is added to submission-info.txt

---

## 📦 Creating ZIP for Submission

After everything is on GitHub:

```powershell
# Option 1: Download from GitHub
# Go to: https://github.com/SANJANA208-bit/lpu-smart-energy-monitor
# Click "Code" → "Download ZIP"

# Option 2: Create ZIP locally (without node_modules)
# 1. Delete node_modules folders
# 2. Right-click project folder → Send to → Compressed (zipped) folder
# 3. Rename to: lpu-smart-energy-monitor.zip
```

**ZIP should include:**
- ✅ All source code
- ✅ README.md
- ✅ submission-info.txt
- ✅ package.json
- ✅ NO node_modules folder
- ✅ NO .env with real credentials

---

**You're ready for Topcoder submission!** 🎉

**Next Steps:**
1. Push to GitHub (Steps above)
2. Deploy to Vercel (see DEPLOY_GUIDE.md or HOW_TO_DEPLOY.md)
3. Update submission-info.txt with live URL
4. Create ZIP
5. Submit to Topcoder!
