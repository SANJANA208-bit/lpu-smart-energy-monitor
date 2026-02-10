import { isExpectedHour, getExpectedHoursDisplay } from './energyRules';

/**
 * Generate human-readable insights from energy data
 * @param {Array} allData - Complete energy dataset
 * @returns {Array} - Array of insight objects
 */
export const generateInsights = (allData) => {
    const insights = [];
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

    // Analyze each building
    Object.keys(buildingMap).forEach(buildingId => {
        const building = buildingMap[buildingId];
        const { name, category, data } = building;

        // Find abnormal usage (high energy outside expected hours)
        const abnormalHours = [];
        let totalEnergy = 0;
        let abnormalEnergy = 0;

        data.forEach(record => {
            totalEnergy += record.energy_kwh;
            const expected = isExpectedHour(category, record.hour);

            // Flag if > 30 kWh outside expected hours (adjustable threshold)
            if (!expected && record.energy_kwh > 30) {
                abnormalHours.push({
                    hour: record.hour,
                    energy: record.energy_kwh
                });
                abnormalEnergy += record.energy_kwh;
            }
        });

        // Generate insights for significant anomalies
        if (abnormalHours.length > 0) {
            const abnormalPercentage = Math.round((abnormalEnergy / totalEnergy) * 100);

            // Determine severity
            let severity = 'low';
            if (abnormalPercentage > 35) severity = 'high';
            else if (abnormalPercentage > 15) severity = 'medium';

            // Format time range
            const hours = abnormalHours.map(h => h.hour).sort((a, b) => a - b);
            const minHour = hours[0];
            const maxHour = hours[hours.length - 1];
            const timeRange = formatTimeRange(minHour, maxHour);

            // Generate category-specific insights
            const insight = {
                id: `${buildingId}_${Date.now()}`,
                building: name,
                buildingId,
                category,
                timeRange,
                severity,
                abnormalPercentage,
                issue: generateIssueDescription(category, abnormalPercentage, timeRange),
                suggestion: generateSuggestion(category),
                expectedHours: getExpectedHoursDisplay(category),
                reviewed: false
            };

            insights.push(insight);
        }
    });

    // Sort by severity (high -> medium -> low)
    const severityOrder = { high: 0, medium: 1, low: 2 };
    insights.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    return insights;
};

/**
 * Format hour range into readable time
 */
const formatTimeRange = (startHour, endHour) => {
    const formatHour = (hour) => {
        if (hour === 0) return '12:00 AM';
        if (hour === 12) return '12:00 PM';
        if (hour < 12) return `${hour}:00 AM`;
        return `${hour - 12}:00 PM`;
    };

    if (startHour === endHour) {
        return formatHour(startHour);
    }
    return `${formatHour(startHour)} - ${formatHour(endHour)}`;
};

/**
 * Generate issue description based on category
 */
const generateIssueDescription = (category, percentage, timeRange) => {
    const templates = {
        Academic: `Consumes ${percentage}% of energy outside working hours (${timeRange}).`,
        Hostel: `Shows ${percentage}% energy usage during midday low-activity period (${timeRange}).`,
        Mess: `Uses ${percentage}% of energy outside meal preparation times (${timeRange}).`,
        Library: `Records ${percentage}% energy consumption during low-usage hours (${timeRange}).`
    };

    return templates[category] || `Shows abnormal energy usage pattern (${percentage}%).`;
};

/**
 * Generate actionable suggestion based on category
 */
const generateSuggestion = (category) => {
    const suggestions = {
        Academic: 'Inspect idle labs, computer rooms, and HVAC systems after working hours.',
        Hostel: 'Check for malfunctioning appliances or unnecessary lighting during midday.',
        Mess: 'Verify equipment shutdown protocols outside meal preparation windows.',
        Library: 'Review late-night lighting, HVAC, and computer systems scheduling.'
    };

    return suggestions[category] || 'Investigate energy usage patterns and optimize schedules.';
};

/**
 * Get insight count by severity
 */
export const getInsightStats = (insights) => {
    return {
        total: insights.length,
        high: insights.filter(i => i.severity === 'high').length,
        medium: insights.filter(i => i.severity === 'medium').length,
        low: insights.filter(i => i.severity === 'low').length,
        reviewed: insights.filter(i => i.reviewed).length
    };
};
