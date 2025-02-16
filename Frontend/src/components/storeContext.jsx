import React, { createContext, useContext, useState, useEffect } from 'react';

// Define your API base URL and endpoints
// const API_BASE_URL = "https://avpti-backed.onrender.com";
const API_BASE_URL = "http://localhost:4001";

export const API_ENDPOINTS = {
    PROFILE: `${API_BASE_URL}/user/profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/user/change-password`,
    LOGOUT: `${API_BASE_URL}/user/logout`,
    LOGIN: `${API_BASE_URL}/user/login`,
    SEND_RESET_LINK: `${API_BASE_URL}/user/send-reset-link`,
    RESET_PASSWORD: `${API_BASE_URL}/user/reset-password`,
    SEND_OTP: `${API_BASE_URL}/user/send-otp`, 
    VERIFY_OTP: `${API_BASE_URL}/user/verify-otp`,
    CANCEL_OTP: `${API_BASE_URL}/user/cancel-otp`
};

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(API_ENDPOINTS.PROFILE, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(response => response.json())
                .then(data => {
                    if (!data.error) {
                        setUser(data.user);
                    } else {
                        setUser(null);
                    }
                })
                .catch(err => {
                    console.error('Error fetching user data:', err);
                    setUser(null);
                });
        }
    }, []);

    return (
        <StoreContext.Provider value={{ user, setUser, API_ENDPOINTS }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};
