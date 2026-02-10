const EnergyData = require('../models/EnergyData');

// Get all energy data with optional filters
exports.getAllEnergyData = async (req, res, next) => {
    try {
        const {
            category,
            building,
            startHour,
            endHour,
            abnormal
        } = req.query;

        // Build query object
        const query = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (building && building !== 'all') {
            query.building_id = building;
        }

        if (startHour !== undefined && endHour !== undefined) {
            query.hour = { $gte: parseInt(startHour), $lte: parseInt(endHour) };
        }

        if (abnormal === 'true') {
            query.isAbnormal = true;
        }

        const energyData = await EnergyData.find(query).sort({ building_id: 1, hour: 1 });

        res.status(200).json({
            success: true,
            count: energyData.length,
            data: energyData
        });
    } catch (error) {
        next(error);
    }
};

// Get energy data by building ID
exports.getEnergyDataByBuilding = async (req, res, next) => {
    try {
        const energyData = await EnergyData.find({ building_id: req.params.buildingId })
            .sort({ hour: 1 });

        if (!energyData.length) {
            return res.status(404).json({
                success: false,
                error: 'No energy data found for this building'
            });
        }

        res.status(200).json({
            success: true,
            count: energyData.length,
            data: energyData
        });
    } catch (error) {
        next(error);
    }
};

// Get abnormal usage data
exports.getAbnormalUsage = async (req, res, next) => {
    try {
        const abnormalData = await EnergyData.find({ isAbnormal: true })
            .sort({ building_id: 1, hour: 1 });

        res.status(200).json({
            success: true,
            count: abnormalData.length,
            data: abnormalData
        });
    } catch (error) {
        next(error);
    }
};

// Add new energy data record
exports.createEnergyData = async (req, res, next) => {
    try {
        const energyData = await EnergyData.create(req.body);

        res.status(201).json({
            success: true,
            data: energyData
        });
    } catch (error) {
        next(error);
    }
};

// Update energy data record
exports.updateEnergyData = async (req, res, next) => {
    try {
        const energyData = await EnergyData.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!energyData) {
            return res.status(404).json({
                success: false,
                error: 'Energy data not found'
            });
        }

        res.status(200).json({
            success: true,
            data: energyData
        });
    } catch (error) {
        next(error);
    }
};

// Delete energy data record
exports.deleteEnergyData = async (req, res, next) => {
    try {
        const energyData = await EnergyData.findByIdAndDelete(req.params.id);

        if (!energyData) {
            return res.status(404).json({
                success: false,
                error: 'Energy data not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};
