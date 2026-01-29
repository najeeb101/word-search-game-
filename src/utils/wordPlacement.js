// Word placement utility for word search grid
// Supports horizontal, vertical, diagonal, and backwards placement

const DIRECTIONS = {
  HORIZONTAL: { row: 0, col: 1, name: 'horizontal' },
  VERTICAL: { row: 1, col: 0, name: 'vertical' },
  DIAGONAL_DOWN_RIGHT: { row: 1, col: 1, name: 'diagonal' },
  DIAGONAL_DOWN_LEFT: { row: 1, col: -1, name: 'diagonal' },
  HORIZONTAL_BACK: { row: 0, col: -1, name: 'horizontal-back' },
  VERTICAL_BACK: { row: -1, col: 0, name: 'vertical-back' },
  DIAGONAL_UP_RIGHT: { row: -1, col: 1, name: 'diagonal-back' },
  DIAGONAL_UP_LEFT: { row: -1, col: -1, name: 'diagonal-back' },
};

/**
 * Get allowed directions based on level difficulty
 * @param {number} level - Current level number
 * @returns {Array} Array of direction objects
 */
export const getAllowedDirections = (level) => {
  // Return all directions including diagonals for all levels
  return [
    DIRECTIONS.HORIZONTAL,
    DIRECTIONS.VERTICAL,
    DIRECTIONS.HORIZONTAL_BACK,
    DIRECTIONS.VERTICAL_BACK,
    DIRECTIONS.DIAGONAL_DOWN_RIGHT,
    DIRECTIONS.DIAGONAL_DOWN_LEFT,
    DIRECTIONS.DIAGONAL_UP_RIGHT,
    DIRECTIONS.DIAGONAL_UP_LEFT,
  ];
};

/**
 * Check if a word can be placed at given position and direction
 * @param {Array} grid - 2D array representing the grid
 * @param {string} word - Word to place
 * @param {Object} direction - Direction object
 * @param {number} startRow - Starting row
 * @param {number} startCol - Starting column
 * @returns {boolean} True if word can be placed
 */
export const canPlaceWord = (grid, word, direction, startRow, startCol) => {
  const gridSize = grid.length;

  for (let i = 0; i < word.length; i++) {
    const row = startRow + i * direction.row;
    const col = startCol + i * direction.col;

    // Check bounds
    if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) {
      return false;
    }

    // Check if cell is empty or has the same letter
    if (grid[row][col] !== null && grid[row][col] !== word[i]) {
      return false;
    }
  }

  return true;
};

/**
 * Place a word on the grid
 * @param {Array} grid - 2D array representing the grid
 * @param {string} word - Word to place
 * @param {Object} direction - Direction object
 * @param {number} startRow - Starting row
 * @param {number} startCol - Starting column
 * @returns {Object} Placement info with positions
 */
export const placeWord = (grid, word, direction, startRow, startCol) => {
  const positions = [];

  for (let i = 0; i < word.length; i++) {
    const row = startRow + i * direction.row;
    const col = startCol + i * direction.col;
    grid[row][col] = word[i];
    positions.push({ row, col, letter: word[i] });
  }

  return {
    word,
    positions,
    direction: direction.name,
    start: { row: startRow, col: startCol },
  };
};

/**
 * Try to place a word randomly on the grid
 * @param {Array} grid - 2D array representing the grid
 * @param {string} word - Word to place
 * @param {Array} allowedDirections - Array of allowed direction objects
 * @param {number} maxAttempts - Maximum placement attempts
 * @returns {Object|null} Placement info or null if failed
 */
export const tryPlaceWord = (grid, word, allowedDirections, maxAttempts = 100) => {
  const gridSize = grid.length;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Random direction
    const direction = allowedDirections[Math.floor(Math.random() * allowedDirections.length)];

    // Random starting position
    const startRow = Math.floor(Math.random() * gridSize);
    const startCol = Math.floor(Math.random() * gridSize);

    if (canPlaceWord(grid, word, direction, startRow, startCol)) {
      return placeWord(grid, word, direction, startRow, startCol);
    }
  }

  return null;
};
