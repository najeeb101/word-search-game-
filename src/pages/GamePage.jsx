// Game Page - Main gameplay interface
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGameProgress } from '../hooks/useGameProgress';
import { useWordSelection } from '../hooks/useWordSelection';
import { generateGrid } from '../utils/gridGenerator';
import { getLevelById, MAX_LEVEL_ID } from '../config/levels';
import Header from '../components/Header';
import Grid from '../components/Grid';
import WordList from '../components/WordList';
import Timer from '../components/Timer';
import '../styles/GamePage.css';

const GamePage = () => {
    const { levelId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { saveCompletion, incrementAttempts } = useGameProgress(user?.uid);

    const [level, setLevel] = useState(null);
    const [foundWords, setFoundWords] = useState([]);
    const [isGameActive, setIsGameActive] = useState(false);
    const [showVictory, setShowVictory] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    const [hintsRemaining, setHintsRemaining] = useState(0);
    const [hintedCells, setHintedCells] = useState([]);

    // Initialize level ONLY when levelId changes
    useEffect(() => {
        const currentLevel = getLevelById(parseInt(levelId));
        if (!currentLevel) {
            navigate('/levels');
            return;
        }

        setLevel(currentLevel);
        setFoundWords([]);
        setIsGameActive(true);
        setShowVictory(false);
        setHintsRemaining(currentLevel.hints);
        setHintedCells([]);
        setGameTime(0);
    }, [levelId, navigate]);

    // Increment attempts only once when user becomes available
    useEffect(() => {
        if (user && level) {
            incrementAttempts(level.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [level?.id]); // Only when level.id changes, not on every user update

    // Generate grid ONLY when level changes - memoized to prevent regeneration
    const gridData = useMemo(() => {
        if (!level) return null;
        console.log('Generating grid for level', level.id);
        return generateGrid(level.words, level.gridSize, level.id);
    }, [level]);

    // Stable callback for word found
    const handleWordFound = useCallback((wordInfo) => {
        setFoundWords(prev => {
            const alreadyFound = prev.some(w => w.word === wordInfo.word);
            if (alreadyFound) return prev;
            return [...prev, wordInfo];
        });
    }, []);

    const {
        selectedCells,
        isSelecting,
        startSelection,
        addToSelection,
        endSelection,
    } = useWordSelection(gridData?.grid, level?.words || [], handleWordFound);

    const handleTimeUp = useCallback(() => {
        setIsGameActive(false);
        alert('Time\'s up! Try again.');
        navigate('/levels');
    }, [navigate]);

    const handleNextLevel = useCallback(() => {
        const nextLevelId = level.id + 1;
        if (nextLevelId <= MAX_LEVEL_ID) {
            navigate(`/game/${nextLevelId}`);
        } else {
            navigate('/levels');
        }
    }, [level, navigate]);

    // Check for victory
    useEffect(() => {
        if (!level || !isGameActive) return;

        if (foundWords.length === level.words.length) {
            setIsGameActive(false);
            setShowVictory(true);

            // Save completion
            if (user) {
                saveCompletion(level.id, gameTime);
            }
        }
    }, [foundWords.length, level, isGameActive, user, saveCompletion, gameTime]);

    // Track game time - resets for each level
    useEffect(() => {
        if (!isGameActive) return;

        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            setGameTime(elapsed);

            // Check if time limit reached
            if (level?.timeLimit && elapsed >= level.timeLimit) {
                clearInterval(interval);
                handleTimeUp();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isGameActive, levelId, level?.timeLimit, handleTimeUp]);

    const handleHint = useCallback(() => {
        if (hintsRemaining <= 0 || !level || !gridData) return;

        // Get words that haven't been found yet
        const remainingWords = level.words.filter(
            word => !foundWords.some(found => found.word.toUpperCase() === word.toUpperCase())
        );

        if (remainingWords.length > 0) {
            // Find the first non-found word's placement
            const targetWord = remainingWords[0].toUpperCase();
            const placement = gridData.placements.find(p => p.word === targetWord);

            if (placement) {
                // Find which letters of this word are already hinted
                const wordPositions = placement.positions;
                const alreadyHintedInWord = wordPositions.filter(pos =>
                    hintedCells.some(hc => hc.row === pos.row && hc.col === pos.col)
                );

                if (alreadyHintedInWord.length < wordPositions.length) {
                    // Reveal the next letter
                    const nextLetterPos = wordPositions[alreadyHintedInWord.length];
                    setHintedCells(prev => [...prev, { row: nextLetterPos.row, col: nextLetterPos.col }]);
                    setHintsRemaining(prev => prev - 1);
                } else {
                    // If all letters are already hinted for the first word, try the next word
                    // This case is unlikely given normal hint counts but handles the edge case
                    const nextWordIndex = remainingWords.findIndex((_, idx) => idx > 0);
                    if (nextWordIndex !== -1) {
                        const nextTargetWord = remainingWords[nextWordIndex].toUpperCase();
                        const nextPlacement = gridData.placements.find(p => p.word === nextTargetWord);
                        if (nextPlacement) {
                            const firstLetterPos = nextPlacement.positions[0];
                            setHintedCells(prev => [...prev, { row: firstLetterPos.row, col: firstLetterPos.col }]);
                            setHintsRemaining(prev => prev - 1);
                        }
                    }
                }
            }
        }
    }, [hintsRemaining, level, foundWords, gridData, hintedCells]);



    const handleRetry = useCallback(() => {
        window.location.reload();
    }, []);

    if (!level || !gridData) {
        return (
            <div className="game-page">
                <div className="loading">Loading game...</div>
            </div>
        );
    }

    return (
        <div className="game-page">
            <Header user={user} showBackButton />

            <div className="game-container">
                <div className="game-header">
                    <div className="level-info">
                        <h2>Level {level.id}: {level.name}</h2>
                        <p>{level.description}</p>
                    </div>
                    <div className="game-controls">
                        <Timer
                            time={gameTime}
                            timeLimit={level.timeLimit}
                        />
                        {hintsRemaining > 0 && (
                            <button className="hint-button" onClick={handleHint}>
                                💡 Hint ({hintsRemaining})
                            </button>
                        )}
                    </div>
                </div>

                <div className="game-content">
                    <Grid
                        gridData={gridData}
                        foundWords={foundWords}
                        selectedCells={selectedCells}
                        hintedCells={hintedCells}
                        onStartSelection={startSelection}
                        onContinueSelection={addToSelection}
                        onEndSelection={endSelection}
                    />
                    <WordList words={level.words} foundWords={foundWords} />
                </div>
            </div>

            {showVictory && (
                <div className="victory-modal">
                    <div className="victory-content">
                        <h2>🎉 Level Complete!</h2>
                        <p>You found all {level.words.length} words!</p>
                        <div className="victory-time">
                            Time: {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}
                        </div>
                        <div className="victory-buttons">
                            <button className="retry-button" onClick={handleRetry}>
                                Retry Level
                            </button>
                            {level.id < MAX_LEVEL_ID ? (
                                <button className="next-button" onClick={handleNextLevel}>
                                    Next Level →
                                </button>
                            ) : (
                                <button className="next-button" onClick={() => navigate('/levels')}>
                                    All Levels
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GamePage;
