import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getCategoryColor, isExpectedHour } from '../utils/energyRules';
import './Charts.css';

const ChartContainer = ({ data, filters }) => {
    const [activeChart, setActiveChart] = useState('bar');

    // Prepare data for charts
    const prepareBarChartData = () => {
        const buildingTotals = {};
        data.forEach(record => {
            if (!buildingTotals[record.building_name]) {
                buildingTotals[record.building_name] = {
                    name: record.building_name,
                    energy: 0,
                    category: record.category
                };
            }
            buildingTotals[record.building_name].energy += record.energy_kwh;
        });

        return Object.values(buildingTotals).map(building => ({
            ...building,
            energy: Math.round(building.energy),
            fill: getCategoryColor(building.category)
        }));
    };

    const prepareLineChartData = () => {
        const hourlyData = {};
        data.forEach(record => {
            if (!hourlyData[record.hour]) {
                hourlyData[record.hour] = {
                    hour: record.hour,
                    energy: 0,
                    category: record.category,
                    isExpected: isExpectedHour(record.category, record.hour)
                };
            }
            hourlyData[record.hour].energy += record.energy_kwh;
        });

        return Object.values(hourlyData)
            .sort((a, b) => a.hour - b.hour)
            .map(h => ({
                ...h,
                hour: `${h.hour}:00`,
                energy: Math.round(h.energy),
                abnormal: !h.isExpected && h.energy > 30
            }));
    };

    const preparePieChartData = () => {
        const categoryTotals = {};
        data.forEach(record => {
            if (!categoryTotals[record.category]) {
                categoryTotals[record.category] = 0;
            }
            categoryTotals[record.category] += record.energy_kwh;
        });

        return Object.entries(categoryTotals).map(([category, energy]) => ({
            name: category,
            value: Math.round(energy),
            color: getCategoryColor(category)
        }));
    };

    const barData = prepareBarChartData();
    const lineData = prepareLineChartData();
    const pieData = preparePieChartData();

    const chartTypes = [
        { id: 'bar', label: 'Bar Chart', icon: '📊' },
        { id: 'line', label: 'Line Chart', icon: '📈' },
        { id: 'pie', label: 'Pie Chart', icon: '🥧' }
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{payload[0].payload.name || payload[0].payload.hour}</p>
                    <p className="tooltip-value">
                        <strong>{payload[0].value} kWh</strong>
                    </p>
                    {payload[0].payload.abnormal && (
                        <p className="tooltip-warning">⚠️ Abnormal usage</p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-container section" id="charts">
            <div className="container">
                <div className="chart-header">
                    <div>
                        <h2 className="section-title">Energy Analytics</h2>
                        <p className="text-muted">Visual representation of energy consumption patterns</p>
                    </div>
                    <div className="chart-toggles">
                        {chartTypes.map(chart => (
                            <button
                                key={chart.id}
                                className={`chart-toggle-btn ${activeChart === chart.id ? 'active' : ''}`}
                                onClick={() => setActiveChart(chart.id)}
                            >
                                <span className="chart-icon">{chart.icon}</span>
                                {chart.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="chart-wrapper card">
                    {activeChart === 'bar' && (
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                                <XAxis
                                    dataKey="name"
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                    style={{ fontSize: '0.875rem' }}
                                />
                                <YAxis
                                    label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft' }}
                                    style={{ fontSize: '0.875rem' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="energy" name="Total Energy" radius={[8, 8, 0, 0]}>
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}

                    {activeChart === 'line' && (
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                                <XAxis
                                    dataKey="hour"
                                    style={{ fontSize: '0.875rem' }}
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                />
                                <YAxis
                                    label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft' }}
                                    style={{ fontSize: '0.875rem' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="energy"
                                    name="Hourly Energy"
                                    stroke="#2196F3"
                                    strokeWidth={3}
                                    dot={(props) => {
                                        const { cx, cy, payload } = props;
                                        return (
                                            <circle
                                                cx={cx}
                                                cy={cy}
                                                r={payload.abnormal ? 6 : 4}
                                                fill={payload.abnormal ? '#F44336' : '#2196F3'}
                                                stroke="white"
                                                strokeWidth={2}
                                            />
                                        );
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}

                    {activeChart === 'pie' && (
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {activeChart === 'line' && (
                    <div className="chart-legend-info">
                        <div className="legend-item">
                            <span className="legend-dot" style={{ background: '#2196F3' }}></span>
                            <span>Normal Usage</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot abnormal" style={{ background: '#F44336' }}></span>
                            <span>Abnormal/Unexpected Usage</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChartContainer;
