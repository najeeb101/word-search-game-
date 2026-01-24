// LevelSelector component - Level selection grid
import React from 'react';
import { isLevelUnlocked } from '../config/levels';
import '../styles/LevelSelector.css';

const LevelSelector = ({ levels, userProgress, onSelectLevel }) => {
    const formatTime = (seconds) => {
        if (!seconds) return '--:--';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="level-selector">
            {levels.map((level) => {
                const unlocked = isLevelUnlocked(level.id, userProgress);
                const progress = userProgress[level.id] || {};
                const completed = progress.completed || false;

                return (
                    <div
                        key={level.id}
                        className={`level-card ${unlocked ? 'unlocked' : 'locked'} ${completed ? 'completed' : ''}`}
                        onClick={() => unlocked && onSelectLevel(level.id)}
                    >
                        <div className="level-number">Level {level.id}</div>
                        <div className="level-name">{level.name}</div>
                        <div className="level-description">{level.description}</div>

                        {unlocked ? (
                            <div className="level-stats">
                                <div className="level-stat">
                                    <span className="stat-label">Grid:</span>
                                    <span className="stat-value">{level.gridSize}×{level.gridSize}</span>
                                </div>
                                <div className="level-stat">
                                    <span className="stat-label">Words:</span>
                                    <span className="stat-value">{level.words.length}</span>
                                </div>
                                {completed && progress.bestTime && (
                                    <div className="level-stat best-time">
                                        <span className="stat-label">Best:</span>
                                        <span className="stat-value">{formatTime(progress.bestTime)}</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="locked-overlay">
                                <div className="lock-icon">🔒</div>
                                <div className="lock-text">Complete previous level</div>
                            </div>
                        )}

                        {completed && <div className="completed-badge">✓</div>}
                    </div>
                );
            })}
        </div>
    );
};

export default LevelSelector;
