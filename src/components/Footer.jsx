import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="about">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <div className="logo-icon-small">
                                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="4" y="18" width="8" height="18" fill="#2D7A3E" />
                                    <rect x="14" y="12" width="12" height="24" fill="#1976D2" />
                                    <rect x="28" y="20" width="8" height="16" fill="#4CAF50" />
                                    <path d="M2 10 L8 10 L12 2 L18 18 L24 6 L30 14 L38 14"
                                        stroke="#FF9800"
                                        strokeWidth="2.5"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round" />
                                    <circle cx="34" cy="6" r="3" fill="#FFC107" />
                                </svg>
                            </div>
                            <div>
                                <h3>LPU Smart Energy Pulse</h3>
                                <p className="tagline">Right Energy, Right Place, Right Time</p>
                            </div>
                        </div>
                        <p className="footer-description">
                            A time-aware campus energy monitoring system designed to detect abnormal energy usage patterns
                            and provide actionable insights for sustainable energy management at Lovely Professional University.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>About The Project</h4>
                        <p>
                            This system employs rule-based logic to compare expected vs actual energy consumption across
                            different building types (Academic, Hostel, Mess, Library) and time windows.
                        </p>
                        <div className="tech-stack">
                            <span className="tech-badge">React</span>
                            <span className="tech-badge">Recharts</span>
                            <span className="tech-badge">Vite</span>
                            <span className="tech-badge">Vanilla CSS</span>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Sustainability Goal</h4>
                        <div className="sdg-badge">
                            <div className="sdg-number">7</div>
                            <div className="sdg-text">
                                <strong>Affordable & Clean Energy</strong>
                                <p>Ensuring access to affordable, reliable, sustainable and modern energy</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-links">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                        <a href="#dashboard" className="footer-link">Documentation</a>
                        <a href="#insights" className="footer-link">Insights</a>
                    </div>
                    <div className="footer-credits">
                        <p>Developed by <strong>SANJANA.S</strong> for <strong>my college</strong></p>
                        <p className="copyright">© 2026 LPU Smart Energy Pulse. Built with sustainability in mind.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
