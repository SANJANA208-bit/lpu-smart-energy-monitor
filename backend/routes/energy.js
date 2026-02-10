const express = require('express');
const router = express.Router();
const {
    getAllEnergyData,
    getEnergyDataByBuilding,
    getAbnormalUsage,
    createEnergyData,
    updateEnergyData,
    deleteEnergyData
} = require('../controllers/energyController');

// Routes
router.route('/')
    .get(getAllEnergyData)
    .post(createEnergyData);

router.route('/abnormal')
    .get(getAbnormalUsage);

router.route('/building/:buildingId')
    .get(getEnergyDataByBuilding);

router.route('/:id')
    .put(updateEnergyData)
    .delete(deleteEnergyData);

module.exports = router;
