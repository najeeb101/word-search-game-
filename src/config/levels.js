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
        words: ['PINK TAX', 'MOM GUILT', 'DOUBLE BIND', 'GLASS CLIFF'],
        timeLimit: null, // Count up timer
        hints: 2,
        description: '',
    },
    {
        id: 4,
        name: 'Hard',
        gridSize: 14,
        words: ['SPONSORSHIP', 'MISCARRIAGE', 'OSTEOPOROSIS', 'PATERNAL LEAVE'],
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
        words: ['FERTILITY JOURNEY', 'POSTNATAL ANXIETY', 'IMPOSTOR SYNDROME', 'INTERSECTIONALITY', 'MEDICAL GASLIGHTING', 'EMPOWERMENT'],
        timeLimit: null, // Count up timer
        hints: 1,
        description: '',
    },
];

/** Maximum level ID (derived from LEVELS so UI and progress stay in sync) */
export const MAX_LEVEL_ID = LEVELS.length > 0 ? Math.max(...LEVELS.map((l) => l.id)) : 0;

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

/**
 * Returns the word as it should appear in the grid: uppercase, no spaces.
 * Use this wherever the word is placed or matched against grid letters.
 * @param {string} word - Word from level config (may contain spaces)
 * @returns {string} Uppercase word with spaces removed
 */
export const getGridWord = (word) => word.replace(/\s+/g, '').toUpperCase();

/**
 * Returns the word formatted for human-readable display (Title Case).
 * Use this in WordList, victory modals, or any UI that shows the word to the player.
 * @param {string} word - Word from level config (may contain spaces)
 * @returns {string} Title-cased word (e.g. "PATERNAL LEAVE" → "Paternal Leave")
 */
export const getDisplayWord = (word) =>
    word
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
