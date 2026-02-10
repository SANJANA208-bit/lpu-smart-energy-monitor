import React, { useState } from 'react';
import './InsightsPanel.css';

const InsightsPanel = ({ insights, onMarkReviewed }) => {
    const [expandedInsights, setExpandedInsights] = useState(new Set());

    const toggleExpand = (insightId) => {
        const newExpanded = new Set(expandedInsights);
        if (newExpanded.has(insightId)) {
            newExpanded.delete(insightId);
        } else {
            newExpanded.add(insightId);
        }
        setExpandedInsights(newExpanded);
    };

    const getSeverityIcon = (severity) => {
        if (severity === 'high') return '🚨';
        if (severity === 'medium') return '⚠️';
        return 'ℹ️';
    };

    const getSeverityColor = (severity) => {
        if (severity === 'high') return '#F44336';
        if (severity === 'medium') return '#FF9800';
        return '#2196F3';
    };

    const getSeverityLabel = (severity) => {
        if (severity === 'high') return 'Critical Alert';
        if (severity === 'medium') return 'Warning';
        return 'Notice';
    };

    if (insights.length === 0) {
        return (
            <div className="insights-panel section" id="insights">
                <div className="container">
                    <h2 className="section-title">Energy Insights & Alerts</h2>
                    <div className="no-insights">
                        <div className="no-insights-icon">✅</div>
                        <h3>All Clear!</h3>
                        <p>No significant energy waste patterns detected. All buildings are operating within expected parameters.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="insights-panel section" id="insights">
            <div className="container">
                <div className="insights-header">
                    <div>
                        <h2 className="section-title">Energy Insights & Alerts</h2>
                        <p className="text-muted">AI-generated recommendations based on usage patterns</p>
                    </div>
                    <div className="insights-stats">
                        <div className="stat-badge badge-danger">
                            <span className="stat-number">{insights.filter(i => i.severity === 'high').length}</span>
                            <span className="stat-label">Critical</span>
                        </div>
                        <div className="stat-badge badge-warning">
                            <span className="stat-number">{insights.filter(i => i.severity === 'medium').length}</span>
                            <span className="stat-label">Warnings</span>
                        </div>
                        <div className="stat-badge badge-success">
                            <span className="stat-number">{insights.filter(i => i.reviewed).length}</span>
                            <span className="stat-label">Reviewed</span>
                        </div>
                    </div>
                </div>

                <div className="insights-grid">
                    {insights.map(insight => (
                        <div
                            key={insight.id}
                            className={`insight-card ${insight.reviewed ? 'reviewed' : ''}`}
                            style={{ '--severity-color': getSeverityColor(insight.severity) }}
                        >
                            <div className="insight-header-row">
                                <div className="insight-severity">
                                    <span className="severity-icon">{getSeverityIcon(insight.severity)}</span>
                                    <span className="severity-label">{getSeverityLabel(insight.severity)}</span>
                                </div>
                                {insight.reviewed && (
                                    <span className="reviewed-badge">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <path d="M22 4L12 14.01l-3-3" />
                                        </svg>
                                        Reviewed
                                    </span>
                                )}
                            </div>

                            <div className="insight-building">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                                    <path d="M9 22v-4h6v4" />
                                </svg>
                                <strong>{insight.building}</strong>
                                <span className="category-badge badge" style={{
                                    background: `${getSeverityColor(insight.severity)}15`,
                                    color: getSeverityColor(insight.severity)
                                }}>
                                    {insight.category}
                                </span>
                            </div>

                            <div className="insight-time">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                                <span><strong>Time Range:</strong> {insight.timeRange}</span>
                            </div>

                            <div className="insight-expected">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                                <span><strong>Expected Hours:</strong> {insight.expectedHours}</span>
                            </div>

                            <div className="insight-issue">
                                <div className="issue-label">Issue Detected:</div>
                                <div className="issue-text">{insight.issue}</div>
                            </div>

                            <div className="insight-suggestion">
                                <div className="suggestion-label">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                    Suggested Action:
                                </div>
                                <div className="suggestion-text">{insight.suggestion}</div>
                            </div>

                            <div className="insight-actions">
                                {!insight.reviewed && (
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => onMarkReviewed(insight.id)}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <path d="M22 4L12 14.01l-3-3" />
                                        </svg>
                                        Mark as Reviewed
                                    </button>
                                )}
                                <button className="btn btn-outline btn-sm">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                    Export Report
                                </button>
                            </div>

                            <div className="insight-percentage">
                                {insight.abnormalPercentage}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InsightsPanel;
