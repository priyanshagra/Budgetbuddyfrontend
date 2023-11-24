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
  const { isSwitchOn, setIsSwitchOn } = CryptoState();
  const { currency, symbol } = CryptoState();
  const [exchangeRate, setexchangeRate] = useState(1);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const profileImageURL = cookies.pic;
  console.log(profileImageURL);
  const navigate = useNavigate();

  return (
    <div className={`${
      isSwitchOn
        ? "bg-gradient-to-r from-neutral-400 via-white to-neutral-400"
        : "bg-gradient-to-r from-gray-700 via-black to-gray-700"
    }`}>
      <div className={`text-center rounded-lg ${isSwitchOn?"bg-gray-200 hover:bg-gray-300 text-gray-800":"text-white bg-gray-700 hover:bg-gray-800"} p-2 transition`}>
        <h2 className="text-xl font-bold">Total Balance</h2>
        <p className="text-2xl">
          {dollar} {totalBalance()}
        </p>
      </div>
      <div className="flex flex-row justify-center  items-center">
        <div className={`text-center m-6 rounded-lg  p-2 ${isSwitchOn?"bg-gray-200 hover:bg-gray-300 text-gray-800":"text-white bg-gray-700 hover:bg-gray-800"} p-2 transition`}>
          <h2 className="text-xl font-bold">Total Income</h2>
          <p className="text-2xl">
            {dollar} {totalIncome()}
          </p>
        </div>

        <div className={`text-center m-6 rounded-lg  p-2 ${isSwitchOn?"bg-gray-200 hover:bg-gray-300 text-gray-800":"text-white bg-gray-700 hover:bg-gray-800"} transition`}>
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
            <div className={`${isSwitchOn?"bg-gray-300 hover:bg-gray-400 text-gray-800":"text-white bg-gray-700 hover:bg-gray-800"} chart-con`}>
              <Chart />
            </div>

            <div className="history-con">
              <History />
              <h2 className={`${isSwitchOn?"text-gray-800":"text-white"} salary-title`}>
                Min <span>Salary</span>Max
              </h2>
              <div className={`${isSwitchOn?"bg-gray-300 hover:bg-gray-400 text-gray-800":"text-white bg-gray-700 hover:bg-gray-800"} salary-item`}>
                <p>${Math.min(...incomes.map((item) => item.amount))}</p>
                <p>${Math.max(...incomes.map((item) => item.amount))}</p>
              </div>
              <h2 className={`${isSwitchOn?"text-gray-800":"text-white"} salary-title`}>
                Min <span>Expense</span>Max
              </h2>
              <div className={`${isSwitchOn?"bg-gray-300 hover:bg-gray-400 text-gray-800":"text-white bg-gray-700 hover:bg-gray-800"} salary-title`}>
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

    }
  }
`;

export default Dashboard;
