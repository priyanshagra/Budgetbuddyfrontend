import React from "react";
import Banner from "./Banner";
import CoinsTable from "./CoinsTable";
import Header from "./Header";

const Stocks = () => {
  return (
    <div style={{backgroundColor:"black"}} >
      <Header/>
      <Banner/> 
      <CoinsTable/>
      
    </div>
  );
};

export default Stocks;

