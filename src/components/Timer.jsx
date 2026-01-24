// Timer component - Displays and manages game timer
import React, { useState, useEffect } from 'react';
import '../styles/Timer.css';

const Timer = ({ time, timeLimit }) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimeRemaining = () => {
        if (!timeLimit) return null;
        return Math.max(0, timeLimit - time);
    };

    const timeToDisplay = timeLimit ? getTimeRemaining() : time;
    const isWarning = timeLimit && getTimeRemaining() <= 30;
    const isDanger = timeLimit && getTimeRemaining() <= 10;

    return (
        <div className={`timer ${isWarning ? 'warning' : ''} ${isDanger ? 'danger' : ''}`}>
            <div className="timer-icon">⏱️</div>
            <div className="timer-value">{formatTime(timeToDisplay)}</div>
            <div className="timer-label">{timeLimit ? 'remaining' : 'elapsed'}</div>
        </div>
    );
};

export default Timer;
