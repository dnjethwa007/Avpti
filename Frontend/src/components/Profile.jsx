import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // For notifications
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details from local storage or context (depending on your setup)
        const fetchUserDetails = async () => {
            try {
                // Assuming you have a method to get the current user data
                const response = await axios.get('/user/profile'); // Replace with actual endpoint
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user details:', error);
                toast.error('Error fetching user details');
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/user/logout');
            toast.success('Logged out successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Error logging out');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
            {user ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">User Profile</h2>
                    <p className="text-gray-700 mb-4"><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
                    <p className="text-gray-700 mb-4"><strong>Email:</strong> {user.email}</p>
                    <p className="text-gray-700 mb-4"><strong>Password:</strong> ********</p>
                    <button
                        className="btn btn-primary mt-4"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
