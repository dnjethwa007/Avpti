import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import DropdownMenu from './DropdownMenu';
import ProfileDropdown from './ProfileDropdown';
import Search from './Search';

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchVisible, setSearchVisible] = useState(false); // Manage search visibility
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('Users');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserName(`${user.firstName} ${user.lastName}`);
    }

    const handleAuthChange = (event) => {
      const { detail } = event;
      setIsLoggedIn(detail.loggedIn);
      setUserName(detail.loggedIn ? `${detail.user.firstName} ${detail.user.lastName}` : '');
    };

    const handleProfileUpdate = (event) => {
      const updatedUser = event.detail;
      setUserName(`${updatedUser.firstName} ${updatedUser.lastName}`);
    };

    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('profileUpdate', handleProfileUpdate);
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('profileUpdate', handleProfileUpdate);
    };
  }, []);

  const handleLoginSuccess = () => {
    const user = JSON.parse(localStorage.getItem('Users'));
    if (user) {
      setIsLoggedIn(true);
      setUserName(`${user.firstName} ${user.lastName}`);
      window.dispatchEvent(new CustomEvent('authChange', { detail: { loggedIn: true, user } }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('Users');
    setIsLoggedIn(false);
    setUserName('');
    window.dispatchEvent(new CustomEvent('authChange', { detail: { loggedIn: false } }));
  };

  const toggleSearch = () => setSearchVisible(!searchVisible); // Toggle search visibility

  return (
    <div className={`max-w-screen-2xl container mx-auto md:px-20 px-4 ${sticky ? 'sticky-navbar shadow-md bg-base-200 duration-300 transition-all ease-in-out' : ''} bg-white text-black fixed z-50 left-0 right-0 top-0`}>
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a href="/">Home</a></li>
              <li><a href="/course">Course</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><DropdownMenu /></li>
            </ul>
          </div>
          <a className="text-2xl font-bold cursor-pointer">Material Adda</a>
        </div>
        <div className="navbar-end flex items-center space-x-3">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><a href="/">Home</a></li>
              <li><a href="/course">Course</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><DropdownMenu /></li>
            </ul>
          </div>
          <div className="flex items-center md:hidden">
            <button className="btn btn-ghost" onClick={toggleSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a7 7 0 110 14 7 7 0 010-14zM21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>
          {searchVisible && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-2 z-10">
              <Search className="w-full" />
            </div>
          )}
          <div className="hidden md:flex items-center ml-4 flex-grow">
            <Search className="w-full" /> {/* Adjust width for responsiveness */}
          </div>
          {isLoggedIn ? (
            <ProfileDropdown userName={userName} onLogout={handleLogout} />
          ) : (
            <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_3').showModal()}>Login</button>
          )}
        </div>
      </div>
      <Login onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default Navbar;
