import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function SemDetails() {
  const { courseTitle, semId } = useParams();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`/public/${courseTitle}/${courseTitle}_sem${semId}.json`);
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching the subjects data', error);
      }
    };

    fetchSubjects();
  }, [courseTitle, semId]);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 dark:bg-slate-900 dark:text-white dark:min-h-screen">
        <div className="mt-28 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Subjects for <span className="text-pink-500">Sem-{semId}</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {subjects.map((subject, index) => (
              <Link
                to={`/course/${courseTitle}/${semId}/${subject.code}`}
                key={index}
                className="relative group cursor-pointer bg-pink-100 dark:bg-gray-700 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{subject.Sub}</h2>
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

export default SemDetails;
