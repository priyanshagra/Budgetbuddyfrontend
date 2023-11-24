import React from 'react';
import jsPDF from 'jspdf';
import { CryptoState } from './CryptoContext';

const DownloadPDFButton = ({ jsonData }) => {

    const { currency,symbol,exchangeRatei,exchangeRateu } = CryptoState();
  const { isSwitchOn, setIsSwitchOn } = CryptoState();

  const handleDownload = () => {
    const pdf = new jsPDF();
    pdf.text(10, 10, 'Expenses till Now');
    for( let i=0;i<jsonData.length;i++)
    {
        pdf.text(10, 20+i*10, `${i+1}. ${jsonData[i].title} - ${currency} ${(jsonData[i].currency=="INR"?jsonData[i].amount*exchangeRatei:jsonData[i].amount*exchangeRateu).toFixed(2)}`);
    }
    // Add your content here
    
    pdf.text(10, 20+jsonData.length*10, `Thank you from Budget Buddy`);

    // Save the PDF
    pdf.save('output.pdf');
  };

  return (
    <button className={`px-6 py-3 bg-blue-500 text-white border border-white rounded-md transition-opacity hover:opacity-75 focus:outline-none focus:shadow-outline-blue flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
      isSwitchOn
        ? "bg-neutral-500 hover:bg-neutral-400"
        : "bg-gray-900 hover:bg-gray-700"
    } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`} onClick={handleDownload}>Download Expense Report</button>
  );
};

export default DownloadPDFButton;
