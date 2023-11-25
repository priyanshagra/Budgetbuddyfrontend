import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import CoinsTable from "./CoinsTable";
import axios from "axios";
import { useCookies } from "react-cookie";
import { SingleCoin } from "./Config/api";
import { CryptoState } from "./CryptoContext";

const Stocks = () => {
  const { isSwitchOn, setIsSwitchOn } = CryptoState();

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const datainitial = [];
    const [datas, setdata] = useState(datainitial);
    const { currency, symbol } = CryptoState();
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:8000/api/stocks/fetchallstocks",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "auth-token": cookies.UserId,
              },
            }
          );
    
          const json = await response.json();
    
          const newData = await Promise.all(
            json.stock.map(async (orders) => {
              const data = await axios.get(SingleCoin(orders.coinid));
              return data;
            })
          );
    
          setdata((prevData) => [...prevData, ...newData]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, [cookies.UserId]);
 
    console.log(datas)
  return (
      <div className={`${isSwitchOn?"bg-black":"bg-white"}`}>
        <Banner />
        <CoinsTable />
      </div> 
   
  );
};

export default Stocks;
