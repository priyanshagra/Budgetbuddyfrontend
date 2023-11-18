import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "./CryptoContext";
import axios from "axios";

const Dashboard = (props) => {
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
  const deletecache = async () => {
    props.setforlogin2();
    try {
      removeCookie("AuthToken");
      removeCookie("UserId");
      removeCookie("email");
      removeCookie("name");
      removeCookie("pic");
      removeCookie("maxexpense");
      removeCookie("minexpense");
      removeCookie("maxsalary");
      removeCookie("minsalary");
      
      navigate("/");
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  };

  
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
              </dl>
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className="w-3/4 p-6">
    
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

export default Dashboard;
