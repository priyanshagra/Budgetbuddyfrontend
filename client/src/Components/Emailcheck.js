import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import logo from "./budgetbuddysignin.jpeg";
import { useToast } from "@chakra-ui/react";
import { CryptoState } from "./CryptoContext";

const Emailcheck = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const { isSwitchOn } = CryptoState();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/loading");
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      setCookie("AuthToken", json.authtoken);
      setCookie("UserId", json.id);
      setCookie("email", credentials.email);
      setCookie("name", json.name);
      setCookie("pic", json.pic);
      toast({
        title: "Welcome",
        description: "login successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      navigate("/");
      window.location.reload();
    } else {
      toast({
        title: "Error Occured!",
        description: "Failed to login",
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
      className={`min-h-screen ${
        isSwitchOn
          ? "bg-gradient-to-r from-neutral-400 via-white to-neutral-400"
          : "bg-gradient-to-r from-gray-700 via-black to-gray-700"
      } flex items-center justify-center`}
    >
      <div
        className={`sm:mx-auto sm:w-full sm:max-w-sm ${
          isSwitchOn
            ? "bg-gradient-to-r from-neutral-400 via-white to-neutral-400"
            : "bg-gradient-to-r from-gray-700 via-black to-gray-700"
        } h-screen rounded-full m-5 p-8 shadow-lg`}
      >
        <h2 className="text-center text-4xl font-bold text-white mt-6 mb-6 animate-pulse">
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
          Sign in
        </h2>

        <div className="flex flex-row justify-center items-center">
          <div className={`rounded-lg p-2 transition`}>
            <img src={logo} alt="" className="h-20 w-20" />
          </div>
        </div>

        <div
          className={`rounded-lg p-2 ${
            isSwitchOn ? "hover:bg-neutral-500" : "hover:bg-gray-900"
          } sm:mx-auto sm:w-full sm:max-w-smtransition`}
        >
          {/* <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-white text-white text-4xl font-bold animate-pulse">
            Sign in to your account
          </h2> */}

          <form
            className="mt-6 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className={`ml-1 ${
                  isSwitchOn ? "text-gray-100" : "text-white"
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className={`ml-1 ${
                    isSwitchOn ? "text-gray-100" : "text-white"
                  } block text-sm font-medium leading-6 text-gray-900`}
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/forgotpassword"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={credentials.password}
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
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Emailcheck;
