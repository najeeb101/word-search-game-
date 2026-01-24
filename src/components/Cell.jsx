// Cell component - Individual letter cell in the word search grid
import React from 'react';
import '../styles/Cell.css';

const Cell = ({
    letter,
    row,
    col,
    isSelected,
    isFound,
    isHinted,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd
}) => {
    const cellClass = `cell ${isSelected ? 'selected' : ''} ${isFound ? 'found' : ''} ${isHinted ? 'hinted' : ''}`;

    return (
        <div
            className={cellClass}
            data-row={row}
            data-col={col}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {letter}
        </div>
    );
};

export default Cell;
