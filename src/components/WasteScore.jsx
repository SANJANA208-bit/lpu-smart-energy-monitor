import React, { useState } from 'react';
import { calculateWasteScore } from '../utils/wasteCalculator';
import './WasteScore.css';

const WasteScore = ({ buildingData, category, buildingName }) => {
    const [showCalculation, setShowCalculation] = useState(false);
    const wasteScore = calculateWasteScore(buildingData, category);

    const getSeverityClass = (score) => {
        if (score === 'High') return 'waste-high';
        if (score === 'Medium') return 'waste-medium';
        return 'waste-low';
    };

    const getSeverityIcon = (score) => {
        if (score === 'High') return '🚨';
        if (score === 'Medium') return '⚠️';
        return '✅';
    };

    return (
        <div className="waste-score-section section">
            <div className="container">
                <h2 className="section-title">Energy Waste Analysis</h2>
                <p className="text-muted">Rule-based waste detection for {buildingName || 'selected buildings'}</p>

                <div className="waste-score-card card">
                    <div className="waste-score-display">
                        <div className={`waste-meter ${getSeverityClass(wasteScore.score)}`}>
                            <div className="meter-icon">{getSeverityIcon(wasteScore.score)}</div>
                            <div className="meter-value">{wasteScore.score}</div>
                            <div className="meter-label">{wasteScore.label}</div>
                            <div className="meter-percentage">{wasteScore.percentage}%</div>
                        </div>

                        <div className="waste-details">
                            <div className="waste-detail-item">
                                <div className="detail-label">Total Energy Consumed</div>
                                <div className="detail-value">{wasteScore.totalEnergy.toLocaleString()} kWh</div>
                            </div>
                            <div className="waste-detail-item">
                                <div className="detail-label">Energy Outside Expected Hours</div>
                                <div className="detail-value waste-highlight">{wasteScore.wastedEnergy.toLocaleString()} kWh</div>
                            </div>
                            <div className="waste-detail-item">
                                <div className="detail-label">Waste Percentage</div>
                                <div className="detail-value">{wasteScore.percentage}%</div>
                            </div>
                        </div>
                    </div>

                    <div className="waste-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowCalculation(!showCalculation)}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                <path d="M12 17h.01" />
                            </svg>
                            {showCalculation ? 'Hide Calculation' : 'View Waste Calculation'}
                        </button>
                        <button className="btn btn-outline">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4M12 8h.01" />
                            </svg>
                            Why This Score?
                        </button>
                    </div>

                    {showCalculation && (
                        <div className="calculation-details fade-in">
                            <h4>Calculation Methodology</h4>
                            <div className="calculation-formula">
                                <div className="formula-line">
                                    <strong>Waste Percentage</strong> = (Energy Outside Expected Hours / Total Energy) × 100
                                </div>
                                <div className="formula-line">
                                    = ({wasteScore.wastedEnergy} kWh / {wasteScore.totalEnergy} kWh) × 100
                                </div>
                                <div className="formula-line">
                                    = <strong>{wasteScore.percentage}%</strong>
                                </div>
                            </div>

                            <div className="threshold-table">
                                <h5>Waste Score Thresholds</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Score</th>
                                            <th>Waste Range</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className={wasteScore.score === 'Low' ? 'active' : ''}>
                                            <td><span className="badge badge-success">Low</span></td>
                                            <td>&lt; 15%</td>
                                            <td>Efficient Operation</td>
                                        </tr>
                                        <tr className={wasteScore.score === 'Medium' ? 'active' : ''}>
                                            <td><span className="badge badge-warning">Medium</span></td>
                                            <td>15% - 35%</td>
                                            <td>Needs Attention</td>
                                        </tr>
                                        <tr className={wasteScore.score === 'High' ? 'active' : ''}>
                                            <td><span className="badge badge-danger">High</span></td>
                                            <td>&gt; 35%</td>
                                            <td>Critical Waste</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WasteScore;
