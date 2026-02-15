// Custom hook for managing game progress in Firestore
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { LEVELS } from '../config/levels';

export const useGameProgress = (userId) => {
    const [progress, setProgress] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        loadProgress();
    }, [userId]);

    /**
     * Load user progress from Firestore
     */
    const loadProgress = async () => {
        try {
            setLoading(true);
            setError(null);

            // Load progress only for levels that exist in config
            const progressData = {};
            const levelIds = LEVELS.map((l) => l.id);

            for (const levelId of levelIds) {
                const progressRef = doc(db, 'users', userId, 'progress', levelId.toString());
                const progressSnap = await getDoc(progressRef);

                if (progressSnap.exists()) {
                    progressData[levelId] = progressSnap.data();
                } else {
                    progressData[levelId] = {
                        levelId,
                        completed: false,
                        bestTime: null,
                        attempts: 0,
                    };
                }
            }

            setProgress(progressData);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            console.error('Error loading progress:', err);
            setLoading(false);
        }
    };

    /**
     * Save level completion
     */
    const saveCompletion = async (levelId, timeTaken) => {
        if (!userId) return;

        try {
            const progressRef = doc(db, 'users', userId, 'progress', levelId.toString());
            const currentProgress = progress[levelId] || {};

            const updateData = {
                levelId,
                completed: true,
                completedAt: serverTimestamp(),
                attempts: (currentProgress.attempts || 0) + 1,
            };

            // Update best time if this is faster or first completion
            if (!currentProgress.bestTime || timeTaken < currentProgress.bestTime) {
                updateData.bestTime = timeTaken;
            }

            await setDoc(progressRef, updateData, { merge: true });

            // Update local state
            setProgress(prev => ({
                ...prev,
                [levelId]: {
                    ...prev[levelId],
                    ...updateData,
                },
            }));

            // Update user document
            const userRef = doc(db, 'users', userId);
            await setDoc(userRef, {
                lastPlayed: serverTimestamp(),
                currentLevel: Math.max(levelId + 1, currentProgress.currentLevel || 1),
            }, { merge: true });

            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error saving completion:', err);
            return false;
        }
    };

    /**
     * Increment attempt counter
     */
    const incrementAttempts = async (levelId) => {
        if (!userId) return;

        try {
            const progressRef = doc(db, 'users', userId, 'progress', levelId.toString());
            const currentProgress = progress[levelId] || {};

            await setDoc(progressRef, {
                levelId,
                attempts: (currentProgress.attempts || 0) + 1,
            }, { merge: true });

            setProgress(prev => ({
                ...prev,
                [levelId]: {
                    ...prev[levelId],
                    attempts: (currentProgress.attempts || 0) + 1,
                },
            }));
        } catch (err) {
            console.error('Error incrementing attempts:', err);
        }
    };

    return {
        progress,
        loading,
        error,
        saveCompletion,
        incrementAttempts,
        reloadProgress: loadProgress,
    };
};
