import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ onReset }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header className="header">
            <div className="header-container container">
                <div className="header-left">
                    <div className="logo-section">
                        <div className="logo-icon">
                            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Building shapes */}
                                <rect x="4" y="18" width="8" height="18" fill="#2D7A3E" />
                                <rect x="14" y="12" width="12" height="24" fill="#1976D2" />
                                <rect x="28" y="20" width="8" height="16" fill="#4CAF50" />
                                {/* Windows */}
                                <rect x="6" y="22" width="2" height="2" fill="white" opacity="0.8" />
                                <rect x="9" y="22" width="2" height="2" fill="white" opacity="0.8" />
                                <rect x="6" y="26" width="2" height="2" fill="white" opacity="0.8" />
                                <rect x="9" y="26" width="2" height="2" fill="white" opacity="0.8" />
                                <rect x="17" y="16" width="2" height="2" fill="white" opacity="0.8" />
                                <rect x="21" y="16" width="2" height="2" fill="white" opacity="0.8" />
                                <rect x="17" y="20" width="2" height="2" fill="white" opacity="0.8" />
                                <rect x="21" y="20" width="2" height="2" fill="white" opacity="0.8" />
                                <rect x="17" y="24" width="2" height="2" fill="white" opacity="0.8" />
                                <rect x="21" y="24" width="2" height="2" fill="white" opacity="0.8" />
                                <rect x="30" y="24" width="2" height="2" fill="white" opacity="0.8" />
                                <rect x="30" y="28" width="2" height="2" fill="white" opacity="0.8" />
                                {/* Energy pulse wave */}
                                <path d="M2 10 L8 10 L12 2 L18 18 L24 6 L30 14 L38 14"
                                    stroke="#FF9800"
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                                {/* Sun */}
                                <circle cx="34" cy="6" r="3" fill="#FFC107" />
                                <circle cx="34" cy="6" r="1.5" fill="#FF9800" />
                            </svg>
                        </div>
                        <div className="logo-text">
                            <h1 className="logo-title">LPU <span className="gradient-text">Smart Energy Pulse</span></h1>
                            <p className="logo-tagline">Right Energy, Right Place, Right Time</p>
                        </div>
                    </div>
                </div>

                <div className="header-center">
                    <div className="time-display">
                        <div className="time">{formatTime(currentTime)}</div>
                        <div className="date">{formatDate(currentTime)}</div>
                    </div>
                </div>

                <div className="header-right">
                    <nav className="header-nav">
                        <button className="nav-btn" onClick={() => scrollToSection('dashboard')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            </svg>
                            Home
                        </button>
                        <button className="nav-btn" onClick={() => scrollToSection('about')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4M12 8h.01" />
                            </svg>
                            About
                        </button>
                        <button className="nav-btn btn-reset" onClick={onReset}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                                <path d="M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                                <path d="M3 21v-5h5" />
                            </svg>
                            Reset Filters
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
