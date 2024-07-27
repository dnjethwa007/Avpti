import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import DropdownMenu from './DropdownMenu';
import { CgProfile } from "react-icons/cg";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("Users");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserName(`${user.firstName} ${user.lastName}`);
    }

    const handleAuthChange = (event) => {
      const { detail } = event;
      if (detail.loggedIn) {
        setIsLoggedIn(true);
        setUserName(`${detail.user.firstName} ${detail.user.lastName}`);
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLoginSuccess = () => {
    const user = JSON.parse(localStorage.getItem("Users"));
    if (user) {
      setIsLoggedIn(true);
      setUserName(`${user.firstName} ${user.lastName}`);
    }
    const authChangeEvent = new CustomEvent("authChange", {
      detail: { loggedIn: true, user },
    });
    window.dispatchEvent(authChangeEvent);
  };

  const handleLogout = () => {
    localStorage.removeItem("Users");
    setIsLoggedIn(false);
    setUserName("");
    const authChangeEvent = new CustomEvent("authChange", {
      detail: { loggedIn: false },
    });
    window.dispatchEvent(authChangeEvent);
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div
      className={`max-w-screen-2xl container mx-auto md:px-20 px-4 ${
        sticky ? "sticky-navbar shadow-md bg-base-200 duration-300 transition-all ease-in-out" : ""
      } bg-white text-black fixed z-50 left-0 right-0 top-0`}
    >
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li><a href="/">Home</a></li>
              <li><a href="/course">Course</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><DropdownMenu /></li>
            </ul>
          </div>
          <a className="text-2xl font-bold cursor-pointer">AVPTI Material Adda</a>
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
          <div className="hidden md:flex items-center ml-4">
            <label className="flex items-center gap-2 px-3 py-2 rounded-md border">
              <input
                type="text"
                className="shadow-none grow outline-none"
                placeholder="Search"
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
              </svg>
            </label>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <CgProfile
                  className="w-10 h-10 cursor-pointer text-gray-700"
                  onClick={goToProfile} />
                <div className="absolute top-0 right-0 bg-red-500 rounded-full w-3 h-3"></div>
              </div>
                <span className="text-lg">{userName}</span>
              <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => document.getElementById("my_modal_3").showModal()}>Login</button>
          )}
        </div>
      </div>
      <Login onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default Navbar;
