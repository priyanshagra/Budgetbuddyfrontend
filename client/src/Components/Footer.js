// Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <p className="text-sm">Committed to providing you with a seamless experience for managing your income and expenses.
</p>
        </div>

        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="list-none p-0">
            <li className="mb-2">
              <a href="#">Home</a>
            </li>
            <li className="mb-2">
              <a href="#">Features</a>
            </li>
            <li className="mb-2">
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-500">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="#" className="text-white hover:text-gray-500">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="#" className="text-white hover:text-gray-500">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="#" className="text-white hover:text-gray-500">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">
            Email: TeamGanga@incometracker.com
            <br />
            Phone:+91 7905434145
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
