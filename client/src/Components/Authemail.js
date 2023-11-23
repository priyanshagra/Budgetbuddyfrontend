import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Authemail = () => {
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up to your account
        </h2>
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
              className="block text-sm font-medium leading-6 text-gray-900"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authemail;
