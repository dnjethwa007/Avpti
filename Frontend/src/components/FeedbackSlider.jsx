import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'; // Import icons for quotation marks

const testimonials = [
  {
    text: "I was thoroughly impressed! The content was comprehensive, well-organized, and easy to follow. The study guides and practice quizzes were particularly helpful in reinforcing my understanding of the material.",
    name: "John Doe",
    location: "New York, USA"
  },
  {
    text: "An excellent resource for mastering complex topics. The explanations were clear, and the examples were relevant and insightful. Highly recommended for anyone looking to improve their skills.",
    name: "Jane Smith",
    location: "London, UK"
  },
  {
    text: "A fantastic learning experience. The course material was well-structured and engaging. The interactive quizzes helped solidify my knowledge effectively.",
    name: "Samuel Lee",
    location: "Sydney, Australia"
  },
  {
    text: "The content was top-notch and the support provided was exceptional. I felt well-prepared for the challenges ahead thanks to the comprehensive coverage of each topic.",
    name: "Emma Brown",
    location: "Toronto, Canada"
  }
];

function FeedbackSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 px-4">
      {/* Heading Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          What Our Readers Are Saying
        </h2>
      </div>
      
      {/* Slider Section */}
      <div className="relative w-full max-w-4xl h-[300px] bg-[#fce7f3] p-6 rounded-lg shadow-lg overflow-hidden mx-auto">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6">
          <div className="relative flex items-center justify-center">
            <FaQuoteLeft className="absolute text-4xl text-gray-400 -left-5 -top-8" />
            <p className="text-base md:text-lg font-medium mb-4 text-center px-4 md:px-6 bg-opacity-25">
              {testimonials[currentIndex].text}
            </p>
            <FaQuoteRight className="absolute text-4xl text-gray-400 -right-1 -bottom-10" />
          </div>
          <div className="text-sm font-bold  mt-4">
            - {testimonials[currentIndex].name}, {testimonials[currentIndex].location}
          </div>
        </div>
        <button
          onClick={handlePrevSlide}
          className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-[#ec4899] text-white p-3 rounded-full hover:bg-pink-600 z-10"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-[#ec4899] text-white p-3 rounded-full hover:bg-pink-600 z-10"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default FeedbackSlider;
