import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import logo from './budgetbuddysignin.jpeg'

const Getotp = () => {
  const [credentials, setCredentials] = useState({ otp: "" });
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const toast = useToast();
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    navigate("/loading");
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/getotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: credentials.otp,
      }),
    });
    const json = await response.json();
    if (json.success) {

      toast({
        title: "Congratulation",
        description: "Otp is correct",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      const response1 = await fetch(
        "http://localhost:8000/api/auth/createuser2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cookies.email,
          }),
        }
      );
      const json = await response1.json();
      console.log(json);
      if (json.success) {
        setCookie("AuthToken", json.authtoken);
        setCookie("UserId", json.id);
        toast({
            title: "Welcome",
            description: "signup successfull",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        navigate("/onboarding");
      } else {
        toast({
            title: "Error Occured!",
            description: "signup unsuccessfull",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        navigate("/")
      }
    } else {
      toast({
        title: "Error Occured!",
        description: "Otp is incorrect",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      navigate("/authemail");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="h-screen w-screen flex bg-gradient-to-r from-gray-700 via-gray-300 to-gray-900">
        <div className="rounded-full border-4 h-90 bg-back flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-gray-900 via-gray-400 to-gray-700">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            AUTHENTICATION SYSTEM
            </h2>
            <h2 className="mb-10 text-center text-2xl font-bold leading-9 animate-pulse tracking-tight text-gray-900 animate-pulse">
              <span className="text-green-700">Budget Buddy</span>
            </h2>
            <div className="flex flex-row justify-center items-center mb-8">
              <img src={logo} alt="" className="h-60 w-50 m-2" />
            </div>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="pl-1 block text-sm font-medium leading-6 text-gray-900"
              >
                Enter OTP HERE
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="otp"
                  id="otp"
                  value={credentials.otp}
                  aria-describedby="emailHelp"
                  required
                  onChange={onChange}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black hover:bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ENTER
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Getotp;
