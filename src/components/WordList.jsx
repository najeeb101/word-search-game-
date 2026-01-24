// WordList component - Displays words to find
import React from 'react';
import '../styles/WordList.css';

const WordList = ({ words, foundWords }) => {
    const isWordFound = (word) => {
        return foundWords.some(found => found.word.toUpperCase() === word.toUpperCase());
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
                        {word.toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WordList;
