// Expected usage hours for each building category
export const EXPECTED_HOURS = {
    Academic: {
        type: 'single',
        ranges: [{ start: 9, end: 17 }] // 9 AM - 5 PM
    },
    Hostel: {
        type: 'multiple',
        ranges: [
            { start: 6, end: 9 },   // Morning: 6 AM - 9 AM
            { start: 18, end: 23 }  // Evening/Night: 6 PM - 11 PM
        ]
    },
    Mess: {
        type: 'multiple',
        ranges: [
            { start: 7, end: 9 },   // Breakfast: 7 AM - 9 AM
            { start: 12, end: 14 }, // Lunch: 12 PM - 2 PM
            { start: 19, end: 21 }  // Dinner: 7 PM - 9 PM
        ]
    },
    Library: {
        type: 'inverted',
        // Low usage from 12:30 AM - 8 AM (0-8 hours)
        // High usage rest of the day
        lowUsageRanges: [{ start: 0, end: 8 }]
    }
};

/**
 * Check if a given hour is within expected usage for a building category
 * @param {string} category - Building category (Academic, Hostel, Mess, Library)
 * @param {number} hour - Hour of day (0-23)
 * @returns {boolean} - True if hour is expected, false otherwise
 */
export const isExpectedHour = (category, hour) => {
    const config = EXPECTED_HOURS[category];
    if (!config) return false;

    if (config.type === 'inverted') {
        // For Library: check if NOT in low usage hours
        return !config.lowUsageRanges.some(range => hour >= range.start && hour <= range.end);
    }

    // For other categories: check if in any expected range
    return config.ranges.some(range => hour >= range.start && hour <= range.end);
};

/**
 * Get human-readable expected hours display for a category
 * @param {string} category - Building category
 * @returns {string} - Formatted expected hours string
 */
export const getExpectedHoursDisplay = (category) => {
    const config = EXPECTED_HOURS[category];
    if (!config) return 'Unknown';

    if (config.type === 'inverted') {
        return 'All day (Low usage: 12:30 AM - 8:00 AM)';
    }

    const formatHour = (hour) => {
        if (hour === 0) return '12:00 AM';
        if (hour === 12) return '12:00 PM';
        if (hour < 12) return `${hour}:00 AM`;
        return `${hour - 12}:00 PM`;
    };

    return config.ranges
        .map(range => `${formatHour(range.start)} - ${formatHour(range.end)}`)
        .join(', ');
};

/**
 * Get category color for consistent UI theming
 * @param {string} category - Building category
 * @returns {string} - CSS color value
 */
export const getCategoryColor = (category) => {
    const colors = {
        Academic: '#1976D2',
        Hostel: '#9C27B0',
        Mess: '#FF9800',
        Library: '#00897B'
    };
    return colors[category] || '#757575';
};
