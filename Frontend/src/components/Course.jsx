import React from 'react';
import Courses from '../../public/courses.json';
import { Link } from 'react-router-dom';
import Card from './Card';
import Navbar from './Navbar';
import { FaArrowLeft } from 'react-icons/fa';  

function Course() {
  return (
    <>
      <Navbar />
      <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white'>
        <div className='mt-12 flex flex-col items-center text-center'>
          <h1 className='text-2xl md:text-4xl mt-8'>
            Here Are <span className='text-pink-500'>AVPTI Courses :)</span>
          </h1>
        </div>
        <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {Courses.map((item) => (
            <div key={item.id} className='flex justify-center'>
              <Link to={`/course/${item.title}`}>
                <Card item={item} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
