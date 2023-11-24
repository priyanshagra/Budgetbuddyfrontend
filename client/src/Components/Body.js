// HomePage.js
import React from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { useSpring, animated } from 'react-spring';
import YourComponent from "./YourComponent"
import "./blink.css"
import Animation from "./Animation"
const HomePage = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <>
    
    
    <div className="m-10 text-white  flex flex-col items-center justify-center">
  {

  /* <div className="text-center mb-8">
    <animated.div style={fadeIn}>
      <div className="blinker-container">
        <h1 className="text-4xl font-bold mb-4 blinker-tagline">Welcome to Income Tracker</h1>
      </div>
      <p className="text-lg"><h1>Track your income and expenses with ease</h1>.</p>
    </animated.div>
  </div>
  <div className=" bg-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
  Simple way
to manage personal finances
  </div> */}
  

  <div className="  ajjeb flex  flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
    <div>
    <img
      src="https://moneylover.me/img/introfeature/1.svg"
      alt="Income Tracker"
      className=" bg-gray-100  w-full md:w-80 h-60 rounded-lg shadow-lg cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out"
      
    />
    <h1 className="ml-20  text-3xl font-bold text-yellow-400 "> 100% Secure</h1>
    </div>
    
    <div>
    <img
      src="https://moneylover.me/img/introfeature/2.svg"
      alt="Income Tracker"
      className=" bg-gray-100  w-full md:w-80 h-60 rounded-lg shadow-lg cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out"
    />
    <h1 className="ml-20  text-3xl font-bold text-yellow-400 ">1 Million+ users</h1>
    </div>
    <div>
    <img
      src="https://moneylover.me/img/introfeature/3.svg"
      alt="Income Tracker"
      className=" bg-gray-100  w-full md:w-80 h-60 rounded-lg shadow-lg cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out"
    />
    <h1 className="ml-19  text-3xl font-bold text-yellow-400 ">100K+ 5-star Reviews</h1>
    </div>
    <div>
    <img
      src="https://moneylover.me/img/introfeature/4.svg"
      alt="Income Tracker"
      className=" bg-gray-100  w-full md:w-80 h-60 rounded-lg shadow-lg cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out"
    />
    <h1 className="ml-20  text-3xl font-bold text-yellow-400 ">App of the Day</h1>
    </div>
  </div>


      
      </div>
      
      <YourComponent></YourComponent>
      </>

      

      
     
  
  );
};

export default HomePage;
