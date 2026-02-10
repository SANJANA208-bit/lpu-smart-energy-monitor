import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange, onApplyFilters, onClearFilters }) => {
    const buildings = [
        { id: 'all', name: 'All Buildings' },
        { id: 'AB_A', name: 'Academic Block A', category: 'Academic' },
        { id: 'AB_B', name: 'Academic Block B', category: 'Academic' },
        { id: 'HH1', name: 'Hostel Block H1', category: 'Hostel' },
        { id: 'HH2', name: 'Hostel Block H2', category: 'Hostel' },
        { id: 'MESS', name: 'Mess Main', category: 'Mess' },
        { id: 'LIB', name: 'Central Library', category: 'Library' }
    ];

    const categories = ['All', 'Academic', 'Hostel', 'Mess', 'Library'];
    const timeViews = ['Hourly', 'Daily'];
    const timeRanges = [
        { id: 'all', label: 'All Day', hours: [0, 23] },
        { id: 'morning', label: 'Morning (6 AM - 12 PM)', hours: [6, 11] },
        { id: 'working', label: 'Working Hours (9 AM - 5 PM)', hours: [9, 16] },
        { id: 'evening', label: 'Evening (5 PM - 10 PM)', hours: [17, 21] },
        { id: 'night', label: 'Night (10 PM - 6 AM)', hours: [22, 5] }
    ];

    // Filter buildings by category
    const filteredBuildings = filters.category === 'All'
        ? buildings
        : buildings.filter(b => b.category === filters.category || b.id === 'all');

    return (
        <div className="filter-panel" id="filters">
            <div className="container">
                <div className="filter-panel-header">
                    <h2 className="section-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                        </svg>
                        Filter & Analyze
                    </h2>
                    <p className="text-muted">Customize your energy analysis view</p>
                </div>

                <div className="filters-grid">
                    {/* Building Category Filter */}
                    <div className="filter-group">
                        <label className="filter-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            </svg>
                            Building Category
                        </label>
                        <select
                            className="filter-select"
                            value={filters.category}
                            onChange={(e) => onFilterChange('category', e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Building Select */}
                    <div className="filter-group">
                        <label className="filter-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                                <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M8 10h.01M8 14h.01M16 14h.01" />
                            </svg>
                            Building
                        </label>
                        <select
                            className="filter-select"
                            value={filters.building}
                            onChange={(e) => onFilterChange('building', e.target.value)}
                        >
                            {filteredBuildings.map(building => (
                                <option key={building.id} value={building.id}>
                                    {building.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Time View */}
                    <div className="filter-group">
                        <label className="filter-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                            Time View
                        </label>
                        <div className="toggle-group">
                            {timeViews.map(view => (
                                <button
                                    key={view}
                                    className={`toggle-btn ${filters.timeView === view ? 'active' : ''}`}
                                    onClick={() => onFilterChange('timeView', view)}
                                >
                                    {view}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Range */}
                    <div className="filter-group">
                        <label className="filter-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <path d="M16 2v4M8 2v4M3 10h18" />
                            </svg>
                            Time Range
                        </label>
                        <select
                            className="filter-select"
                            value={filters.timeRange}
                            onChange={(e) => onFilterChange('timeRange', e.target.value)}
                        >
                            {timeRanges.map(range => (
                                <option key={range.id} value={range.id}>
                                    {range.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="filter-actions">
                    <button className="btn btn-primary" onClick={onApplyFilters}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <path d="M22 4L12 14.01l-3-3" />
                        </svg>
                        Apply Filters
                    </button>
                    <button className="btn btn-outline" onClick={onClearFilters}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
