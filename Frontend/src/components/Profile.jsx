import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details from API
        const fetchUser = async () => {
            try {
                const response = await fetch('/user/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            localStorage.removeItem('Users');
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            {user ? (
                <div className="card p-4 shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">User Details</h2>
                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <button
                        onClick={handleLogout}
                        className="btn btn-primary mt-4"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Profile;
