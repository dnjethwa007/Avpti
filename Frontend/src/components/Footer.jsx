import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content py-10 mt-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 mb-10 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-OXBEblSf80E%2FXIs6dS_d_NI%2FAAAAAAAAAdg%2FXvLe0EmM368OQJOuv3wbY2QVlsOtJYxGgCK4BGAYYCw%2Fs1600%2Ffacebook_cover_photo_1.png&f=1&nofb=1&ipt=02c8681f83e6cfbf38b0ab9d4b677ae3cfb2734ec0554114486d3a43f9b48c5b&ipo=images" alt="Logo" />
            </h3>
            <p className="text-sm leading-relaxed">
              Material Adda, RAJKOT
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm leading-relaxed">
              <li><a href="/" className="hover:text-pink-500 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-pink-500 transition-colors">About</a></li>
              <li><a href="/course" className="hover:text-pink-500 transition-colors">Courses</a></li>
              <li><a href="/TermsAndConditions" className="hover:text-pink-500 transition-colors">Terms & Conditions</a></li>
              <li><a href="/contact" className="hover:text-pink-500 transition-colors">Contact</a></li>
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
          &copy; {new Date().getFullYear()} Material Adda. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
