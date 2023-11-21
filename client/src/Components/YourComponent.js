// Your main component or page
import React from 'react';
import ExpenseTrackerFeature from './ExpenseTrackerFeature';

const YourComponent = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8">Expense Tracker Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ExpenseTrackerFeature
          icon="💸"
          title="Track Expenses"
          description="Effortlessly log your daily expenses and categorize them for better organization."
        />
        <ExpenseTrackerFeature
          icon="📊"
          title="Visual Insights"
          description="Get clear visualizations and insights into your spending habits with charts and graphs."
        />
        <ExpenseTrackerFeature
          icon="🎯"
          title="Set Budgets"
          description="Set monthly budgets for different expense categories and track your spending goals."
        />
        <ExpenseTrackerFeature
          icon="🔄"
          title="Recurring Expenses"
          description="Efficiently manage recurring expenses, such as bills and subscriptions, with automatic reminders."
        />
        <ExpenseTrackerFeature
          icon="💡"
          title="Smart Suggestions"
          description="Receive intelligent suggestions on potential savings and optimize your spending patterns."
        />
         <ExpenseTrackerFeature
          icon="📆"
          title="Expense Calendar"
          description="View and plan your expenses using a dynamic calendar for better financial management."
        />
        <ExpenseTrackerFeature
          icon="🔍"
          title="Search and Filters"
          description="Easily search and filter your transactions to find specific expenses or analyze spending trends."
        />
         <ExpenseTrackerFeature
          icon="📱"
          title="Mobile Accessibility"
          description="Access your expense tracker anytime, anywhere, with seamless mobile responsiveness."
        />
        <ExpenseTrackerFeature
          icon="🔒"
          title="Secure and Private"
          description="Ensure the security and privacy of your financial data with robust encryption and authentication."
        />
        <ExpenseTrackerFeature
          icon="📈"
          title="Financial Goals"
          description="Set and achieve financial goals by tracking your progress and making informed financial decisions."
        />
        {/* Add more features as needed */}
      </div>
    </div>
  );
};

export default YourComponent;
