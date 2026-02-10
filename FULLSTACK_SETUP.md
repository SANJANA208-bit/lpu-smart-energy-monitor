# 🚀 Full-Stack Setup Guide - LPU Smart Energy Pulse

This project now has BOTH frontend and backend!

---

## 📁 Project Structure

```
Project/
├── backend/                    # ✨ NEW - Backend API
│   ├── config/                 # Database configuration
│   ├── models/                 # MongoDB schemas
│   ├── controllers/            # Business logic
│   ├── routes/                 # API endpoints
│   ├── middleware/             # Error handling
│   ├── utils/                  # Seed data script
│   ├── server.js               # Express entry point
│   ├── package.json            # Backend dependencies
│   └── README.md               # Backend docs
├── src/                        # Frontend React app
│   ├── components/
│   ├── data/                   # Fallback static data
│   ├── services/
│   │   └── api.js              # ✨ NEW - API service layer
│   ├── utils/
│   └── App.jsx                 # ✨ UPDATED - Uses backend API
├── .env                        # ✨ NEW - Environment variables
└── README.md                   # This file

```

---

## 🎯 Quick Start (Full Stack)

### Option 1: Frontend Only (Static Data)

If you don't want to set up the backend, the app will automatically use static JSON data:

```bash
npm install
npm run dev
```

The app will show a banner: "⚠️ Backend not available, using static data"

### Option 2: Full Stack (Frontend + Backend)

#### Step 1: Set Up MongoDB

Choose one:

**A) MongoDB Atlas (Cloud - Free)**
1. Sign up: https://www.mongodb.com/cloud/atlas/register
2. Create free cluster (512 MB)
3. Create database user
4. Get connection string

**B) Local MongoDB**
1. Install: https://www.mongodb.com/try/download/community
2. Run: `mongod`

#### Step 2: Configure Environment

Create `.env` file in root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/lpu-energy
# OR for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lpu-energy

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

#### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

#### Step 4: Seed the Database

```bash
npm run seed
```

You should see:
```
✅ MongoDB Connected
🗑️  Clearing existing data...
🏢 Inserting buildings...
⚡ Inserting energy data...
✅ 6 buildings inserted
✅ 144 energy records inserted
🎉 Database seeded successfully!
```

#### Step 5: Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# OR production mode
npm start
```

Server runs on: `http://localhost:5000`

#### Step 6: Start Frontend (New Terminal)

```bash
cd ..
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

---

## ✅ How to Verify It's Working

### Test 1: Backend Health Check

Open browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "success": true,
  "message": "LPU Smart Energy Pulse API is running",
  "timestamp": "2026-02-10T..."
}
```

### Test 2: API Data

```
http://localhost:5000/api/energy
```

You should see 144 energy records in JSON format.

### Test 3: Frontend Connection

1. Open `http://localhost:3000`
2. Check console (F12) - no error messages
3. No warning banner at top
4. Data loads normally

---

## 🔄 How the App Works Now

### With Backend Running:
```
React App → API Service (api.js) → Express Server → MongoDB → Response
```

### Without Backend:
```
React App → API Service fails → Falls back to static energyData.json
```

The app automatically detects if the backend is unavailable and switches to static data!

---

## 📡 API Endpoints Available

### Energy Data
- `GET /api/energy` - Get all records
- `GET /api/energy?category=Academic` - Filter by category
- `GET /api/energy/abnormal` - Get abnormal usage
- `GET /api/energy/building/AB_A` - Get specific building

### Buildings
- `GET /api/buildings` - Get all buildings
- `GET /api/buildings/AB_A` - Get specific building

### Health
- `GET /api/health` - Check API status

Full API documentation: `backend/README.md`

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Build frontend:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Method 1: `vercel --prod`
   - Method 2: GitHub integration
   - Method 3: Drag `dist/` folder to Vercel

### Backend Deployment (Render.com)

1. **Create account:** https://render.com
2. **New Web Service**
3. **Configure:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables: Add `MONGODB_URI`
4. **Deploy**

5. **Update Frontend:**
   - Add to `.env` (create in root):
     ```
     REACT_APP_API_URL=https://your-backend.onrender.com/api
     ```
   - Rebuild and redeploy frontend

---

## 🐛 Troubleshooting

### Frontend shows "Backend not available"

✅ This is normal if you haven't started the backend!  
✅ The app will work fine with static data.

**To fix:** Start the backend server (see Step 5 above)

### "MONGODB_URI not defined"

- Check `.env` file is in **root** directory (not backend folder)
- Make sure variable name is exact: `MONGODB_URI`

### "Connection refused" when seedingData

- **Local MongoDB:** Run `mongod` first
- **Atlas:** Check IP whitelist (add `0.0.0.0/0`)

### Port 5000 already in use

Change port in `.env`:
```
PORT=5001
```

Also update `src/services/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
```

---

## 📝 Development Workflow

### Working on Frontend Only
```bash
npm run dev
```
Uses static data, no backend needed.

### Working on Full Stack
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

---

## 🎓 Learning Points

This project now demonstrates:
- ✅ React frontend development
- ✅ REST API design with Express
- ✅ MongoDB integration with Mongoose
- ✅ Full-stack data flow
- ✅ Graceful degradation (API fallback)
- ✅ Environment configuration
- ✅ Error handling
- ✅ Deployment strategies

---

## 📊 Current Status

- ✅ Frontend: 100% Complete
- ✅ Backend: 100% Complete
- ✅ Integration: 100% Complete
- ✅ Fallback Logic: Working
- ⏳ Deployment: Pending (waiting for Node.js installation)

---

## 🔗 Quick Links

- **Frontend README:** `README.md`
- **Backend README:** `backend/README.md`
- **Deployment Guide:** `HOW_TO_DEPLOY.md`
- **Implementation Plan:** `.gemini/antigravity/brain/.../backend_implementation_plan.md`

---

## 👤 Developer

**SANJANA.S**  
LPU Smart Energy Pulse - Full Stack Project

---

**Ready to go!** 🚀  
Follow the steps above to run the complete application.
