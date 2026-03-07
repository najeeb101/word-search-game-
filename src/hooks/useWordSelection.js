// Custom hook for word selection logic
import { useState, useCallback, useRef, useEffect } from 'react';
import { validateSelection } from '../utils/wordValidator';

/**
 * Snap a raw sequence of touched cells to a clean straight-line path.
 *
 * On mobile, finger drift causes the touch to land on adjacent cells while
 * dragging diagonally, producing a zigzag instead of a diagonal. This helper
 * reads only the first and last cell, infers the nearest of the 8 supported
 * directions, and rebuilds every cell along that straight line — discarding
 * the off-axis intermediate cells that were hit accidentally.
 *
 * @param {Array<{row: number, col: number}>} cells - Raw touched cells
 * @returns {Array<{row: number, col: number}>} Clean straight-line cell path
 */
const snapSelectionToLine = (cells) => {
    if (cells.length < 2) return cells;

    const start = cells[0];
    const end = cells[cells.length - 1];

    const rowDiff = end.row - start.row;
    const colDiff = end.col - start.col;
    const absRow = Math.abs(rowDiff);
    const absCol = Math.abs(colDiff);

    if (absRow === 0 && absCol === 0) return [start];

    let rowDir, colDir, steps;

    if (absRow === 0) {
        // Pure horizontal
        rowDir = 0;
        colDir = Math.sign(colDiff);
        steps = absCol;
    } else if (absCol === 0) {
        // Pure vertical
        rowDir = Math.sign(rowDiff);
        colDir = 0;
        steps = absRow;
    } else {
        // Diagonal or near-diagonal: snap both axes to ±1 and use the
        // longer axis as the step count so the path reaches past the
        // finger's actual endpoint without stopping short.
        rowDir = Math.sign(rowDiff);
        colDir = Math.sign(colDiff);
        steps = Math.max(absRow, absCol);
    }

    const snapped = [];
    for (let i = 0; i <= steps; i++) {
        snapped.push({ row: start.row + i * rowDir, col: start.col + i * colDir });
    }
    return snapped;
};

export const useWordSelection = (grid, wordList, onWordFound) => {
    const [selectedCells, setSelectedCells] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const selectionStartRef = useRef(null);
    const selectedCellsRef = useRef([]);
    // rawCellsRef: every cell the finger actually touched (before snapping)
    const rawCellsRef = useRef([]);

    // Keep ref in sync so endSelection (called on mouseup) always sees current selection
    useEffect(() => {
        selectedCellsRef.current = selectedCells;
    }, [selectedCells]);

    /**
     * Start selection
     */
    const startSelection = useCallback((row, col) => {
        setIsSelecting(true);
        rawCellsRef.current = [{ row, col }];
        setSelectedCells([{ row, col }]);
        selectionStartRef.current = { row, col };
    }, []);

    /**
     * Add cell to selection during drag.
     *
     * All physically touched cells are recorded in rawCellsRef. After each
     * new cell, the raw path is snapped to a straight line (start → current
     * end) so that selectedCells — which drives the visual highlight — always
     * shows the clean intended direction, not the zigzag the finger drew.
     */
    const addToSelection = useCallback((row, col) => {
        if (!isSelecting) return;

        const raw = rawCellsRef.current;
        // Skip if this is the same cell as the last one recorded
        const last = raw[raw.length - 1];
        if (last && last.row === row && last.col === col) return;

        rawCellsRef.current = [...raw, { row, col }];

        // Snap raw path to the nearest straight line and update visual state
        const snapped = snapSelectionToLine(rawCellsRef.current);
        setSelectedCells(snapped);
    }, [isSelecting]);

    /**
     * End selection and validate.
     *
     * selectedCells is already the snapped path (kept current in addToSelection),
     * so selectedCellsRef.current contains the clean straight-line cells that
     * will be validated — no extra snapping pass required here.
     */
    const endSelection = useCallback(() => {
        const current = selectedCellsRef.current;
        if (!isSelecting || current.length < 2) {
            setIsSelecting(false);
            setSelectedCells([]);
            rawCellsRef.current = [];
            return;
        }

        // Validate the already-snapped selection
        const result = validateSelection(grid, current, wordList);

        if (result) {
            onWordFound(result);
        }

        // Clear selection
        setIsSelecting(false);
        setSelectedCells([]);
        rawCellsRef.current = [];
        selectionStartRef.current = null;
    }, [isSelecting, grid, wordList, onWordFound]);

    /**
     * Cancel selection
     */
    const cancelSelection = useCallback(() => {
        setIsSelecting(false);
        setSelectedCells([]);
        rawCellsRef.current = [];
        selectionStartRef.current = null;
    }, []);

    /**
     * Check if a cell is currently selected
     */
    const isCellSelected = useCallback((row, col) => {
        return selectedCells.some(cell => cell.row === row && cell.col === col);
    }, [selectedCells]);

    return {
        selectedCells,
        isSelecting,
        startSelection,
        addToSelection,
        endSelection,
        cancelSelection,
        isCellSelected,
    };
};
