// Custom hook for word selection logic
import { useState, useCallback, useRef } from 'react';
import { validateSelection } from '../utils/wordValidator';

export const useWordSelection = (grid, wordList, onWordFound) => {
    const [selectedCells, setSelectedCells] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const selectionStartRef = useRef(null);

    /**
     * Start selection
     */
    const startSelection = useCallback((row, col) => {
        setIsSelecting(true);
        setSelectedCells([{ row, col }]);
        selectionStartRef.current = { row, col };
    }, []);

    /**
     * Add cell to selection during drag
     */
    const addToSelection = useCallback((row, col) => {
        if (!isSelecting) return;

        setSelectedCells(prev => {
            // Check if cell is already in selection
            const exists = prev.some(cell => cell.row === row && cell.col === col);
            if (exists) return prev;

            // Add cell to selection
            return [...prev, { row, col }];
        });
    }, [isSelecting]);

    /**
     * End selection and validate
     */
    const endSelection = useCallback(() => {
        if (!isSelecting || selectedCells.length < 2) {
            setIsSelecting(false);
            setSelectedCells([]);
            return;
        }

        // Validate selection
        const result = validateSelection(grid, selectedCells, wordList);

        if (result) {
            onWordFound(result);
        }

        // Clear selection
        setIsSelecting(false);
        setSelectedCells([]);
        selectionStartRef.current = null;
    }, [isSelecting, selectedCells, grid, wordList, onWordFound]);

    /**
     * Cancel selection
     */
    const cancelSelection = useCallback(() => {
        setIsSelecting(false);
        setSelectedCells([]);
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
