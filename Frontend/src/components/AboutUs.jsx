import React from 'react';
import { FaBook, FaTools, FaChalkboardTeacher, FaDatabase } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import AboutUsImage from '../assets/About.jpg'; 

const AboutUs = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[80vh] mt-20 overflow-hidden">
        <img
          src={AboutUsImage}
          alt="About Us Hero"
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
          <div className="text-center text-white">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 animate-fadeIn">
              About Us
            </h1>
            <p className="text-sm md:text-lg mb-6 animate-fadeIn animate-delay-200">
              Providing comprehensive educational materials for diploma students across various engineering disciplines.
            </p>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 animate-fadeIn">
            Our Services
          </h2>
          <div className="flex flex-col md:flex-row justify-around gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg w-full md:w-64 transform transition-transform duration-500 hover:scale-105 animate-fadeIn animate-delay-300">
              <FaBook className="text-4xl mb-4 text-[#ec4899]" />
              <h3 className="text-xl font-semibold mb-2">Comprehensive Materials</h3>
              <p>
                We provide detailed syllabus, student materials including PDFs for unit explanations, assignments, important questions, model question papers, GTU exam papers, and reference books for a variety of diploma courses.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-lg w-full md:w-80 transform transition-transform duration-500 hover:scale-105 animate-fadeIn animate-delay-400">
              <FaTools className="text-4xl mb-4 text-[#ec4899]" />
              <h3 className="text-xl font-semibold mb-2">Engineering Courses</h3>
              <p>
                Our platform covers a range of diploma courses including Computer Engineering, Renewable Energy, Electrical Engineering, Biomedical Engineering, Electronics and Communication Engineering, ICT, and Instrumentation and Control Engineering.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center text-center bg-white p-5 rounded-lg shadow-lg w-full md:w-72 transform transition-transform duration-500 hover:scale-105 animate-fadeIn animate-delay-500">
              <FaChalkboardTeacher className="text-4xl mb-4 text-[#ec4899]" />
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p>
                We ensure that students receive accurate and relevant content prepared by experienced educators to aid their academic success.
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg w-full md:w-96 transform transition-transform duration-500 hover:scale-105 animate-fadeIn animate-delay-600">
              <FaDatabase className="text-4xl mb-4 text-[#ec4899]" />
              <h3 className="text-xl font-semibold mb-2">Diverse Content</h3>
              <p>
                From semester-wise materials to specific subjects, our platform is equipped to provide comprehensive resources tailored to various engineering disciplines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Information Section */}
      <div className="py-10 md:py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 animate-fadeIn">
            Our Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 animate-fadeIn animate-delay-700">
              <h3 className="text-xl font-semibold mb-2">Diploma in Computer Engineering</h3>
              <p>
                Comprehensive materials for Computer Engineering covering all semesters.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 animate-fadeIn animate-delay-800">
              <h3 className="text-xl font-semibold mb-2">Diploma in Renewable Energy</h3>
              <p>
                Detailed resources and study aids for Renewable Energy diploma courses.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 animate-fadeIn animate-delay-900">
              <h3 className="text-xl font-semibold mb-2">Diploma in Electrical Engineering</h3>
              <p>
                All necessary materials and assignments for Electrical Engineering students.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 animate-fadeIn animate-delay-1000">
              <h3 className="text-xl font-semibold mb-2">Diploma in Biomedical Engineering</h3>
              <p>
                Extensive content and resources for Biomedical Engineering diploma.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 animate-fadeIn animate-delay-1100">
              <h3 className="text-xl font-semibold mb-2">Diploma in Electronics and Communication Engineering</h3>
              <p>
                Full range of materials for Electronics and Communication Engineering.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 animate-fadeIn animate-delay-1200">
              <h3 className="text-xl font-semibold mb-2">Diploma in Information and Communication Technology</h3>
              <p>
                In-depth study materials and resources for ICT diploma students.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 animate-fadeIn animate-delay-1300">
              <h3 className="text-xl font-semibold mb-2">Diploma in Instrumentation and Control Engineering</h3>
              <p>
                Essential materials and resources for Instrumentation and Control Engineering.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;
