import React from 'react';
import './SummaryCards.css';

const SummaryCards = ({ data, wasteScores, insights }) => {
    // Calculate total energy
    const totalEnergy = data.reduce((sum, record) => sum + record.energy_kwh, 0);

    // Find highest consuming building
    const buildingTotals = {};
    data.forEach(record => {
        if (!buildingTotals[record.building_name]) {
            buildingTotals[record.building_name] = 0;
        }
        buildingTotals[record.building_name] += record.energy_kwh;
    });

    const buildingEntries = Object.entries(buildingTotals);
    const highestBuilding = buildingEntries.reduce((max, curr) =>
        curr[1] > max[1] ? curr : max, ['', 0]
    );
    const lowestBuilding = buildingEntries.reduce((min, curr) =>
        curr[1] < min[1] ? curr : min, ['', Infinity]
    );

    // Count buildings with abnormal usage
    const abnormalBuildings = Object.values(wasteScores).filter(
        score => score.score === 'High' || score.score === 'Medium'
    ).length;

    // Overall campus waste
    const totalWasted = Object.values(wasteScores).reduce((sum, score) => sum + (score.wastedEnergy || 0), 0);
    const wastePercentage = totalEnergy > 0 ? (totalWasted / totalEnergy) * 100 : 0;
    let campusWasteLevel = 'Low';
    let campusWasteColor = '#4CAF50';
    if (wastePercentage > 35) {
        campusWasteLevel = 'High';
        campusWasteColor = '#F44336';
    } else if (wastePercentage > 15) {
        campusWasteLevel = 'Medium';
        campusWasteColor = '#FF9800';
    }

    const cards = [
        {
            id: 'total-energy',
            title: 'Total Energy Consumed',
            value: `${Math.round(totalEnergy).toLocaleString()} kWh`,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
                </svg>
            ),
            color: '#2196F3',
            tooltip: 'Total energy consumption across all buildings and time periods'
        },
        {
            id: 'highest-building',
            title: 'Highest Consuming Building',
            value: highestBuilding[0],
            subtitle: `${Math.round(highestBuilding[1])} kWh`,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
                    <path d="M17 8l2-2 2 2" />
                </svg>
            ),
            color: '#F44336',
            tooltip: 'Building with the highest overall energy consumption'
        },
        {
            id: 'lowest-building',
            title: 'Lowest Consuming Building',
            value: lowestBuilding[0],
            subtitle: `${Math.round(lowestBuilding[1])} kWh`,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
                    <path d="M17 16l2 2 2-2" />
                </svg>
            ),
            color: '#4CAF50',
            tooltip: 'Building with the lowest overall energy consumption'
        },
        {
            id: 'abnormal-buildings',
            title: 'Buildings with Abnormal Usage',
            value: abnormalBuildings.toString(),
            subtitle: `${insights.length} alerts generated`,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <path d="M12 9v4M12 17h.01" />
                </svg>
            ),
            color: '#FF9800',
            tooltip: 'Number of buildings showing energy waste patterns'
        },
        {
            id: 'campus-waste',
            title: 'Overall Campus Waste Level',
            value: campusWasteLevel,
            subtitle: `${wastePercentage.toFixed(1)}% of total energy`,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                </svg>
            ),
            color: campusWasteColor,
            tooltip: 'Aggregate waste level across all campus buildings'
        }
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="summary-cards" id="dashboard">
            <div className="container">
                <div className="summary-cards-header">
                    <h2 className="section-title">Campus Energy Overview</h2>
                    <p className="text-muted">Key metrics at a glance</p>
                </div>

                <div className="cards-grid">
                    {cards.map(card => (
                        <div
                            key={card.id}
                            className="summary-card card-clickable"
                            style={{ '--card-color': card.color }}
                            onClick={() => scrollToSection('charts')}
                            data-tooltip={card.tooltip}
                        >
                            <div className="card-icon" style={{ background: card.color }}>
                                {card.icon}
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{card.title}</h3>
                                <div className="card-value">{card.value}</div>
                                {card.subtitle && (
                                    <div className="card-subtitle">{card.subtitle}</div>
                                )}
                            </div>
                            <div className="card-indicator" style={{ background: card.color }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;
