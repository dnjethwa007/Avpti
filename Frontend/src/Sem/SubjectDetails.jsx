import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function SubjectDetails() {
  const { courseTitle, semId, subjectCode } = useParams();
  const [sections, setSections] = useState([]);
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    const fetchSectionsAndSubject = async () => {
      try {
        const sectionsResponse = await axios.get('/meterial.json');
        setSections(sectionsResponse.data);

        const subjectResponse = await axios.get(`/public/${courseTitle}/${courseTitle}_sem${semId}.json`);
        const subjectCodeNumber = Number(subjectCode);
        const subjectData = subjectResponse.data.find(sub => sub.code === subjectCodeNumber);

        if (subjectData) {
          setSubject(subjectData);
        } else {
          setSubject({ Sub: 'Not Found' });
        }
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchSectionsAndSubject();
  }, [courseTitle, semId, subjectCode]);

  if (!subject) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  const sectionLinks = [
    { name: 'Syllabus', path: 'syllabus' },
    { name: 'Student Material', path: 'student-material' },
    { name: 'Assignment', path: 'assignment' },
    { name: 'Important Questions', path: 'important-questions' },
    { name: 'Model Question Paper', path: 'model-question-paper' },
    { name: 'GTU Exam Paper', path: 'gtu-exam-paper' },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 dark:bg-slate-900 dark:text-white">
        <div className="mt-28 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Details for <span className="text-pink-500">{subject.Sub}</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sectionLinks.map((section, index) => (
              <Link
                to={`/course/${courseTitle}/${semId}/${subjectCode}/${section.path}`}
                key={index}
                className="relative group cursor-pointer bg-pink-100 dark:bg-gray-700 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{section.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Click to view {section.name.toLowerCase()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SubjectDetails;
