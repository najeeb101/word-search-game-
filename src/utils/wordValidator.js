// Word validation utility
// Validates user selections and checks if they form valid words

/**
 * Check if two cells are adjacent in a straight line
 * @param {Object} cell1 - First cell {row, col}
 * @param {Object} cell2 - Second cell {row, col}
 * @returns {Object|null} Direction vector or null if not adjacent
 */
const getDirection = (cell1, cell2) => {
    const rowDiff = cell2.row - cell1.row;
    const colDiff = cell2.col - cell1.col;

    // Normalize to -1, 0, or 1
    const rowDir = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
    const colDir = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

    // Check if it's a valid direction (not just same cell)
    if (rowDir === 0 && colDir === 0) {
        return null;
    }

    return { row: rowDir, col: colDir };
};

/**
 * Check if cells form a straight line
 * @param {Array} cells - Array of cell objects {row, col}
 * @returns {boolean} True if cells form a straight line
 */
const isValidLine = (cells) => {
    if (cells.length < 2) return true;

    const direction = getDirection(cells[0], cells[1]);
    if (!direction) return false;

    // Check all subsequent cells follow the same direction
    for (let i = 1; i < cells.length - 1; i++) {
        const nextDir = getDirection(cells[i], cells[i + 1]);
        if (!nextDir || nextDir.row !== direction.row || nextDir.col !== direction.col) {
            return false;
        }

        // Check distance is exactly 1 cell
        const rowDist = Math.abs(cells[i + 1].row - cells[i].row);
        const colDist = Math.abs(cells[i + 1].col - cells[i].col);
        const maxDist = Math.max(rowDist, colDist);
        if (maxDist !== 1) {
            return false;
        }
    }

    return true;
};

/**
 * Extract word from selected cells
 * @param {Array} grid - 2D grid array
 * @param {Array} cells - Array of selected cells {row, col}
 * @returns {string} Extracted word
 */
const extractWord = (grid, cells) => {
    return cells.map(cell => grid[cell.row][cell.col]).join('');
};

/**
 * Validate user selection against word list
 * @param {Array} grid - 2D grid array
 * @param {Array} selectedCells - Array of selected cells {row, col}
 * @param {Array} wordList - Array of words to find
 * @returns {Object|null} Found word info or null
 */
export const validateSelection = (grid, selectedCells, wordList) => {
    if (selectedCells.length < 2) {
        return null;
    }

    // Check if selection forms a valid line
    if (!isValidLine(selectedCells)) {
        return null;
    }

    // Extract word from selection
    const selectedWord = extractWord(grid, selectedCells);

    // Strip spaces from config words before comparing against grid letters.
    // The grid never contains spaces, but the config words may (e.g. "PATERNAL LEAVE").
    // We keep the original config word to return as the match so the UI can
    // display it with correct spacing and casing.
    const gridWordList = wordList.map(w => w.replace(/\s+/g, '').toUpperCase());
    const reversedWord = selectedWord.split('').reverse().join('');

    const forwardIndex = gridWordList.indexOf(selectedWord);
    if (forwardIndex !== -1) {
        return {
            word: wordList[forwardIndex], // original config word (may have spaces)
            cells: selectedCells,
            reversed: false,
        };
    }

    const reversedIndex = gridWordList.indexOf(reversedWord);
    if (reversedIndex !== -1) {
        return {
            word: wordList[reversedIndex], // original config word (may have spaces)
            cells: selectedCells,
            reversed: true,
        };
    }

    return null;
};

/**
 * Check if a cell is part of a found word
 * @param {Object} cell - Cell to check {row, col}
 * @param {Array} foundWords - Array of found word objects
 * @returns {boolean} True if cell is in a found word
 */
export const isCellInFoundWord = (cell, foundWords) => {
    return foundWords.some(wordInfo =>
        wordInfo.cells.some(c => c.row === cell.row && c.col === cell.col)
    );
};
