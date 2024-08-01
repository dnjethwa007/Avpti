import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Login';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const user = localStorage.getItem('Users');
        setIsAuthenticated(!!user);

        if (!user) {
            setShowLoginModal(true);
        } else {
            setShowLoginModal(false);
        }
    }, [location.pathname]);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setShowLoginModal(false);
    };

    return (
        <>
            {/* Render the login modal if not authenticated */}
            {showLoginModal && (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
            {/* Render the component if authenticated */}
            {isAuthenticated ? (
                <Component {...rest} />
            ) : (
                // Render nothing if not authenticated and modal is shown
                null
            )}
        </>
    );
};

export default PrivateRoute;
