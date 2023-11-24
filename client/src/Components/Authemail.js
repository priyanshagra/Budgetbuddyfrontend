import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import logo from "./budgetbuddysignin.jpeg";
import { useToast } from "@chakra-ui/react";
import { CryptoState } from "./CryptoContext";

const Authemail = (props) => {
  const { isSwitchOn, setIsSwitchOn } = CryptoState();
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
    <div
      className={`h-screen w-screen flex ${
        isSwitchOn
          ? "bg-gradient-to-r from-neutral-400 via-white to-neutral-400"
          : "bg-gradient-to-r from-gray-700 via-black to-gray-700"
      }`}
    >
      <div
        className={`rounded-full border-2 h-90 bg-back flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${
          isSwitchOn
            ? "bg-gradient-to-r from-neutral-400 via-white to-neutral-400"
            : "bg-gradient-to-r from-gray-700 via-black to-gray-700"
        }`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 animate-pulse">
            <span
              className={`${isSwitchOn ? "text-green-800" : "text-green-400"}`}
            >
              Budget Buddy
            </span>
          </h2>

          <h2
            className={`text-center text-2xl font-bold ${
              isSwitchOn ? "text-grey-100" : "text-gray-200"
            } mb-6`}
          >
            Sign up
          </h2>

          <div className="flex flex-row justify-center items-center mb-8">
            <img src={logo} alt="" className="h-60 w-50 m-2" />
          </div>
        </div>
        <div
          className={`rounded-lg p-2 ${
            isSwitchOn ? "hover:bg-neutral-500" : "hover:bg-gray-900"
          } sm:mx-auto sm:w-full sm:max-w-sm transition`}
        >
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className={`ml-1 ${
                  isSwitchOn ? "text-gray-200" : "text-white"
                } block text-sm font-medium leading-6 text-gray-900`}
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
                  className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                    isSwitchOn ? "focus:ring-gray-300" : "focus:ring-indigo-600"
                  } sm:text-sm sm:leading-6`}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`px-6 py-3 bg-blue-500 text-white border border-white rounded-md transition-opacity hover:opacity-75 focus:outline-none focus:shadow-outline-blue flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
                  isSwitchOn
                    ? "bg-neutral-500 hover:bg-neutral-400"
                    : "bg-gray-900 hover:bg-gray-700"
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
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
