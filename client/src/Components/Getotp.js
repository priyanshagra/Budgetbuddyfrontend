import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Getotp = (props) => {
  const [credentials, setCredentials] = useState({ otp: "" });
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
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
      props.showAlert("Otp is correct", "success");
      const response1 = await fetch(
        "http://localhost:8000/api/auth/createuser2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email : cookies.email
          }),
        }
      )
      const json = await response1.json();
      console.log(json);
      if (json.success) {
        setCookie("AuthToken", json.authtoken);
        setCookie("UserId", json.id);
        props.showAlert(" signup successfull", "success");
        props.setforlogin();
        navigate("/onboarding");
      } else {
        props.showAlert("signup unsuccessfull", "danger");
        navigate("/")
      }
    } else {
      props.showAlert("Otp is incorrect ", "danger");
      navigate("/authemail");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            BUDGET BUDDY AUTHENTICATION SYSTEM
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ENTER
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Getotp;
