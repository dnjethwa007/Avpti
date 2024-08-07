import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Import course JSON
import courses from '../../public/courses.json';

// Helper function to dynamically load subject data for all semesters
const loadAllSubjects = async (courseTitle) => {
  let allSubjects = [];
  for (let semester = 1; semester <= 6; semester++) {
    try {
      const response = await import(`../../public/${courseTitle}/${courseTitle}_sem${semester}.json`);
      const subjects = response.default.map(subject => ({
        ...subject,
        semester, // Add semester information to each subject
      }));
      allSubjects = [...allSubjects, ...subjects];
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
  const [subjectSemesterMap, setSubjectSemesterMap] = useState({});
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const searchRef = useRef(null);

  // Fetch subject data when selected course changes
  useEffect(() => {
    const fetchSubjects = async () => {
      const subjects = await loadAllSubjects(selectedCourse);
      const subjectMap = subjects.reduce((map, subject) => {
        map[subject.code] = subject.semester;
        return map;
      }, {});
      setSubjectSemesterMap(subjectMap);

      if (searchQuery) {
        const filtered = subjects.filter(subject =>
          subject.code.toString().includes(searchQuery.trim())
        );
        setFilteredSubjects(filtered);
        setIsResultsVisible(true); // Show results if search query is not empty
      } else {
        setFilteredSubjects([]);
        setIsResultsVisible(false);
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

  // Handle click outside to close the search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside); // For mobile devices
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Show results if search query is not empty and results visibility is true
  const showResults = searchQuery.trim() !== '' && isResultsVisible;

  return (
    <div ref={searchRef} className="relative flex flex-col items-stretch md:flex-row">
      <div className="flex flex-col md:flex-row items-stretch w-full">
        <input
          type="text"
          className="shadow-none outline-none border rounded-md px-4 py-2 flex-grow w-full md:w-80 lg:w-60"
          placeholder="Search by subject code..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsResultsVisible(true)} // Show results when input is focused
        />
        <select
          className="mt-2 md:mt-0 md:ml-4 border rounded-md px-4 py-2 w-full md:w-40 lg:w-20"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          {courses.map(course => (
            <option key={course.id} value={course.title}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
      {showResults && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-2 max-h-60 overflow-y-auto z-10">
          <ul className="p-2">
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map(subject => (
                <li key={subject.code} className="p-2 hover:bg-gray-100">
                  <Link
                    to={`/course/${selectedCourse}/${subject.semester || 1}/${subject.code}`}
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
