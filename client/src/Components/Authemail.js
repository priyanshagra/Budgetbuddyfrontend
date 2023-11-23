import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import logo from "./budgetbuddysignin.jpeg";
import { useToast } from "@chakra-ui/react";

const Authemail = (props) => {
  const [credentials, setCredentials] = useState({ email: "" });
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const toast = useToast();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/loading");
    const response = await fetch("http://localhost:8000/api/auth/sendotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
      }),
    });
    const json = await response.json();
    if (json.success) {
      setCookie("email", credentials.email);
      toast({
        title: "otp sent successfully",
        description: "6 digit uniicode",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      navigate("/getotp");
    } else {
      toast({
        title: "Error Occured!",
        description: "Failed to sent otp",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      navigate("/");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen w-screen flex bg-gradient-to-r from-gray-700 via-gray-300 to-gray-900">
      <div className="rounded-full border-4 h-90 bg-back flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-gray-900 via-gray-400 to-gray-700">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 animate-pulse">
            <span className="text-green-700">Budget Buddy</span>
          </h2>

        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up
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
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={credentials.email}
                  onChange={onChange}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authemail;
