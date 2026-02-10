# LPU Time-Aware Smart Campus Energy Monitor

> **Topcoder × LPU Hackathon 2026**  
> **Right Energy, Right Place, Right Time**

A rule-based, time-aware energy monitoring dashboard for Lovely Professional University (LPU) that helps authorities identify abnormal energy usage, detect waste, and make data-driven decisions for sustainable campus management.

---

## 📋 Project Overview

### Problem Statement

LPU campus currently lacks a centralized system to monitor and analyze energy consumption patterns across different building types. This leads to:

- ⚡ **Silent Energy Waste** - High consumption during idle hours goes unnoticed
- 🔍 **Lack of Visibility** - No clear understanding of which buildings consume energy at what time
- 📊 **No Actionable Insights** - Raw meter data doesn't translate to corrective actions
- 💡 **Inefficient Operations** - Buildings operate outside expected hours without alerts

### Our Solution

A **time-aware dashboard** that:
- Monitors energy consumption across 6 campus buildings (Academic, Hostel, Mess, Library)
- Uses **rule-based logic** (no AI/ML) to detect abnormal usage patterns
- Compares actual usage vs. expected time windows for each building category
- Generates human-readable insights with actionable suggestions
- Assigns an **Energy Waste Score** (Low/Medium/High) to each building
- Provides clear visualizations for quick decision-making

---

## ✨ Features Implemented

### Core Features
- ✅ **Building-Wise Energy Visualization** - Separate tracking for 6 buildings across 4 categories
- ✅ **Hourly & Daily Comparison** - Toggle between hourly breakdown and daily aggregation
- ✅ **Time-Aware Rules** - Expected usage windows defined per building category
- ✅ **Abnormal Usage Detection** - Automatic flagging of unexpected consumption patterns
- ✅ **Energy Waste Score** - Low (<15%), Medium (15-35%), High (>35%) classification
- ✅ **Auto-Generated Insights** - Human-readable alerts with severity indicators

### Dashboard Components
- ✅ **Live Time Display** - Real-time clock showing current time
- ✅ **5 Summary Cards** - Total energy, highest/lowest buildings, abnormal count, campus waste level
- ✅ **Interactive Charts** - Bar, Line, and Pie charts with Recharts library
- ✅ **Smart Filters** - Category, building, time view, and time range filtering
- ✅ **Insights Panel** - Category-specific suggestions and "Mark as Reviewed" functionality
- ✅ **Waste Score Meter** - Color-coded visual meter with calculation transparency

### Design Features
- ✅ **Premium UI** - Modern green/blue color palette with glassmorphism effects
- ✅ **Custom Logo** - Hand-crafted SVG with campus buildings and energy pulse
- ✅ **Smooth Animations** - Fade-ins, hover effects, and transitions
- ✅ **Responsive Design** - Desktop-first, mobile-friendly layout
- ✅ **Google Fonts** - Inter (UI) and Poppins (headings) for professional look

### Backend API (Full-Stack)
- ✅ **REST API** - Node.js + Express.js with MongoDB
- ✅ **11 API Endpoints** - Complete CRUD operations for energy data and buildings
- ✅ **Smart Fallback** - Automatic switch to static JSON if backend unavailable
- ✅ **Database Seeding** - Automated data population with 144 records

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite (fast development and optimized builds)
- **Charts**: Recharts (React-native charting library)
- **Styling**: Vanilla CSS with custom design system
- **Fonts**: Google Fonts (Inter, Poppins)

### Backend (Optional - Full-Stack)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: None (basic version)

### Data
- **Static Dataset**: 144 records (6 buildings × 24 hours)
- **Dynamic Database**: MongoDB (when backend is running)

### Deployment
- **Frontend**: Vercel (zero-config deployment)
- **Backend**: Render.com (free tier)
- **Database**: MongoDB Atlas (cloud)

---

## 🧠 How the System Works

### Rule-Based Logic (No AI/ML)

Our system uses **transparent, explainable rules** instead of black-box AI:

#### 1. Expected Usage Windows

Each building category has predefined "expected high usage" hours:

| Building Category | Expected Hours | Reasoning |
|-------------------|----------------|-----------|
| **Academic** | 9:00 AM - 5:00 PM | Classes and office hours |
| **Hostel** | 6:00 AM - 9:00 AM, 6:00 PM - 11:00 PM | Morning prep + evening/night |
| **Mess** | 7:00 AM - 9:00 AM, 12:00 PM - 2:00 PM, 7:00 PM - 9:00 PM | Meal times only |
| **Library** | 9:00 AM - 11:30 PM | All day except late night |

#### 2. Abnormal Usage Detection

Energy consumption is flagged as abnormal when:
```
IF (current_hour NOT IN expected_hours) AND (energy_kwh > threshold):
    MARK AS ABNORMAL
```

#### 3. Waste Score Calculation

```
Waste Percentage = (Energy Outside Expected Hours / Total Energy) × 100

Classification:
- Low (✅):    < 15%   → Efficient Operation
- Medium (⚠️): 15-35% → Needs Attention  
- High (🚨):   > 35%  → Critical Waste
```

#### 4. Insight Generation

When waste is detected, the system generates insights like:

> **🚨 Academic Block A - Critical Waste Detected**  
> **Issue**: High energy consumption (125 kWh) outside working hours (8 PM - 11 PM)  
> **Expected**: 9 AM - 5 PM  
> **Suggestion**: Check for equipment left running after hours. Consider automated shutoffs.

---

## 🚀 Steps to Run Locally

### Prerequisites
- Node.js v16 or higher ([Download](https://nodejs.org/))
- npm or yarn package manager

### Frontend Only (Static Data)

```bash
# 1. Clone the repository
git clone https://github.com/SANJANA208-bit/lpu-smart-energy-monitor.git
cd lpu-smart-energy-monitor

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
# Visit: http://localhost:3000
```

### Full-Stack (With Backend)

```bash
# 1. Set up MongoDB (choose one):
#    A) MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
#    B) Local MongoDB: Install and run 'mongod'

# 2. Configure environment variables
# Create .env file in root directory:
echo "MONGODB_URI=mongodb://localhost:27017/lpu-energy
PORT=5000
NODE_ENV=development" > .env

# 3. Install and seed backend
cd backend
npm install
npm run seed

# 4. Start backend server
npm run dev
# Backend runs on http://localhost:5000

# 5. Start frontend (new terminal)
cd ..
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

### Build for Production

```bash
npm run build
# Optimized build created in dist/ folder
```

---

## 🌐 Deployment

### Live Application

**Deployed URL**: `https://lpu-smart-energy-pulse.vercel.app`  
_(Update with actual Vercel deployment link)_

### Deployment Method

1. **Frontend to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

2. **Backend to Render** (optional):
   - Create account at https://render.com
   - New Web Service → Connect GitHub repo
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variable: `MONGODB_URI`

3. **Database to MongoDB Atlas**:
   - Free tier (512 MB) at https://www.mongodb.com/cloud/atlas
   - Create cluster → Get connection string → Add to `.env`

---

## 📦 Project Structure

```
lpu-smart-energy-monitor/
├── public/                      # Static assets
├── src/
│   ├── components/              # React components
│   │   ├── Header.jsx          # Logo, live time, navigation
│   │   ├── FilterPanel.jsx     # Building/category/time filters
│   │   ├── SummaryCards.jsx    # 5 metric overview cards
│   │   ├── Charts.jsx          # Bar/Line/Pie visualizations
│   │   ├── WasteScore.jsx      # Waste meter component
│   │   ├── InsightsPanel.jsx   # Alert cards with suggestions
│   │   └── Footer.jsx          # SDG 7 badge and credits
│   ├── data/
│   │   └── energyData.json     # 144 realistic data points
│   ├── utils/
│   │   ├── energyRules.js      # Expected hours definitions
│   │   ├── wasteCalculator.js  # Waste score logic
│   │   └── insightGenerator.js # Alert generation logic
│   ├── services/
│   │   └── api.js              # Backend API integration
│   ├── styles/
│   │   └── index.css           # Global styles & design system
│   ├── App.jsx                 # Main application component
│   └── main.jsx                # React entry point
├── backend/                     # Optional backend API
│   ├── config/                 # Database configuration
│   ├── models/                 # MongoDB schemas
│   ├── controllers/            # API logic
│   ├── routes/                 # API endpoints
│   ├── middleware/             # Error handling
│   ├── utils/                  # Seed data script
│   └── server.js               # Express server
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── .env                        # Environment variables (not in Git)
├── .gitignore                  # Git ignore rules
├── README.md                   # This file
└── submission-info.txt         # Topcoder submission file
```

---

## 📊 Data Structure

### Energy Record Format
```json
{
  "building_id": "AB_A",
  "building_name": "Academic Block A",
  "category": "Academic",
  "hour": 14,
  "energy_kwh": 93
}
```

### Buildings Included
1. **Academic Block A** - Large academic building
2. **Academic Block B** - Medium academic building
3. **Hostel Block H1** - Student residence
4. **Hostel Block H2** - Student residence
5. **Mess Main** - Central dining facility
6. **Central Library** - 24/7 library facility

---

## 🎯 Alignment with UN SDG 7

This project supports **UN Sustainable Development Goal 7**:
> **Ensure access to affordable, reliable, sustainable and modern energy for all**

By identifying and reducing energy waste, we contribute to:
- 💰 **Cost Reduction** - Lower electricity bills for LPU
- 🌍 **Environmental Impact** - Reduced carbon footprint
- ♻️ **Sustainable Operations** - Better resource utilization
- 📈 **Data-Driven Decisions** - Evidence-based energy management

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ React component architecture and state management
- ✅ Data visualization with Recharts
- ✅ Rule-based logic implementation
- ✅ RESTful API design (backend)
- ✅ MongoDB integration (backend)
- ✅ Responsive UI/UX design
- ✅ Clean code organization
- ✅ Git version control
- ✅ Cloud deployment (Vercel/Render)

---

## 🔮 Future Enhancements

- [ ] Real-time IoT sensor integration for live data
- [ ] User authentication and role-based access
- [ ] Email/SMS alerts for critical waste
- [ ] Historical trend analysis and forecasting
- [ ] Mobile application (React Native)
- [ ] Multi-campus support
- [ ] PDF report generation
- [ ] Custom threshold configuration by admin

---

## 👥 Team

**Developer**: SANJANA.S  
**University**: Lovely Professional University  
**Hackathon**: Topcoder × LPU 2026  
**GitHub**: [@SANJANA208-bit](https://github.com/SANJANA208-bit)

---

## 📄 License

This project is created for educational and hackathon purposes as part of the Topcoder × LPU Hackathon 2026.

---

## 🙏 Acknowledgments

- **LPU** for providing the problem statement
- **Topcoder** for organizing the hackathon
- **React Team** for the amazing framework
- **Recharts** for beautiful chart components
- **Vercel** for seamless deployment

---

**Made with ❤️ for a sustainable future**

**SDG 7** | **Clean Energy** | **Smart Campus** | **Data-Driven**
