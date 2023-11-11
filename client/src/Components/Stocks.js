import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import CoinsTable from "./CoinsTable";
import axios from "axios";
import { useCookies } from "react-cookie";
import { SingleCoin } from "./Config/api";
import { CryptoState } from "./CryptoContext";

const Stocks = () => {
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
    <div class="flex h-screen bg-gray-100 font-poppins antialiased">
      <div
        id="sidebar"
        class="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
        x-show="sidenav"
      >
      <h1>WATCHLIST </h1> 
      <ul role="list" className="divide-y divide-gray-100">
      {datas.map((data1) => (
        <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={data1.data.image.small} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{data1.data.name}</p>
              <p className="text-sm font-semibold leading-6 text-gray-900">price:{symbol}{" "}{data1.data.market_data.current_price[currency.toLowerCase()]}</p>
            </div>
            
          </div>
        </li>
      ))}
    </ul>
      </div>
      <div style={{ backgroundColor: "black" }} className="w-3/4 p-6">
        <Banner />
        <CoinsTable />
      </div> 
    </div>
  );
};

export default Stocks;
