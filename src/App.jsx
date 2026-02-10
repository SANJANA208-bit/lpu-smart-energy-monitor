import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import SummaryCards from './components/SummaryCards';
import ChartContainer from './components/Charts';
import InsightsPanel from './components/InsightsPanel';
import WasteScore from './components/WasteScore';
import Footer from './components/Footer';
import { energyAPI } from './services/api';
import energyDataRaw from './data/energyData.json'; // Fallback data
import { generateInsights } from './utils/insightGenerator';
import { calculateAllWasteScores } from './utils/wasteCalculator';
import './App.css';

function App() {
    // Filter state
    const [filters, setFilters] = useState({
        category: 'All',
        building: 'all',
        timeView: 'Hourly',
        timeRange: 'all'
    });

    // Data state
    const [energyDataFromAPI, setEnergyDataFromAPI] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [useBackend, setUseBackend] = useState(true); // Toggle between API and static data

    // Processed data state
    const [filteredData, setFilteredData] = useState([]);
    const [insights, setInsights] = useState([]);
    const [wasteScores, setWasteScores] = useState({});


    // Fetch data from backend on mount
    useEffect(() => {
        const fetchData = async () => {
            if (!useBackend) {
                // Use static data
                setEnergyDataFromAPI(energyDataRaw);
                setFilteredData(energyDataRaw);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await energyAPI.getAll();
                setEnergyDataFromAPI(data);
                setFilteredData(data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch from API, using static data:', err);
                setError('Backend not available, using static data');
                setEnergyDataFromAPI(energyDataRaw);
                setFilteredData(energyDataRaw);
                setUseBackend(false); // Fallback to static data
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [useBackend]);

    // Apply filters and generate insights whenever data or filters change
    useEffect(() => {
        if (energyDataFromAPI.length > 0) {
            applyFilters();
        }
    }, [filters, energyDataFromAPI]);

    const applyFilters = () => {
        const sourceData = energyDataFromAPI.length > 0 ? energyDataFromAPI : energyDataRaw;
        let filtered = [...sourceData];

        // Filter by category
        if (filters.category !== 'All') {
            filtered = filtered.filter(d => d.category === filters.category);
        }

        // Filter by building
        if (filters.building !== 'all') {
            filtered = filtered.filter(d => d.building_id === filters.building);
        }

        // Filter by time range
        const timeRangeMap = {
            morning: [6, 11],
            working: [9, 16],
            evening: [17, 21],
            night: [22, 5]
        };

        if (filters.timeRange !== 'all' && timeRangeMap[filters.timeRange]) {
            const [start, end] = timeRangeMap[filters.timeRange];
            if (start <= end) {
                filtered = filtered.filter(d => d.hour >= start && d.hour <= end);
            } else {
                // Handle night range (wraps around midnight)
                filtered = filtered.filter(d => d.hour >= start || d.hour <= end);
            }
        }

        // Aggregate by day if daily view is selected
        if (filters.timeView === 'Daily') {
            const dailyAgg = {};
            filtered.forEach(record => {
                const key = `${record.building_id}`;
                if (!dailyAgg[key]) {
                    dailyAgg[key] = {
                        building_id: record.building_id,
                        building_name: record.building_name,
                        category: record.category,
                        hour: 0, // Represents daily total
                        energy_kwh: 0
                    };
                }
                dailyAgg[key].energy_kwh += record.energy_kwh;
            });
            filtered = Object.values(dailyAgg);
        }

        setFilteredData(filtered);

        // Generate insights and waste scores
        const newInsights = generateInsights(filtered.length > 0 ? filtered : sourceData);
        setInsights(newInsights);

        const newWasteScores = calculateAllWasteScores(filtered.length > 0 ? filtered : sourceData);
        setWasteScores(newWasteScores);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));

        // Auto-reset building filter if category changes
        if (filterName === 'category') {
            setFilters(prev => ({
                ...prev,
                building: 'all'
            }));
        }
    };

    const handleApplyFilters = () => {
        applyFilters();
        // Smooth scroll to dashboard
        document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleClearFilters = () => {
        setFilters({
            category: 'All',
            building: 'all',
            timeView: 'Hourly',
            timeRange: 'all'
        });
    };

    const handleReset = () => {
        handleClearFilters();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleMarkReviewed = (insightId) => {
        setInsights(prev =>
            prev.map(insight =>
                insight.id === insightId
                    ? { ...insight, reviewed: true }
                    : insight
            )
        );
    };


    // Get current building data for waste score
    const getCurrentBuildingData = () => {
        const sourceData = energyDataFromAPI.length > 0 ? energyDataFromAPI : energyDataRaw;
        if (filters.building !== 'all') {
            return filteredData;
        }
        return sourceData;
    };

    const getCurrentBuildingName = () => {
        const sourceData = energyDataFromAPI.length > 0 ? energyDataFromAPI : energyDataRaw;
        if (filters.building !== 'all') {
            const building = sourceData.find(d => d.building_id === filters.building);
            return building ? building.building_name : 'Campus';
        }
        return 'All Campus Buildings';
    };

    const getCurrentCategory = () => {
        const sourceData = energyDataFromAPI.length > 0 ? energyDataFromAPI : energyDataRaw;
        if (filters.building !== 'all') {
            const building = sourceData.find(d => d.building_id === filters.building);
            return building ? building.category : 'Academic';
        }
        return filters.category !== 'All' ? filters.category : 'Academic';
    };

    // Loading state
    if (loading) {
        return (
            <div className="app">
                <Header onReset={() => { }} />
                <div className="loading-container">
                    <h2>Loading energy data...</h2>
                    <p>Please wait</p>
                </div>
            </div>
        );
    }


    return (
        <div className="app">
            {error && (
                <div className="backend-status-banner">
                    ⚠️ {error}
                </div>
            )}
            <Header onReset={handleReset} />

            <main className="main-content">
                <FilterPanel
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                />

                <SummaryCards
                    data={filteredData}
                    wasteScores={wasteScores}
                    insights={insights}
                />

                <ChartContainer
                    data={filteredData}
                    filters={filters}
                />

                <WasteScore
                    buildingData={getCurrentBuildingData()}
                    category={getCurrentCategory()}
                    buildingName={getCurrentBuildingName()}
                />

                <InsightsPanel
                    insights={insights}
                    onMarkReviewed={handleMarkReviewed}
                />
            </main>

            <Footer />
        </div>
    );
}

export default App;
