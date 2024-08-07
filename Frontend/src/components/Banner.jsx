import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaUsers, FaFan, FaUser } from 'react-icons/fa'; // Import the icons

import Book1 from '../assets/Book1.jpg';
import Book2 from '../assets/Book2.jpg';
import Book3 from '../assets/Book3.jpg';
import Book4 from '../assets/Book4.jpg';
import FeedbackSlider from './FeedbackSlider';

const images = [Book1, Book2, Book3, Book4];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false); // Track transition status
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isTransitioning]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000); // Match this duration with the transition duration

      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleLearnMoreClick = () => {
    navigate('/course');
  };

  const handlePrevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleThumbnailClick = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      {/* Slider Section */}
      <div className="relative w-full h-[60vh] md:h-[80vh] mt-10">
        <div className="relative w-full h-full overflow-hidden">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="text-center text-white">
              <h1 className="text-xl md:text-3xl font-bold mb-4">
                Learn New Books For <br /> Build Your Career...!!!
              </h1>
              <button
                onClick={handleLearnMoreClick}
                className="px-4 py-2 md:px-6 md:py-3 bg-[#ec4899] text-white font-semibold rounded hover:bg-blue-600"
              >
                Learn More
              </button>
            </div>
          </div>
          <button
            onClick={handlePrevSlide}
            className="absolute top-1/2 left-4 md:left-6 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 z-10"
          >
            &#10094;
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute top-1/2 right-4 md:right-6 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 z-10"
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Thumbnails Navigation */}
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full mx-1 transition-colors duration-300 ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'}`}
          />
        ))}
      </div>

      {/* New Section with Background Color and Icons */}
      <div className="bg-[#ec4899] py-8 md:py-10 text-white mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-around items-center gap-6">
            <div className="flex flex-col items-center">
              <FaBook className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-lg font-bold">+99 Books Available</span>
            </div>
            <div className="flex flex-col items-center">
              <FaUser className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-lg font-bold">+1000 Active Readers</span>
            </div>
            <div className="flex flex-col items-center">
              <FaUsers className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-lg font-bold">+1500 Subscribers</span>
            </div>
            <div className="flex flex-col items-center">
              <FaFan className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-lg font-bold">+999 Fan Following</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <FeedbackSlider />
      </div>

    </div>
  );
}

export default Banner;
