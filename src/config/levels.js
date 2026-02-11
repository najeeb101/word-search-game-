// Level configurations
// Defines difficulty progression and game parameters for each level

export const LEVELS = [
    {
        id: 1,
        name: 'Beginner',
        gridSize: 10,
        words: ['PMDD', 'EQUITY', 'AGENCY'],
        timeLimit: null, // No time limit
        hints: 3,
        description: '',
    },
    {
        id: 2,
        name: 'Easy',
        gridSize: 10,
        words: ['ALLYSHIP', 'TOKENISM', 'ADVOCACY', 'EQUALITY'],
        timeLimit: null,
        hints: 3,
        description: '',
    },
    {
        id: 3,
        name: 'Medium',
        gridSize: 12,
        words: ['PINKTAX', 'MOMGUILT', 'DOUBLEBIND', 'GLASSCLIFF'],
        timeLimit: null, // Count up timer
        hints: 2,
        description: '',
    },
    {
        id: 4,
        name: 'Hard',
        gridSize: 14,
        words: ['SPONSORSHIP', 'MISCARRIAGE', 'OSTEOPOROSIS', 'PATERNALLEAVE'],
        timeLimit: null, // Count up timer
        hints: 2,
        description: '',
    },
    {
        id: 5,
        name: 'Expert',
        gridSize: 16,
        words: ['ENDOMETRIOSIS', 'MANTERRUPTION', 'MICROAGGRESSION', 'HYPERANDROGENISM'],
        timeLimit: null, // Count up timer
        hints: 1,
        description: '',
    },
    {
        id: 6,
        name: 'Legend',
        gridSize: 18,
        words: ['FERTILITYJOURNEY', 'POSTNATALANXIETY', 'IMPOSTORSYNDROME', 'INTERSECTIONALITY', 'MEDICALGASLIGHTING', 'EMPOWERMENT'],
        timeLimit: null, // Count up timer
        hints: 1,
        description: '',
    },
];

/**
 * Get level by ID
 * @param {number} levelId - Level ID
 * @returns {Object|null} Level object or null
 */
export const getLevelById = (levelId) => {
    return LEVELS.find(level => level.id === levelId) || null;
};

/**
 * Get next level
 * @param {number} currentLevelId - Current level ID
 * @returns {Object|null} Next level or null if at max
 */
export const getNextLevel = (currentLevelId) => {
    const nextId = currentLevelId + 1;
    return getLevelById(nextId);
};

/**
 * Check if level is unlocked based on user progress
 * @param {number} levelId - Level to check
 * @param {Object} userProgress - User progress object
 * @returns {boolean} True if unlocked
 */
export const isLevelUnlocked = (levelId, userProgress) => {
    if (levelId === 1) return true; // First level always unlocked

    // Check if previous level is completed
    const prevLevelId = levelId - 1;
    const prevProgress = userProgress[prevLevelId];

    return prevProgress && prevProgress.completed;
};
