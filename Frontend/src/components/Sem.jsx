import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
      <Navbar />
      <div className='mt-28 items-center justify-center text-center'>
        <h1 className='text-2xl md:text-4xl mt-20'>
          Semesters for <span className='text-pink-500'>Selected Course</span>
        </h1>
        <Link to="/course">
          <button className='mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>Back</button>
        </Link>
      </div>

      <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-8'>
        {semesters.map((sem) => (
          <div
            key={sem.id}
            className='relative group cursor-pointer'
            onClick={() => handleCardClick(sem.id)}
          >
            <div className="bg-base-100 w-70 shadow-xl overflow-hidden rounded-xl p-4">
              <div className="text-center p-4">
                <h2 className="text-xl font-bold">{sem.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sem;
