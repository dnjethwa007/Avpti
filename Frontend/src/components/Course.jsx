import React from 'react';
import Courses from '../../public/courses.json';
import { Link } from 'react-router-dom';
import Card from './Card';
import Navbar from './Navbar';

function Course() {
  return (
    <>
      <Navbar />
      <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
        <div className='mt-28 items-center justify-center text-center'>
          <h1 className='text-2xl md:text-4xl mt-20'>
            Here Are <span className='text-pink-500'>AVPTI Courses :)</span>
          </h1>
          <Link to="/">
            <button className='mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>Back</button>
          </Link>
        </div>
        <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {Courses.map((item) => (
            <div key={item.id} className='bg-pink-100 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105'>
              <Link to={`/course/${item.title}`}>
                <Card item={item} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Course;
