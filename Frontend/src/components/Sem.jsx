import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Sem() {
  const { courseTitle } = useParams();
  const navigate = useNavigate();
  const semesters = [
    { id: 1, name: 'Sem-1' },
    { id: 2, name: 'Sem-2' },
    { id: 3, name: 'Sem-3' },
    { id: 4, name: 'Sem-4' },
    { id: 5, name: 'Sem-5' },
    { id: 6, name: 'Sem-6' },
  ];

  const handleCardClick = (semId) => {
    navigate(`/course/${courseTitle}/${semId}`);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white">
      <Navbar />
      <div className="mt-28 text-center">
        <h1 className="text-3xl md:text-5xl mt-20 font-bold">
          Semesters for <span className="text-pink-500">{courseTitle}</span>
        </h1>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {semesters.map((sem) => (
          <div
            key={sem.id}
            className="relative group cursor-pointer bg-pink-100 dark:bg-gray-700 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105"
            onClick={() => handleCardClick(sem.id)}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold">{sem.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sem;
