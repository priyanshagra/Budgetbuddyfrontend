// BeautifulHeadline.js

import React from 'react';

const BeautifulHeadline = () => {
  return (
    <div className="  bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide">Tech Buddy</h1>
        <p className="text-lg font-light leading-loose">Your Smart Expense Tracker</p>
      </div>
      <div className="mt-8">
        <button className="bg-white text-blue-500 px-4 py-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default BeautifulHeadline;
