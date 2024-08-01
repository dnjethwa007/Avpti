import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('Users');
        const token = localStorage.getItem('token');
        const isLoggedIn = !!user && !!token;

        setIsAuthenticated(isLoggedIn);

        if (!isLoggedIn) {
            setShowLoginModal(true);
            const modal = document.getElementById('my_modal_3');
            if (modal) modal.showModal();
        } else {
            setShowLoginModal(false);
            const modal = document.getElementById('my_modal_3');
            if (modal) modal.close();
        }
    }, [location.pathname]);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setShowLoginModal(false);

        // Close the modal
        const modal = document.getElementById('my_modal_3');
        if (modal) modal.close();

        // Redirect to the previous path or home
        navigate(location.state?.from || '/');
    };

    return (
        <>
            {showLoginModal && <Login onLoginSuccess={handleLoginSuccess} />}
            <Outlet />
        </>
    );
};

export default PrivateRoute;
