// Grid generation utility
// Creates complete word search grids with words and random filler letters

import { getAllowedDirections, tryPlaceWord } from './wordPlacement';

/**
 * Generate a random letter (A-Z)
 * @returns {string} Random uppercase letter
 */
const getRandomLetter = () => {
    // Weighted letter distribution for more balanced, readable grids
    // Includes more vowels and common consonants
    const letters = 'AAAAAEEEEEEIIIIIOOOOUUUUBCDDFGGHHJKLMNNNPQRRSSSTTTTVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
};

/**
 * Create an empty grid
 * @param {number} size - Grid size (size x size)
 * @returns {Array} 2D array filled with null
 */
const createEmptyGrid = (size) => {
    return Array(size).fill(null).map(() => Array(size).fill(null));
};

/**
 * Fill empty cells with random letters
 * @param {Array} grid - 2D array representing the grid
 */
const fillEmptyCells = (grid) => {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === null) {
                grid[row][col] = getRandomLetter();
            }
        }
    }
};

/**
 * Generate a complete word search grid
 * @param {Array} words - Array of words to place
 * @param {number} size - Grid size
 * @param {number} level - Current level (determines allowed directions)
 * @returns {Object} Grid data with grid array and word placements
 */
export const generateGrid = (words, size, level) => {
    const grid = createEmptyGrid(size);
    const allowedDirections = getAllowedDirections(level);
    const placements = [];

    // Sort words by length (longest first) for better placement success
    const sortedWords = [...words].sort((a, b) => b.length - a.length);

    // Try to place each word
    for (const word of sortedWords) {
        const upperWord = word.toUpperCase();
        const placement = tryPlaceWord(grid, upperWord, allowedDirections);

        if (placement) {
            placements.push(placement);
        } else {
            console.warn(`Failed to place word: ${word}`);
        }
    }

    // Fill remaining cells with random letters
    fillEmptyCells(grid);

    return {
        grid,
        placements,
        size,
        level,
    };
};

/**
 * Get cell value from grid
 * @param {Array} grid - 2D grid array
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @returns {string|null} Cell value or null
 */
export const getCellValue = (grid, row, col) => {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return null;
    }
    return grid[row][col];
};
