// WordList component - Displays words to find
import React, { useState } from 'react';
import { getDisplayWord } from '../config/levels';
import { getDefinition } from '../config/definitions';
import '../styles/WordList.css';

const normalize = (w) => w.replace(/\s+/g, '').toUpperCase();

// Soft-hyphen hints for long words on mobile.
// \u00AD is the soft hyphen: invisible normally, shows as '-' only when the
// browser breaks the line at that point.
// Multi-word entries just need a proper space so the browser can wrap naturally.
const SHY = '\u00AD';
const HYPHENATED = {
    INTERSECTIONALITY:  <>Inter{SHY}sectionality</>,
    ENDOMETRIOSIS:      <>Endo{SHY}metriosis</>,
    MANTERRUPTION:      <>Manter{SHY}ruption</>,
    MICROAGGRESSION:    <>Micro{SHY}aggression</>,
    HYPERANDROGENISM:   <>Hyper{SHY}androgenism</>,
    IMPOSTORSYNDROME:   <>Impostor Syndrome</>,
    MEDICALGASLIGHTING: <>Medical Gaslighting</>,
    FERTILITYJOURNEY:   <>Fertility Journey</>,
    POSTNALANXIETY:     <>Postnatal Anxiety</>,
    POSTNATALANXIETY:   <>Postnatal Anxiety</>,
};

const WordList = ({ words, foundWords }) => {
    const [activeWord, setActiveWord] = useState(null);

    const isWordFound = (word) =>
        foundWords.some(found => normalize(found.word) === normalize(word));

    const toggleDefinition = (word) => {
        setActiveWord(prev => (prev === word ? null : word));
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
                {words.map((word, index) => {
                    const found = isWordFound(word);
                    const def = getDefinition(normalize(word));
                    const isOpen = activeWord === word;

                    return (
                        <div key={index} className="word-item-wrapper">
                            <div className={`word-item ${found ? 'found' : ''}`}>
                                    <span className="word-item-text">
                                    {HYPHENATED[normalize(word)] ?? getDisplayWord(word)}
                                </span>
                                {def && (
                                    <button
                                        className={`word-info-btn ${isOpen ? 'active' : ''}`}
                                        onClick={() => toggleDefinition(word)}
                                        aria-label={`Definition of ${getDisplayWord(word)}`}
                                    >
                                        ⓘ
                                    </button>
                                )}
                            </div>
                            {isOpen && def && (
                                <div className="word-definition">
                                    <strong>{def.display}</strong>
                                    <p>{def.definition}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WordList;
