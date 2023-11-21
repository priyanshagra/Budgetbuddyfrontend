// StickyHeader.js
import React, { useState, useEffect } from 'react';

const StickyHeader = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100); // Adjust the scroll threshold as needed
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isSticky ? 'fixed top-0 left-0 right-0 bg-white shadow-md z-50' : ''
      } transition-all duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center py-4">
      <img className="w-20 h-20" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ6J2m5uCDuozY_iSopbiVGRzSiaTTJUN2NSs2q57i6f4FFbTWO5TSYg-HcTRzhZhUOZs&usqp=CAU"  alt="" />
     
        <h1 className=" border-b-4 border-gray-600 text-4xl font-bold text-indigo-800 mb-4">TECH BUDDY(<span className="text-xl text-yellow-500">A product of Team Ganga</span>)</h1>

        <nav className="space-x-4">
          <a href="#home" className="text-2xl text-gray-700 hover:text-gray-900">
            Home
          </a>
          <a href="#about" className=" text-2xl text-gray-700 hover:text-gray-900">
            About
          </a>
          <a href="#contact" className=" text-2xl text-gray-700 hover:text-gray-900">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default StickyHeader;
