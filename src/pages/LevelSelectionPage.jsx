// Level Selection Page - Browse and select levels
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGameProgress } from '../hooks/useGameProgress';
import Header from '../components/Header';
import LevelSelector from '../components/LevelSelector';
import { LEVELS } from '../config/levels';
import '../styles/LevelSelectionPage.css';

const LevelSelectionPage = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading, signOut } = useAuth();
    const { progress, loading: progressLoading } = useGameProgress(user?.uid);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/');
        }
    }, [user, authLoading, navigate]);

    const handleSelectLevel = (levelId) => {
        navigate(`/game/${levelId}`);
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    if (authLoading || progressLoading) {
        return (
            <div className="level-selection-page">
                <div className="loading">Loading levels...</div>
            </div>
        );
    }

    return (
        <div className="level-selection-page">
            <Header user={user} onSignOut={handleSignOut} />
            <div className="level-selection-content">
                <h1 className="page-title">Select a Level</h1>
                <p className="page-subtitle">Complete levels to unlock new challenges</p>
                <LevelSelector
                    levels={LEVELS}
                    userProgress={progress}
                    onSelectLevel={handleSelectLevel}
                />
            </div>
        </div>
    );
};

export default LevelSelectionPage;
