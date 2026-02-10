const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.warn('⚠️ MONGODB_URI not found. Starting in MOCK MODE.');
            return false;
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        console.warn('⚠️ Starting in MOCK MODE due to database connection error.');
        return false; // Don't exit, just return false
    }
};

module.exports = connectDB;
