import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaCheckCircle } from 'react-icons/fa'; // Font Awesome icon for success

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showThankYou) {
      // Automatically redirect to home page after 5 seconds
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);

      // Cleanup the timer if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [showThankYou, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get('http://localhost:4001/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('User data response:', response.data);
          
          const userEmail = response.data.user?.email;

          if (userEmail) {
            setFormData((prevState) => ({
              ...prevState,
              email: userEmail,
            }));
          } else {
            console.error('Email not found in response data');
            setStatus('Email not found.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setStatus('Failed to fetch user data.');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await axios.post('http://localhost:4001/contact', formData);
      setStatus(response.data.message);
      setShowThankYou(true);
    } catch (error) {
      console.error('Error sending contact form:', error);
      setStatus('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 relative">
        {!showThankYou ? (
          <>
            <h1 className="text-3xl font-semibold text-center mb-8">Contact Us</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  readOnly={!!formData.email}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                {status && <p className="text-sm text-red-500">{status}</p>}
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Send Message
                </button>
              </div>
            </form>
            <FaCheckCircle className="absolute top-4 right-4 text-green-500 text-5xl" />
          </>
        ) : (
          <div className="text-center py-16">
            <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
            <h1 className="text-3xl font-semibold mb-4">Thank You!</h1>
            <p className="text-lg mb-4">Your message has been sent successfully.</p>
            <p className="mb-4">You will be redirected to the home page shortly.</p>
            <a
              href="/"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Go to Home Page
            </a>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
