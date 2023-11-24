// Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className=" text-yellow-400 text-lg font-semibold mb-2">About Us</h3>
          <p class=" font-bold text-sm leading-relaxed">
                    Expense Tracker is dedicated to simplifying your financial management. 
                    Our mission is to provide you with a user-friendly platform to track 
                    and manage your expenses efficiently. Whether you're an individual or a 
                    business, we've got the tools you need to stay on top of your finances.
                </p>
               
        </div>

        
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className=" text-yellow-400 text-lg font-semibold mb-2">Follow Us</h3>
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

        <div className=" font-bold w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className=" text-yellow-400 text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">
            Email: TeamGanga@incometracker.com
            <br />
            Phone:+91 7905434145
          </p>
        </div>
      </div>
      <div><p className=" text-yellow-400 flex justify-center text-lg">© 2023 Tech Ganga Technology Co., Ltd. All rights reserved.</p></div>
    </footer>
  );
};

export default Footer;
