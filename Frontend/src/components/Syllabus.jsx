import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FaDownload } from 'react-icons/fa';

function Syllabus() {
  const { courseTitle, semId, subjectCode } = useParams();
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response = await axios.get(`/CE/Syllabus/1_syl.json`);
        const subjects = response.data;
        const foundSubject = subjects.find(sub => sub.code === parseInt(subjectCode, 10));
        setSubject(foundSubject);
      } catch (error) {
        console.error("Error fetching the subject data", error);
      }
    };

    fetchSubjectData();
  }, [courseTitle, semId, subjectCode]);

  if (!subject) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className='max-w-screen-2xl container mx-auto px-4 md:px-20'>
        <div className='mt-28 flex flex-col items-center justify-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-12 text-center'>
            Syllabus for <span className='text-pink-500'>{subject.Sub}</span>
          </h1>
          <Link to={`/course/${courseTitle}/${semId}/${subjectCode}`}>
            <button className='m-3 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>Back</button>
          </Link>
          <div className='w-full bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-6 flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-semibold mb-2'>Syllabus</h2>
            </div>
            
            <a href={`${subject.Syllabus}`} download className='text-pink-500 hover:text-pink-700 flex items-center'>
                      <FaDownload size={24} className='mr-2' />
                      Download
                    </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Syllabus;
