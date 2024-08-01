import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        fetch('http://localhost:4001/user/profile', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setUser(data.user);
                setName(`${data.user.firstName} ${data.user.lastName}`);
                setEmail(data.user.email || '');
            }
        })
        .catch(err => {
            console.error('Error fetching user data:', err);
            setError('Failed to fetch user data');
        });
    }, []);

    const handleUpdateProfile = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:4001/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ firstName: name.split(' ')[0], lastName: name.split(' ')[1], email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setSuccess('Profile updated successfully');
                setUser(data.user);
                
                // Save updated profile info to localStorage
                localStorage.setItem('Users', JSON.stringify(data.user));

                // Dispatch a custom event for profile update
                const profileUpdateEvent = new CustomEvent('profileUpdate', {
                    detail: data.user
                });
                window.dispatchEvent(profileUpdateEvent);
            }
        })
        .catch(err => {
            console.error('Error updating profile:', err);
            setError('Failed to update profile');
        });
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match');
            return;
        }

        const token = localStorage.getItem('token');
        fetch('http://localhost:4001/user/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ currentPassword, newPassword })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setSuccess('Password changed successfully');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            }
        })
        .catch(err => {
            console.error('Error changing password:', err);
            setError('Failed to change password');
        });
    };

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:4001/user/logout', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                return response.text().then(text => { throw new Error(text); });
            }
        })
        .catch(err => {
            console.error('Error logging out:', err);
            setError('Failed to log out');
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            {user ? (
                <>
                    <p className="mb-2">Name: {user.firstName} {user.lastName}</p>
                    <p className="mb-4">Email: {user.email}</p>

                    <h2 className="text-lg font-semibold mb-2">Update Profile</h2>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="border p-2 mb-2 w-full"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border p-2 mb-4 w-full"
                    />
                    <button
                        onClick={handleUpdateProfile}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Update Profile
                    </button>

                    <h2 className="text-lg font-semibold mb-2 mt-6">Change Password</h2>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current Password"
                        className="border p-2 mb-2 w-full"
                    />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="border p-2 mb-2 w-full"
                    />
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="Confirm New Password"
                        className="border p-2 mb-4 w-full"
                    />
                    <button
                        onClick={handleChangePassword}
                        className="bg-green-500 text-white p-2 rounded"
                    >
                        Change Password
                    </button>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white p-2 rounded mt-4"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Profile;