const express = require('express');
const router = express.Router();
const {
    getAllBuildings,
    getBuildingById,
    createBuilding,
    updateBuilding,
    deleteBuilding
} = require('../controllers/buildingController');

// Routes
router.route('/')
    .get(getAllBuildings)
    .post(createBuilding);

router.route('/:id')
    .get(getBuildingById)
    .put(updateBuilding)
    .delete(deleteBuilding);

module.exports = router;
