// Grid component - Main word search game board
import React from 'react';
import Cell from './Cell';
import { isCellInFoundWord } from '../utils/wordValidator';
import '../styles/Grid.css';

const Grid = ({
    gridData,
    foundWords,
    selectedCells,
    hintedCells,
    onStartSelection,
    onContinueSelection,
    onEndSelection
}) => {
    const { grid } = gridData;

    const handleMouseDown = (row, col) => {
        onStartSelection(row, col);
    };

    const handleMouseEnter = (row, col) => {
        onContinueSelection(row, col);
    };

    const handleMouseUp = () => {
        onEndSelection();
    };

    const handleTouchStart = (e, row, col) => {
        if (e.cancelable) e.preventDefault();
        onStartSelection(row, col);
    };

    const handleTouchMove = (e) => {
        if (e.cancelable) e.preventDefault();
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);

        if (element && element.classList.contains('cell')) {
            const row = parseInt(element.dataset.row);
            const col = parseInt(element.dataset.col);
            onContinueSelection(row, col);
        }
    };

    const handleTouchEnd = (e) => {
        if (e.cancelable) e.preventDefault();
        onEndSelection();
    };

    const isCellSelected = (row, col) => {
        return selectedCells.some(cell => cell.row === row && cell.col === col);
    };

    const isCellFound = (row, col) => {
        return isCellInFoundWord({ row, col }, foundWords);
    };

    const isCellHinted = (row, col) => {
        return hintedCells.some(cell => cell.row === row && cell.col === col);
    };

    return (
        <div
            className="grid-container"
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${grid.length}, 1fr)`,
                    gridTemplateRows: `repeat(${grid.length}, 1fr)`,
                    '--grid-columns': grid.length
                }}
            >
                {grid.map((row, rowIndex) =>
                    row.map((letter, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            letter={letter}
                            row={rowIndex}
                            col={colIndex}
                            isSelected={isCellSelected(rowIndex, colIndex)}
                            isFound={isCellFound(rowIndex, colIndex)}
                            isHinted={isCellHinted(rowIndex, colIndex)}
                            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                            onMouseUp={handleMouseUp}
                            onTouchStart={(e) => handleTouchStart(e, rowIndex, colIndex)}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Grid;
