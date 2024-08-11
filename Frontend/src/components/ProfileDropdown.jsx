import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useStore } from './storeContext'; // Import useStore from StoreContext

function ProfileDropdown({ userName, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { API_ENDPOINTS } = useStore(); // Access API endpoints from context

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found in localStorage');
      toast.error('Failed to log out: No token found');
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.LOGOUT, { // Use API endpoint from context
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('Users'); // Remove user data from localStorage
        onLogout(); // Notify parent component about logout
        navigate('/'); // Redirect to home page
        toast.success('Logged out successfully');
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (err) {
      console.error('Error logging out:', err);
      toast.error(`Failed to log out: ${err.message}`);
    }
    
    setIsOpen(false); // Close the dropdown after logout
  };

  const firstInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <div
        className="w-10 h-10 flex items-center justify-center bg-pink-500 text-white text-lg rounded-full cursor-pointer"
        onClick={toggleDropdown}
      >
        {firstInitial}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-48">
          <ul>
            <li>
              <a href="/profile" className="block px-4 py-2 text-black hover:bg-gray-200">My Profile</a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-black hover:bg-gray-200"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
