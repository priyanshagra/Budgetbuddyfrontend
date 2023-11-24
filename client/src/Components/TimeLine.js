// Timeline.js
import React from 'react';
import "./ss.css"
const Timeline = () => {
  return (
    <div className="ss">
    <div className="container mx-auto mt-0 bg-blue-300">
      <h2 className="flex justify-center mr-10 text-4xl font-bold mb-8">Income Tracker Timeline</h2>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12">
        <div className="md:w-1/3 mb-4 md:mb-0">
          <div className="text-xl font-bold mb-2">Launch of Income Tracker</div>
          <p className="text-gray-600">June 2023</p>
          <p>Income Tracker was officially launched, providing users with a powerful tool to manage their finances.</p>
        </div>

        <div className="md:w-1/3 mb-4 md:mb-0">
          <div className="text-xl font-bold mb-2">Introduction of Budgeting Feature</div>
          <p className="text-gray-600">July 2022</p>
          <p>We introduced a budgeting feature to help users plan and control their expenses more effectively.</p>
        </div>

        <div className="md:w-1/3 mb-4 md:mb-0">
          <div className="text-xl font-bold mb-2">Integration with Financial Institutions</div>
          <p className="text-gray-600">Novemver 2022</p>
          <p>Users can now connect their bank accounts for automatic transaction tracking, making it even easier to stay organized.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12">
        {/* Add more timeline events as needed */}
      </div>
    </div>
    </div>
  );
};

export default Timeline;
