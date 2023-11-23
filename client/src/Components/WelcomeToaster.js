// WelcomeToaster.js
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './WelcomeToaster.css'; // You can create this file for styling

const WelcomeToaster = () => {
  useEffect(() => {
    toast.info('Welcome to Your Expense Tracker', {
      position: 'top-center',
      autoClose: 5000, // Close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  return null;
};

export default WelcomeToaster;
