require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
let isDbConnected = false;

// Connect to MongoDB (Async)
const startServer = async () => {
    isDbConnected = await connectDB();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Routes with Mock Fallback
    app.use('/api/energy', (req, res, next) => {
        if (!isDbConnected) {
            // Return Mock Data if DB missing
            // This allows backend to "work" even without MongoDB
            try {
                const mockData = require('./data/energyData.json');
                return res.status(200).json({
                    success: true,
                    count: mockData.length,
                    data: mockData,
                    source: 'mock_fallback'
                });
            } catch (err) {
                console.error("Mock data not found:", err);
                return next();
            }
        }
        next();
    }, require('./routes/energy'));

    app.use('/api/buildings', require('./routes/buildings'));

    // Health check endpoint
    app.get('/api/health', (req, res) => {
        res.status(200).json({
            success: true,
            message: 'LPU Smart Energy Pulse API is running',
            timestamp: new Date().toISOString(),
            db_status: isDbConnected ? 'connected' : 'disconnected (mock mode)'
        });
    });

    // Error Handler (must be last)
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📊 API available at http://localhost:${PORT}/api`);
        if (!isDbConnected) console.log(`⚠️  Running in MOCK MODE (No DB)`);
    });
};

startServer();
