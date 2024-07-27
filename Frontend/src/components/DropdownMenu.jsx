import React, { useState, useEffect, useRef } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

// Component to display dropdown menu
const DropdownMenu = () => {
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Manage dropdown visibility
  const [activeCourseId, setActiveCourseId] = useState(null); // Manage active course state
  const [hoverTimeout, setHoverTimeout] = useState(null); // Manage hover delay
  const dropdownRef = useRef(null); // Ref for the dropdown menu

  // Fetch courses data from JSON file
  useEffect(() => {
    fetch('/courses.json')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveCourseId(null); // Reset active course when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle hover state with delay for courses
  const handleCourseMouseEnter = (courseId) => {
    clearTimeout(hoverTimeout);
    setActiveCourseId(courseId);
  };

  const handleCourseMouseLeave = () => {
    // Delay hiding the course dropdown
    const timeout = setTimeout(() => {
      setActiveCourseId(null);
    }, 100); // Delay before hiding
    setHoverTimeout(timeout);
  };

  // Handle hover state with delay for the main dropdown
  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Delay hiding the main dropdown
    const timeout = setTimeout(() => {
      if (!dropdownRef.current.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 100); // Delay before hiding
    setHoverTimeout(timeout);
  };

  return (
    <div
      className="relative inline-block text-left"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center"
        onClick={toggleDropdown} // Toggle visibility on click
      >
        <span>Syllabus</span>
        <IoMdArrowDropdown className="ml-2" />
      </button>
      <div
        className={`absolute mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <ul className="space-y-1">
          {courses.map(course => (
            <li
              key={course.id}
              className="relative"
              onMouseEnter={() => handleCourseMouseEnter(course.id)} // Show submenu on course hover
              onMouseLeave={handleCourseMouseLeave} // Hide submenu on course leave
            >
              {/* Course Item */}
              <a
                href={`/course/${course.title}`}
                className="block p-2 cursor-pointer flex items-center"
              >
                {course.name}
              </a>
              {/* Submenu for semester options */}
              <ul
                className={`absolute left-full top-0 mt-2 bg-white border border-gray-300 rounded-lg transition-opacity duration-300 w-48 z-20 ${activeCourseId === course.id ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                {[1, 2, 3, 4, 5, 6].map(sem => (
                  <li key={sem} className="p-2 hover:bg-gray-100">
                    <a href={`/course/${course.title}/${sem}`} className="block text-gray-700">
                      Sem {sem}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
