// HomePage.js
import React from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { useSpring, animated } from 'react-spring';
import YourComponent from "./YourComponent"
import "./blink.css"
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
      <div className="blinker-container">
        <h1 className="text-4xl font-bold mb-4 blinker-tagline">Welcome to Income Tracker</h1>
      </div>
      <p className="text-lg">Track your income and expenses with ease.</p>
    </animated.div>
  </div>

  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDoLAboLp5MUHq3YL8-Jf-I-Z3fmtaO83rGw&usqp=CAU"
      alt="Income Tracker"
      className="w-full md:w-80 h-60 rounded-lg shadow-lg cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out"
    />
    <img
      src="https://visme.co/blog/wp-content/uploads/2021/08/Data-Visualization-thumbnail.jpg"
      alt="Income Tracker"
      className="w-full md:w-80 h-60 rounded-lg shadow-lg cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out"
    />
    <img
      src="https://data.org/wp-content/uploads/2022/01/Data-Visualization-Guide.png"
      alt="Income Tracker"
      className="w-full md:w-80 h-60 rounded-lg shadow-lg cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out"
    />
  </div>


      <YourComponent></YourComponent>
      </div>

      

      
     
  
  );
};

export default HomePage;
