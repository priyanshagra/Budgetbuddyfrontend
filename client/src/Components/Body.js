// HomePage.js
import React from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { useSpring, animated } from 'react-spring';

const HomePage = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <animated.div style={fadeIn}>
          <h1 className="text-4xl font-bold mb-4">Welcome to Income Tracker</h1>
          <p className="text-lg">Track your income and expenses with ease.</p>
        </animated.div>
      </div>

      <div className="flex justify-center items-center mb-8">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDoLAboLp5MUHq3YL8-Jf-I-Z3fmtaO83rGw&usqp=CAU"  // Add the path to your image
          alt="Income Tracker"
          className="rounded-lg shadow-lg"
        />
      </div>

      <ScrollLink to="scroll-target" smooth={true} duration={500}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Scroll Down
        </button>
      </ScrollLink>

      {/* Add a scroll target */}
      <div id="scroll-target" className="h-96"></div>

      {/* Remaining content for your homepage */}
      <div className="mt-8">
        {/* Add your remaining content here */}
      </div>
    </div>
  );
};

export default HomePage;
