import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const apiKey = "3b31ded8bd58e51ae49d584cc911c0fc";
  const [exchangeRatei, setexchangeRatei] = useState(1);
  const [exchangeRateu, setexchangeRateu] = useState(1);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `https://open.er-api.com/v6/latest/INR?apikey=${apiKey}`
        );
        const response2 = await axios.get(
            `https://open.er-api.com/v6/latest/USD?apikey=${apiKey}`
          );
        setexchangeRatei(response1.data.rates[currency].toFixed(2));
        setexchangeRateu(response2.data.rates[currency].toFixed(2));
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, [ currency, apiKey]);


  

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol,exchangeRatei, exchangeRateu,isSwitchOn,setIsSwitchOn}}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};