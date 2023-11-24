import React from 'react';
import jsPDF from 'jspdf';
import { CryptoState } from './CryptoContext';

const DownloadPDFButton = ({ jsonData }) => {

    const { currency,symbol,exchangeRatei,exchangeRateu } = CryptoState();
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
    <button className="flex w-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleDownload}>Download Expense Report</button>
  );
};

export default DownloadPDFButton;
