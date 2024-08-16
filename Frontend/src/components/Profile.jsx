import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useStore } from './storeContext';

const Profile = () => {
    const { user: currentUser, setUser, API_ENDPOINTS } = useStore();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // UseForm hooks for each form separately
    const { register: registerProfile, handleSubmit: handleSubmitProfile, setValue, formState: { errors: profileErrors } } = useForm();
    const { register: registerPassword, handleSubmit: handleSubmitPassword, watch, formState: { errors: passwordErrors } } = useForm();

    const newPassword = watch('newPassword');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        fetch(API_ENDPOINTS.PROFILE, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setUser(data.user);
                    setValue('name', `${data.user.firstName} ${data.user.lastName}`);
                    setValue('email', data.user.email || '');
                }
            })
            .catch(err => {
                console.error('Error fetching user data:', err);
                setError('Failed to fetch user data');
            });
    }, [API_ENDPOINTS.PROFILE, setUser, setValue]);

    useEffect(() => {
        let timer;
        if (success) {
            timer = setTimeout(() => {
                setSuccess(null);
            }, 10000);
        }
        return () => clearTimeout(timer);
    }, [success]);

    const handleUpdateProfile = data => {
        const nameParts = data.name.trim().split(' ');

        if (nameParts.length !== 2) {
            setError('Name must consist of exactly two words separated by a single space.');
            return;
        }

        setError(null);

        const token = localStorage.getItem('token');
        fetch(API_ENDPOINTS.PROFILE, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ firstName: nameParts[0], lastName: nameParts[1], email: data.email })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setSuccess('Profile updated successfully');
                    setUser(data.user);
                    localStorage.setItem('Users', JSON.stringify(data.user));

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

    const handleChangePassword = data => {
        if (data.newPassword !== data.confirmNewPassword) {
            setError('New passwords do not match');
            return;
        }

        setError(null);

        const token = localStorage.getItem('token');
        fetch(API_ENDPOINTS.CHANGE_PASSWORD, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ currentPassword: data.currentPassword, newPassword: data.newPassword })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setSuccess('Password changed successfully');
                }
            })
            .catch(err => {
                console.error('Error changing password:', err);
                setError('Failed to change password');
            });
    };

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        fetch(API_ENDPOINTS.LOGOUT, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => {
                if (response.ok) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('Users');
                    navigate('/');
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
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-4xl font-bold mb-4 text-center">Profile</h1>
                {error && (
                    <div className="text-red-500 mb-4 text-center text-xl">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="text-green-500 mb-4 text-center text-xl">
                        {success}
                    </div>
                )}
                {currentUser ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Update Profile Form */}
                        <form onSubmit={handleSubmitProfile(handleUpdateProfile)} className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Update Profile</h2>
                            <input
                                type="text"
                                {...registerProfile('name', {
                                    required: 'Name is required',
                                    pattern: {
                                        value: /^[A-Za-z]+(?: [A-Za-z]+){1}$/,
                                        message: 'Name must be exactly two words separated by a single space'
                                    }
                                })}
                                placeholder="Name (First Last)"
                                className={`border p-2 mb-2 w-full ${profileErrors.name ? 'border-red-500' : ''}`}
                            />
                            {profileErrors.name && <p className="text-red-500">{profileErrors.name.message}</p>}
                            <input
                                type="email"
                                {...registerProfile('email')}
                                placeholder="Email"
                                className="border p-2 mb-2 w-full bg-gray-200 cursor-not-allowed"
                                readOnly
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                Update Profile
                            </button>
                        </form>

                        {/* Change Password Form */}
                        <form onSubmit={handleSubmitPassword(handleChangePassword)}>
                            <h2 className="text-lg font-semibold mb-2">Change Password</h2>
                            <input
                                type="password"
                                {...registerPassword('currentPassword', { required: 'Current Password is required' })}
                                placeholder="Current Password"
                                className={`border p-2 mb-2 w-full ${passwordErrors.currentPassword ? 'border-red-500' : ''}`}
                            />
                            {passwordErrors.currentPassword && <p className="text-red-500">{passwordErrors.currentPassword.message}</p>}
                            <input
                                type="password"
                                {...registerPassword('newPassword', {
                                    required: 'New Password is required',
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
                                        message: 'Password must be 6-10 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long'
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Password must be no more than 10 characters long'
                                    }
                                })}
                                placeholder="New Password"
                                className={`border p-2 mb-2 w-full ${passwordErrors.newPassword ? 'border-red-500' : ''}`}
                            />
                            {passwordErrors.newPassword && <p className="text-red-500">{passwordErrors.newPassword.message}</p>}
                            <input
                                type="password"
                                {...registerPassword('confirmNewPassword', {
                                    required: 'Confirm New Password is required',
                                    validate: value => value === newPassword || 'Passwords do not match'
                                })}
                                placeholder="Confirm New Password"
                                className={`border p-2 mb-4 w-full ${passwordErrors.confirmNewPassword ? 'border-red-500' : ''}`}
                            />
                            {passwordErrors.confirmNewPassword && <p className="text-red-500">{passwordErrors.confirmNewPassword.message}</p>}
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                Change Password
                            </button>
                        </form>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="mt-6 text-center">
                    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
