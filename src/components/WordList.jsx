// WordList component - Displays words to find
import React from 'react';
import { getDisplayWord } from '../config/levels';
import '../styles/WordList.css';

const WordList = ({ words, foundWords }) => {
    const isWordFound = (word) => {
        // Compare without spaces and case-insensitively so config words like
        // "PATERNAL LEAVE" match validator results correctly.
        const normalize = (w) => w.replace(/\s+/g, '').toUpperCase();
        return foundWords.some(found => normalize(found.word) === normalize(word));
    };

    const foundCount = foundWords.length;
    const totalCount = words.length;

    return (
        <div className="word-list-container">
            <div className="word-list-header">
                <h3>Words to Find</h3>
                <div className="word-count">
                    {foundCount} / {totalCount}
                </div>
            </div>
            <div className="word-list">
                {words.map((word, index) => (
                    <div
                        key={index}
                        className={`word-item ${isWordFound(word) ? 'found' : ''}`}
                    >
                        {getDisplayWord(word)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WordList;
