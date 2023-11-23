import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "./CryptoContext";
import axios from "axios";
import styled from "styled-components";
import { useGlobalContext } from "./globalcontext";
import History from "./History";
import { InnerLayout } from "./Layouts";
import { dollar } from "./Icons";
import Chart from "./Chart";
import Setting from "./Setting";

const Dashboard = (props) => {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);
  const apiKey = "3b31ded8bd58e51ae49d584cc911c0fc";
  const { currency, symbol } = CryptoState();
  const [exchangeRate, setexchangeRate] = useState(1);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://open.er-api.com/v6/latest/${cookies.currency}?apikey=${apiKey}`
        );
        setexchangeRate(response.data.rates[currency].toFixed(2));
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, [cookies.currency, currency, apiKey]);
  const profileImageURL = cookies.pic;
  console.log(profileImageURL);
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="text-center m-6 rounded-lg  p-2 bg-pink-100 hover:bg-pink-200 transition">
        <h2 className="text-xl font-bold">Total Balance</h2>
        <p className="text-2xl">
          {dollar} {totalBalance()}
        </p>
      </div>
      <div className="flex flex-row justify-center  items-center">
        <div className="text-center m-6 rounded-lg  p-2 bg-pink-100 hover:bg-pink-200 transition">
          <h2 className="text-xl font-bold">Total Income</h2>
          <p className="text-2xl">
            {dollar} {totalIncome()}
          </p>
        </div>

        <div className="text-center m-6 rounded-lg  p-2 bg-pink-100 hover:bg-pink-200 transition">
          <h2 className="text-xl font-bold">Total Expense</h2>
          <p className="text-2xl">
            {dollar} {totalExpenses()}
          </p>
        </div>
      </div>
      <DashboardStyled>
        <InnerLayout>
          <h1>All Transactions</h1>
          <div className="stats-con">
            <div className="chart-con">
              <Chart />
            </div>

            <div className="history-con">
              <History />
              <h2 className="salary-title">
                Min <span>Salary</span>Max
              </h2>
              <div className="salary-item">
                <p>${Math.min(...incomes.map((item) => item.amount))}</p>
                <p>${Math.max(...incomes.map((item) => item.amount))}</p>
              </div>
              <h2 className="salary-title">
                Min <span>Expense</span>Max
              </h2>
              <div className="salary-item">
                <p>${Math.min(...expenses.map((item) => item.amount))}</p>
                <p>${Math.max(...expenses.map((item) => item.amount))}</p>
              </div>
            </div>
          </div>
        </InnerLayout>
      </DashboardStyled>
    </div>
  );
};

const DashboardStyled = styled.div`
  .chart-con {
    height: 400px;
    margin-bottom: 2rem;
    &:hover {
      background: #f0e2e5; /* Change the background color on hover */
    }
  }

  .amount-con {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 2rem;

    .income,
    .expense,
    .balance {
      flex: 1 1 100%;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
      text-align: center;
      margin-bottom: 1rem;

      p {
        font-size: 3.5rem;
        font-weight: 700;
        color: var(--color-green);
        opacity: 0.6;
      }

      &:hover {
        background: #f0e2e5; /* Change the background color on hover */
      }
    }

    .balance {
      margin-top: 0;
    }
  }

  .history-con {
    h2 {
      margin: 1rem 0;
      font-size: 1.5rem;
      span {
        font-size: 1.8rem;
      }
    }

    .salary-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .salary-item {
      background: #fcf6f9;
      border: 2px solid #ffffff;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      padding: 1rem;
      border-radius: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      p {
        font-weight: 600;
        font-size: 1.6rem;
      }

      &:hover {
        background: #f0e2e5; /* Change the background color on hover */
      }
    }
  }
`;

export default Dashboard;
