// ExpenseTrackerFeature.js
import React from 'react';

const ExpenseTrackerFeature = ({ icon, title, description }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 mb-6">
      <div className="text-4xl mb-4 text-indigo-600">{icon}</div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default ExpenseTrackerFeature;
