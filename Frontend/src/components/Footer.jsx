import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content py-10 mt-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 mb-10 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <img src="http://www.avpt.cteguj.in/uploads/4732/logo.png" alt="Logo" />
            </h3>
            <p className="text-sm leading-relaxed">
              A. V. PAREKH TECHNICAL INSTITUTE, RAJKOT
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm leading-relaxed">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/course" className="hover:text-white transition-colors">Courses</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm leading-relaxed flex items-start">
              <FaMapMarkerAlt className="mr-2 mt-1" /> Tagore Road, Opp. Hemu Gadhavi Hall, Rajkot - 360001
            </p>
            <p className="text-sm leading-relaxed flex items-start">
              <FaPhoneAlt className="mr-2 mt-1" /> +91 912812480175
            </p>
            <p className="text-sm leading-relaxed flex items-start">
              <FaEnvelope className="mr-2 mt-1" /> avpti-rajkot-dte@gujarat.gov.in
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <FaFacebook size="1.5em" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaTwitter size="1.5em" />
              </a>
              <a href="#" className="hover:text-blue-700 transition-colors">
                <FaLinkedin size="1.5em" />
              </a>
              <a href="#" className="hover:text-pink-600 transition-colors">
                <FaInstagram size="1.5em" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500">
          &copy; {new Date().getFullYear()} A. V. PAREKH TECHNICAL INSTITUTE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
