// Level configurations
// Defines difficulty progression and game parameters for each level

export const LEVELS = [
    {
        id: 1,
        name: 'Beginner',
        gridSize: 8,
        words: ['CAT', 'DOG', 'BIRD', 'FISH', 'FROG'],
        timeLimit: null, // No time limit
        hints: 3,
        description: 'Find 5 simple words - horizontal and vertical only',
    },
    {
        id: 2,
        name: 'Easy',
        gridSize: 10,
        words: ['APPLE', 'ORANGE', 'BANANA', 'GRAPE', 'LEMON', 'PEACH', 'MANGO'],
        timeLimit: null,
        hints: 3,
        description: 'Find 7 fruit names - horizontal and vertical',
    },
    {
        id: 3,
        name: 'Medium',
        gridSize: 12,
        words: ['PYTHON', 'JAVASCRIPT', 'JAVA', 'RUBY', 'SWIFT', 'KOTLIN', 'RUST', 'GOLANG'],
        timeLimit: null, // Count up timer
        hints: 2,
        description: 'Find 8 programming languages - all directions',
    },
    {
        id: 4,
        name: 'Hard',
        gridSize: 14,
        words: ['MOUNTAIN', 'OCEAN', 'DESERT', 'FOREST', 'RIVER', 'VALLEY', 'CANYON', 'GLACIER', 'VOLCANO', 'ISLAND'],
        timeLimit: null, // Count up timer
        hints: 2,
        description: 'Find 10 geographical features - backwards words included',
    },
    {
        id: 5,
        name: 'Expert',
        gridSize: 15,
        words: ['TELESCOPE', 'MICROSCOPE', 'GALAXY', 'PLANET', 'ASTEROID', 'COMET', 'NEBULA', 'QUASAR', 'PULSAR', 'SUPERNOVA', 'BLACKHOLE'],
        timeLimit: null, // Count up timer
        hints: 1,
        description: 'Find 11 astronomy terms - limited hints!',
    },
    {
        id: 6,
        name: 'Master',
        gridSize: 16,
        words: ['ALGORITHM', 'DATABASE', 'ENCRYPTION', 'FRAMEWORK', 'INTERFACE', 'PROTOCOL', 'COMPILER', 'DEBUGGER', 'REPOSITORY', 'ARCHITECTURE', 'DEPLOYMENT', 'OPTIMIZATION'],
        timeLimit: null, // Count up timer
        hints: 1,
        description: 'Find 12 tech terms - master level challenge',
    },
    {
        id: 7,
        name: 'Legend',
        gridSize: 18,
        words: ['PHOTOSYNTHESIS', 'CHROMOSOME', 'MITOCHONDRIA', 'METABOLISM', 'ECOSYSTEM', 'EVOLUTION', 'GENETICS', 'ORGANISM', 'BIODIVERSITY', 'RESPIRATION', 'ADAPTATION', 'MUTATION', 'SYMBIOSIS'],
        timeLimit: null, // Count up timer
        hints: 1,
        description: 'Find 13 biology terms - legendary difficulty!',
    },
    {
        id: 8,
        name: 'Ultimate',
        gridSize: 20,
        words: ['QUANTUM', 'RELATIVITY', 'THERMODYNAMICS', 'ELECTROMAGNETISM', 'GRAVITY', 'MOMENTUM', 'ACCELERATION', 'VELOCITY', 'FREQUENCY', 'WAVELENGTH', 'AMPLITUDE', 'PARTICLE', 'ENERGY', 'ENTROPY'],
        timeLimit: null, // Count up timer
        hints: 0,
        description: 'Find 14 physics terms - ultimate challenge, no hints!',
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
