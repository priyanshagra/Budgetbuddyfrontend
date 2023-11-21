import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "./CryptoContext";
import axios from "axios";
import styled from 'styled-components'
import { useGlobalContext } from './globalcontext';
import History from './History';
import { InnerLayout } from './Layouts';
import { dollar } from './Icons';
import Chart from './Chart';
import Setting from "./Setting";

const Dashboard = (props) => {



    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])
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
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchData(); // Call the async function immediately

  }, [cookies.currency, currency, apiKey]);
  const profileImageURL = cookies.pic;
  const name = cookies.name;
  const maxsalary = cookies.maxsalary;
  const minsalary = cookies.minsalary;
  const maxexpense = cookies.maxexpense;
  const minexpense = cookies.minexpense;
  console.log(profileImageURL);
  const navigate = useNavigate();

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  return (
    <div class="flex h-screen bg-gray-100 font-poppins antialiased">
      <div
        id="sidebar"
        class="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
        x-show="sidenav"
      >
        <div class="space-y-6 md:space-y-10 mt-10">
          <h1 class="font-bold text-4xl text-center md:hidden">
            D<span class="text-teal-600">.</span>
          </h1>
          <div id="profile" class="space-y-3">
            <img
              src={profileImageURL}
              alt="Avatar user"
              class="w-10 md:w-16 rounded-full mx-auto"
            />
            <div>
              <h2 class="font-medium text-xs md:text-sm text-center text-teal-500">
              {name}
              </h2>
            </div>
          </div>
          <div id="menu" class="flex flex-col space-y-2">
          <div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    maxincome
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {symbol} {(maxsalary * exchangeRate).toFixed(2)}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    minincome
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {symbol} {(minsalary * exchangeRate).toFixed(2)}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    maxexpense
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {symbol} {(maxexpense * exchangeRate).toFixed(2)}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    minexpense
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {symbol} {(minexpense * exchangeRate).toFixed(2)}
                  </dd>
                </div>
                <div>
                    <Setting/>
                </div>
              </dl>
            </div>
          </div>
          </div>
        </div>
      </div><div className="w-3/4 p-6">
      <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                ${Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p>
                                ${Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                ${Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p>
                                ${Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
      
    
      </div>
    </div>
    //     <div className="flex h-screen bg-gray-100">
    //     {/* Left Sidebar */}
    //     <div className="w-1/4 bg-gray-800 p-6">
    //       <div className="mb-4">
    //         <img
    //           src={profileImageURL}
    //           alt="Profile"
    //           className="rounded-full w-16 h-16 mx-auto"
    //         />
    //       </div>
    //       <ul className="text-white">
    //         <li className="mb-2">Dashboard</li>
    //         <li className="mb-2">Analytics</li>
    //         <li className="mb-2">Settings</li>
    //       </ul>
    //     </div>

    //     {/* Main Content */}
    //     <div className="w-3/4 p-6">
    //     <div>
    //       <div className="px-4 sm:px-0">
    //         <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
    //         <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
    //       </div>
    //       <div className="mt-6 border-t border-gray-100">
    //         <dl className="divide-y divide-gray-100">
    //           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    //             <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
    //             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{name}</dd>
    //           </div>
    //           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    //             <dt className="text-sm font-medium leading-6 text-gray-900">maxincome</dt>
    //             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{maxsalary}</dd>
    //           </div>
    //           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    //             <dt className="text-sm font-medium leading-6 text-gray-900">minincome</dt>
    //             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{minsalary}</dd>
    //           </div>
    //           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    //             <dt className="text-sm font-medium leading-6 text-gray-900">maxexpense</dt>
    //             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{maxexpense}</dd>
    //           </div>
    //           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    //             <dt className="text-sm font-medium leading-6 text-gray-900">minexpense</dt>
    //             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{minexpense}</dd>
    //           </div>
    //         </dl>
    //       </div>
    //     </div>
    //     </div>
    //   </div>
  );
};


const DashboardStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard;
