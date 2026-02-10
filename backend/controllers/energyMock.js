const EnergyData = require('../models/EnergyData');

// Mock Data for fallback
const MOCK_ENERGY_DATA = [
    { buildingId: "B001", timestamp: new Date().toISOString(), value: 450, unit: "kWh" },
    { buildingId: "B002", timestamp: new Date().toISOString(), value: 320, unit: "kWh" },
    { buildingId: "B003", timestamp: new Date().toISOString(), value: 550, unit: "kWh" },
    // Add more mock data as needed
];

exports.getEnergyData = async (req, res) => {
    try {
        // Check if mongoose is connected
        if (require('mongoose').connection.readyState !== 1) {
            return res.status(200).json({
                success: true,
                count: MOCK_ENERGY_DATA.length,
                data: MOCK_ENERGY_DATA,
                source: 'mock_fallback'
            });
        }

        const data = await EnergyData.find();
        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

exports.addEnergyData = async (req, res) => {
    // ... existing implementation ...
    try {
        if (require('mongoose').connection.readyState !== 1) {
            return res.status(201).json({
                success: true,
                data: req.body,
                message: 'Mock data added (not saved to DB)'
            });
        }
        const data = await EnergyData.create(req.body);
        res.status(201).json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// ... other methods ...
