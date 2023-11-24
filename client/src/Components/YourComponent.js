// Your main component or page
import React from "react";
import ExpenseTrackerFeature from "./ExpenseTrackerFeature";
import "./hv.css";
const YourComponent = () => {
  return (
    <div className=" hv container mx-auto mt-8 ">
      <h1 className="text-3xl font-bold mb-8">Expense Tracker Features</h1>
      <div className=" cursor-pointer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <div className="cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out ">
        <ExpenseTrackerFeature
          icon="💸"
          title="Track Expenses"
          description="Effortlessly log your daily expenses and categorize them for better organization."
          className=" text-blue-900 w-full h-full object-cover transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-x-2 hover:transition-transform duration-300 ease-in-out"
        />
        </div>
        <div className="cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out ">
        <ExpenseTrackerFeature
          icon="📊"
          className="w-full h-full object-cover transition-transform transform group-hover:scale-105"
          title="Visual Insights"
          description="Get clear visualizations and insights into your spending habits with charts and graphs. "
        />
        </div>
        <div className="cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out " >
        <ExpenseTrackerFeature
          icon="🎯"
          className="w-full h-full object-cover transition-transform transform group-hover:scale-105"
          title="Set Budgets"
          description="Set monthly budgets for different expense categories and track your spending goals."
        />
        </div>
        <div className="cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out "><ExpenseTrackerFeature
          icon="🔄"
          className="w-full h-full object-cover transition-transform transform group-hover:scale-105"
          title="Recurring Expenses"
          description="Efficiently manage recurring expenses, such as bills and subscriptions, with automatic reminders."
        /></div>
        <div className="cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out "><ExpenseTrackerFeature
          icon="💡"
          className="cursor-pointer absolute top-0 left-0 w-full h-full object-cover transition-transform transform opacity-0 group-hover:opacity-10"
          title="Smart Suggestions"
          description="Receive intelligent suggestions on potential savings and optimize your spending patterns."
        /></div>
        <div className="cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out "><ExpenseTrackerFeature
          icon="📆"
          className="hover-image"
          title="Expense Calendar"
          description="View and plan your expenses using a dynamic calendar for better financial management."
        /></div>
        <div className="cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out "><ExpenseTrackerFeature
          icon="🔍"
          className="hover-image"
          title="Search and Filters"
          description="Easily search and filter your transactions to find specific expenses or analyze spending trends."
        /></div>
        <div className="cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out "><ExpenseTrackerFeature
          icon="📱"
          className="hover-image"
          title="Mobile Accessibility"
          description="Access your expense tracker anytime, anywhere, with seamless mobile responsiveness."
        /></div>
        
       <div  className="cursor-pointer transform transition-transform group-hover:scale-105 hover:text-blue-500 hover:translate-y-2 hover:transition-transform duration-300 ease-in-out ">
        <ExpenseTrackerFeature
          icon="📈"
          className="hover-image"
          title="Financial Goals"
          description="Set and achieve financial goals by tracking your progress and making informed financial decisions."
        /></div>
        
        {/* Add more features as needed */}
      </div>
    </div>
  );
};

export default YourComponent;
