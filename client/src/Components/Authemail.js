import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Authemail = (props) => {
    const [credentials, setCredentials] = useState({ email: ""});
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate("/loading")
        const response = await fetch(
          "http://localhost:8000/api/auth/sendotp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email : credentials.email
            }),
          }
        )
        const json = await response.json();
         if (json.success)
         {
            setCookie("email",credentials.email );
          props.showAlert("otp sent successfully ", "success");
          navigate("/getotp");
         }
          else
          {
            props.showAlert("try sending otp again ", "danger");
            navigate("/");
          }
      };
      const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };





  return (
    <div className='h-screen w-screen flex bg-gradient-to-r from-gray-700 via-gray-300 to-gray-900'>
      <div className="rounded-full border-4 h-80 mt-20 bg-back flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-gray-900 via-gray-400 to-gray-700">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 animate-pulse">
            Sign up to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="pl-1 block text-sm font-medium leading-6 text-gray-900">
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
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Authemail
