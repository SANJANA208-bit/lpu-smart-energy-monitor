import { isExpectedHour } from './energyRules';

/**
 * Calculate waste score for a building based on energy usage outside expected hours
 * @param {Array} buildingData - Array of hourly energy data for a building
 * @param {string} category - Building category
 * @returns {Object} - Waste score details { score, percentage, color, label }
 */
export const calculateWasteScore = (buildingData, category) => {
    if (!buildingData || buildingData.length === 0) {
        return { score: 'Low', percentage: 0, color: '#4CAF50', label: 'No Data' };
    }

    let totalEnergy = 0;
    let wastedEnergy = 0;

    buildingData.forEach(record => {
        const energy = record.energy_kwh || 0;
        totalEnergy += energy;

        // If energy used outside expected hours, count as waste
        if (!isExpectedHour(category, record.hour)) {
            wastedEnergy += energy;
        }
    });

    const wastePercentage = totalEnergy > 0 ? (wastedEnergy / totalEnergy) * 100 : 0;

    // Thresholds for waste classification
    let score, color, label;
    if (wastePercentage < 15) {
        score = 'Low';
        color = '#4CAF50'; // Green
        label = 'Efficient';
    } else if (wastePercentage < 35) {
        score = 'Medium';
        color = '#FF9800'; // Orange
        label = 'Needs Attention';
    } else {
        score = 'High';
        color = '#F44336'; // Red
        label = 'Critical';
    }

    return {
        score,
        percentage: Math.round(wastePercentage * 10) / 10, // Round to 1 decimal
        color,
        label,
        totalEnergy: Math.round(totalEnergy),
        wastedEnergy: Math.round(wastedEnergy)
    };
};

/**
 * Get waste score for all buildings
 * @param {Array} allData - Complete energy dataset
 * @returns {Object} - Map of building_id to waste score
 */
export const calculateAllWasteScores = (allData) => {
    const buildingMap = {};

    // Group data by building
    allData.forEach(record => {
        if (!buildingMap[record.building_id]) {
            buildingMap[record.building_id] = {
                name: record.building_name,
                category: record.category,
                data: []
            };
        }
        buildingMap[record.building_id].data.push(record);
    });

    // Calculate waste score for each building
    const wasteScores = {};
    Object.keys(buildingMap).forEach(buildingId => {
        const building = buildingMap[buildingId];
        wasteScores[buildingId] = calculateWasteScore(building.data, building.category);
    });

    return wasteScores;
};

/**
 * Calculate campus-wide waste score
 * @param {Array} allData - Complete energy dataset
 * @returns {Object} - Overall waste score
 */
export const calculateCampusWasteScore = (allData) => {
    let totalEnergy = 0;
    let wastedEnergy = 0;

    allData.forEach(record => {
        const energy = record.energy_kwh || 0;
        totalEnergy += energy;

        if (!isExpectedHour(record.category, record.hour)) {
            wastedEnergy += energy;
        }
    });

    const wastePercentage = totalEnergy > 0 ? (wastedEnergy / totalEnergy) * 100 : 0;

    let score, color;
    if (wastePercentage < 15) {
        score = 'Low';
        color = '#4CAF50';
    } else if (wastePercentage < 35) {
        score = 'Medium';
        color = '#FF9800';
    } else {
        score = 'High';
        color = '#F44336';
    }

    return {
        score,
        percentage: Math.round(wastePercentage * 10) / 10,
        color,
        totalEnergy: Math.round(totalEnergy),
        wastedEnergy: Math.round(wastedEnergy)
    };
};
