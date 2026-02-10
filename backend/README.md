# LPU Smart Energy Pulse - Backend API

REST API for the LPU Smart Energy Monitoring Dashboard built with Node.js, Express, and MongoDB.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ and npm
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the **root** directory (one level up):
   ```
   MONGODB_URI=mongodb://localhost:27017/lpu-energy
   PORT=5000
   NODE_ENV=development
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```

5. **Start the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

Server will run on: `http://localhost:5000`

---

## 📡 API Endpoints

### Energy Data

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/energy` | Get all energy records (with filters) |
| GET | `/api/energy/abnormal` | Get abnormal usage records |
| GET | `/api/energy/building/:buildingId` | Get energy data for specific building |
| POST | `/api/energy` | Add new energy record |
| PUT | `/api/energy/:id` | Update energy record |
| DELETE | `/api/energy/:id` | Delete energy record |

#### Query Parameters for `GET /api/energy`

- `category` - Filter by category (Academic/Hostel/Mess/Library)
- `building` - Filter by building ID (AB_A, AB_B, HH1, HH2, MESS, LIB)
- `startHour` - Filter by hour range (start, 0-23)
- `endHour` - Filter by hour range (end, 0-23)
- `abnormal` - Show only abnormal usage (true/false)

**Example:**
```
GET /api/energy?category=Academic&startHour=9&endHour=17
```

### Buildings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/buildings` | Get all buildings |
| GET | `/api/buildings/:id` | Get specific building |
| POST | `/api/buildings` | Add new building |
| PUT | `/api/buildings/:id` | Update building |
| DELETE | `/api/buildings/:id` | Delete building |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check API status |

---

## 📊 Database Schema

### EnergyData Collection

```javascript
{
  building_id: String,      // e.g., "AB_A"
  building_name: String,    // e.g., "Academic Block A"
  category: String,         // Academic | Hostel | Mess | Library
  hour: Number,             // 0-23
  energy_kwh: Number,       // Energy consumption in kWh
  date: Date,               // Date of record
  isAbnormal: Boolean,      // Flag for abnormal usage
  createdAt: Date,          // Auto-generated
  updatedAt: Date           // Auto-generated
}
```

### Building Collection

```javascript
{
  building_id: String,      // Unique ID
  building_name: String,    // Display name
  category: String,         // Academic | Hostel | Mess | Library
  location: String,         // Location on campus
  capacity: Number,         // Building capacity
  expected_hours: Object,   // Expected usage hours
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🗂️ Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── models/
│   ├── EnergyData.js         # Energy data schema
│   └── Building.js           # Building schema
├── controllers/
│   ├── energyController.js   # Energy data logic
│   └── buildingController.js # Building logic
├── routes/
│   ├── energy.js             # Energy routes
│   └── buildings.js          # Building routes
├── middleware/
│   └── errorHandler.js       # Error handling
├── utils/
│   └── seedData.js           # Database seeding
├── server.js                 # Express server
└── package.json              # Dependencies
```

---

## 💾 Database Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Sign up**: https://www.mongodb.com/cloud/atlas/register
2. **Create cluster**: Choose free tier (512 MB)
3. **Create database user**
4. **Whitelist IP**: Add `0.0.0.0/0` for all IPs (or your IP)
5. **Get connection string**: Click "Connect" → "Connect your application"
6. **Update .env**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lpu-energy?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB

1. **Install**: https://www.mongodb.com/try/download/community
2. **Start MongoDB**:
   ```bash
   mongod
   ```
3. **Update .env**:
   ```
   MONGODB_URI=mongodb://localhost:27017/lpu-energy
   ```

---

## 🧪 Testing the API

### Using cURL

```bash
# Get all energy data
curl http://localhost:5000/api/energy

# Get data for Academic buildings
curl http://localhost:5000/api/energy?category=Academic

# Get abnormal usage
curl http://localhost:5000/api/energy/abnormal

# Health check
curl http://localhost:5000/api/health
```

### Using Browser

Just open: `http://localhost:5000/api/energy`

---

## 🚀 Deployment

### Deploy to Render.com (Free)

1. **Create account**: https://render.com
2. **New Web Service**: Connect GitHub repo
3. **Configure**:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables: Add `MONGODB_URI`
4. **Deploy**: Click "Create Web Service"

Your API will be live at: `https://your-app.onrender.com`

---

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/lpu-energy` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |

---

## 📝 Scripts

```bash
npm start       # Start server (production)
npm run dev     # Start with nodemon (development)
npm run seed    # Populate database with sample data
```

---

## ⚠️ Important Notes

1. **CORS**: Enabled for all origins. Restrict in production.
2. **Seed Data**: Run `npm run seed` once to populate the database
3. **Environment**: Never commit `.env` file to Git
4. **MongoDB Atlas**: Use free tier (512 MB) for development

---

## 🐛 Troubleshooting

### "MONGODB_URI not defined"
- Make sure `.env` file is in the **root** directory (not backend folder)
- Check `.env` has the correct variable name

### "Connection refused"
- If using local MongoDB, ensure it's running: `mongod`
- If using Atlas, check IP whitelist

### "Cannot find module"
- Run `npm install` again
- Delete `node_modules` and run `npm install`

---

## 🔗 API Response Format

### Success Response
```json
{
  "success": true,
  "count": 144,
  "data": [...]
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here"
}
```

---

## 👤 Author

**SANJANA.S**  
LPU Smart Energy Pulse Project

---

## 📄 License

MIT
