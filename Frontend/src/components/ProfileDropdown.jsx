import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';

function ProfileDropdown({ userName, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
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

