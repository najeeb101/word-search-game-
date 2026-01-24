// Header component - Site header with logo and navigation
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ user, onSignOut, showBackButton = false }) => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-left">
                    {showBackButton && (
                        <button className="back-button" onClick={() => navigate(-1)}>
                            ← Back
                        </button>
                    )}
                </div>

                <div className="logo-container" onClick={() => navigate('/')}>
                    <img src="/logo.png" alt="Silatha" className="logo" />
                </div>

                <div className="header-right">
                    {user && (
                        <>
                            <span className="user-info">
                                {user.isAnonymous ? 'Guest' : user.email}
                            </span>
                            {onSignOut && (
                                <button className="sign-out-button" onClick={onSignOut}>
                                    Sign Out
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
