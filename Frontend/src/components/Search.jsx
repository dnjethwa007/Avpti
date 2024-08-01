  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';

  // Import course JSON
  import courses from '../../public/courses.json';

  // Helper function to dynamically load subject data for all semesters
  const loadAllSubjects = async (courseTitle) => {
    let allSubjects = [];
    for (let semester = 1; semester <= 6; semester++) { // Assuming up to 6 semesters
      try {
        const response = await import(`../../public/${courseTitle}/${courseTitle}_sem${semester}.json`);
        allSubjects = [...allSubjects, ...response.default];
      } catch (error) {
        console.error(`Failed to load subject data for ${courseTitle} semester ${semester}`, error);
      }
    }
    return allSubjects;
  };

  function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('CE'); // Default course

    // Fetch subject data when search query or selected course changes
    useEffect(() => {
      const fetchSubjects = async () => {
        const subjects = await loadAllSubjects(selectedCourse);
        if (searchQuery) {
          const filtered = subjects.filter(subject =>
            subject.code.toString().includes(searchQuery.trim())
          );
          setFilteredSubjects(filtered);
        } else {
          setFilteredSubjects([]);
        }
      };
      fetchSubjects();
    }, [searchQuery, selectedCourse]);

    // Handle search input change
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };

    // Handle course selection change
    const handleCourseChange = (event) => {
      setSelectedCourse(event.target.value);
    };

    const showResults = searchQuery.trim() !== '';

    return (
      <div className="relative">
        <input
          type="text"
          className="shadow-none grow outline-none border rounded-md px-4 py-2 w-full"
          placeholder="Search by subject code..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          className="mt-2 border rounded-md px-4 py-2 w-20"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          {courses.map(course => (
            <option key={course.id} value={course.title}>
              {course.title} {/* Display only title */}
            </option>
          ))}
        </select>
        {showResults && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-2 max-h-60 overflow-y-auto">
            <ul className="p-2">
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map(subject => (
                  <li key={subject.code} className="p-2 hover:bg-gray-100">
                    <Link
                      to={`/course/${selectedCourse}/1/${subject.code}`} // Assuming semester is '1'
                      className="flex items-center"
                    >
                      <span>{subject.Sub}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No subjects found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }

  export default Search;
