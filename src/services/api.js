import staticEnergyData from '../data/energyData.json';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Energy Data API
export const energyAPI = {
    getAll: async (filters = {}) => {
        try {
            const params = new URLSearchParams();
            if (filters.category && filters.category !== 'All') params.append('category', filters.category);
            if (filters.building && filters.building !== 'all') params.append('building', filters.building);
            if (filters.startHour !== undefined) params.append('startHour', filters.startHour);
            if (filters.endHour !== undefined) params.append('endHour', filters.endHour);

            const response = await fetch(`${API_BASE_URL}/energy?${params}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.warn('API Error, using static data:', error);
            // Fallback logic
            let data = [...staticEnergyData];
            if (filters.category && filters.category !== 'All') {
                data = data.filter(item => item.category === filters.category);
            }
            if (filters.building && filters.building !== 'all') {
                data = data.filter(item => item.building_id === filters.building);
            }
            return data;
        }
    },

    getByBuilding: async (buildingId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/energy/building/${buildingId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.warn('API Error, using static data:', error);
            return staticEnergyData.filter(item => item.building_id === buildingId);
        }
    },

    getAbnormal: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/energy/abnormal`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.warn('API Error, using static data:', error);
            // Simple mock logic for abnormal consumption (e.g., > 80 kWh)
            return staticEnergyData.filter(item => item.energy_kwh > 80);
        }
    },

    create: async (energyData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/energy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(energyData),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.warn('API Error, mock create:', error);
            return energyData;
        }
    }
};

// Building API
export const buildingAPI = {
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/buildings`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.warn('API Error, using static mock buildings:', error);
            return [
                { building_id: 'AB_A', name: 'Academic Block A', category: 'Academic' },
                { building_id: 'AB_B', name: 'Academic Block B', category: 'Academic' },
                { building_id: 'HH1', name: 'Hostel Block H1', category: 'Hostel' },
                { building_id: 'HH2', name: 'Hostel Block H2', category: 'Hostel' },
                { building_id: 'MESS', name: 'Mess Main', category: 'Mess' },
                { building_id: 'LIB', name: 'Central Library', category: 'Academic' }
            ];
        }
    },

    getById: async (buildingId) => {
        // Implementation similar to getAll with filter
        return null;
    }
};

// Health Check
export const healthCheck = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        return data.success;
    } catch (error) {
        return false; // Backend is offline
    }
};
