import React from 'react';
import Terms from '../assets/Terms.jpeg';
import Navbar from './Navbar';
import Footer from './Footer';

const TermsAndConditions = () => {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] mt-[100px]">
        <img
          src={Terms}
          alt="Terms and Conditions"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center p-4">
          <div className="text-center text-[#ff027c]">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              Terms and Conditions
            </h1>
            <p className="text-sm md:text-lg mb-6">
              Please read these terms and conditions carefully before using our website.
            </p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Content */}
      <div className="py-10 md:py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Terms and Conditions
          </h2>
          <p className="mb-6">
            Welcome to [Your Website Name]. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. If you do not agree with any part of these terms, you must not use our website.
          </p>

          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            1. Introduction
          </h3>
          <p className="mb-6">
            These Terms and Conditions govern your use of our website and services. By accessing our website, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
          </p>

          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            2. Use of Our Website
          </h3>
          <p className="mb-6">
            You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of others or restrict or inhibit anyone else's use and enjoyment of the website.
          </p>

          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            3. Intellectual Property
          </h3>
          <p className="mb-6">
            All content and materials on our website, including but not limited to text, images, and logos, are the property of [Your Website Name] and are protected by intellectual property laws. You may not use, reproduce, or distribute any content from our website without our express written consent.
          </p>

          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            4. User Accounts
          </h3>
          <p className="mb-6">
            If you create an account on our website, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            5. Disclaimers and Limitation of Liability
          </h3>
          <p className="mb-6">
            Our website and services are provided "as is" without any warranties or representations, express or implied. We do not warrant that our website will be available at all times or that it will be free from errors or viruses. To the maximum extent permitted by law, we exclude all liability for any loss or damage arising from your use of our website.
          </p>

          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            6. Changes to Terms
          </h3>
          <p className="mb-6">
            We may update these Terms and Conditions from time to time. Any changes will be posted on this page, and it is your responsibility to review these terms periodically.
          </p>

          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            7. Contact Us
          </h3>
          <p className="mb-6">
            If you have any questions about these Terms and Conditions or our website, please contact us at [Your Contact Email].
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
