import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function SemDetails() {
  const { courseTitle, semId } = useParams();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`/public/${courseTitle}/${courseTitle}_sem${semId}.json`);
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching the subjects data", error);
      }
    };

    fetchSubjects();
  }, [courseTitle, semId]);

  return (
    <>
      <Navbar />
      <div className='max-w-screen-2xl container mx-auto px-4 md:px-20'>
        <div className='mt-28 flex flex-col items-center justify-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-12 text-center'>
            Subjects for <span className='text-pink-500'>Sem-{semId}</span>
          </h1>
          <Link to={`/course/${courseTitle}`}>
            <button className='m-3 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>Back</button>
          </Link>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {subjects.map((subject, index) => (
              <Link to={`/course/${courseTitle}/${semId}/${subject.code}`} key={index} className='relative group cursor-pointer'>
                <div className="bg-pink-100 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{subject.Sub}</h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SemDetails;
