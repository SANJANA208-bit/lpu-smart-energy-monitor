const Building = require('../models/Building');

// Get all buildings
exports.getAllBuildings = async (req, res, next) => {
    try {
        const buildings = await Building.find().sort({ building_name: 1 });

        res.status(200).json({
            success: true,
            count: buildings.length,
            data: buildings
        });
    } catch (error) {
        next(error);
    }
};

// Get building by ID
exports.getBuildingById = async (req, res, next) => {
    try {
        const building = await Building.findOne({ building_id: req.params.id });

        if (!building) {
            return res.status(404).json({
                success: false,
                error: 'Building not found'
            });
        }

        res.status(200).json({
            success: true,
            data: building
        });
    } catch (error) {
        next(error);
    }
};

// Create new building
exports.createBuilding = async (req, res, next) => {
    try {
        const building = await Building.create(req.body);

        res.status(201).json({
            success: true,
            data: building
        });
    } catch (error) {
        next(error);
    }
};

// Update building
exports.updateBuilding = async (req, res, next) => {
    try {
        const building = await Building.findOneAndUpdate(
            { building_id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!building) {
            return res.status(404).json({
                success: false,
                error: 'Building not found'
            });
        }

        res.status(200).json({
            success: true,
            data: building
        });
    } catch (error) {
        next(error);
    }
};

// Delete building
exports.deleteBuilding = async (req, res, next) => {
    try {
        const building = await Building.findOneAndDelete({ building_id: req.params.id });

        if (!building) {
            return res.status(404).json({
                success: false,
                error: 'Building not found'
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
