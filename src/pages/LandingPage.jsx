// Landing Page - Entry point with logo and sign-in options
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../components/AuthContext';
import '../styles/LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuthContext();

    useEffect(() => {
        // If already signed in, go to level selection
        if (user && !loading) {
            navigate('/levels');
        }
    }, [user, loading, navigate]);

    const handleStart = () => {
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="landing-page">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="landing-page">
            <div className="bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="landing-content">
                <img src="/logo.png" alt="Silatha Word Search" className="landing-logo" />
                <h1 className="landing-title">Word Search</h1>
                <p className="landing-subtitle">Empower your knowledge. Discover terms that matter. Sign in to track your journey.</p>

                <div className="landing-actions">
                    <button className="play-button" onClick={handleStart}>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
