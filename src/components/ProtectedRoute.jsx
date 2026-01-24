import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuthContext();
    const location = useLocation();

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Checking authentication...</p>
            </div>
        );
    }

    if (!user) {
        // Redirect to login but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
