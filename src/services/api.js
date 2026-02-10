const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Energy Data API
export const energyAPI = {
    getAll: async (filters = {}) => {
        const params = new URLSearchParams();

        if (filters.category && filters.category !== 'All') {
            params.append('category', filters.category);
        }
        if (filters.building && filters.building !== 'all') {
            params.append('building', filters.building);
        }
        if (filters.startHour !== undefined) {
            params.append('startHour', filters.startHour);
        }
        if (filters.endHour !== undefined) {
            params.append('endHour', filters.endHour);
        }

        const response = await fetch(`${API_BASE_URL}/energy?${params}`);
        const data = await response.json();
        return data.data || [];
    },

    getByBuilding: async (buildingId) => {
        const response = await fetch(`${API_BASE_URL}/energy/building/${buildingId}`);
        const data = await response.json();
        return data.data || [];
    },

    getAbnormal: async () => {
        const response = await fetch(`${API_BASE_URL}/energy/abnormal`);
        const data = await response.json();
        return data.data || [];
    },

    create: async (energyData) => {
        const response = await fetch(`${API_BASE_URL}/energy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(energyData),
        });
        const data = await response.json();
        return data.data;
    }
};

// Building API
export const buildingAPI = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/buildings`);
        const data = await response.json();
        return data.data || [];
    },

    getById: async (buildingId) => {
        const response = await fetch(`${API_BASE_URL}/buildings/${buildingId}`);
        const data = await response.json();
        return data.data;
    }
};

// Health Check
export const healthCheck = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('API Health Check Failed:', error);
        return false;
    }
};
