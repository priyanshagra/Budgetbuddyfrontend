import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useGlobalContext } from "./globalcontext";

function Form() {
  const { addIncome } = useGlobalContext;
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(inputState);
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name={"title"}
                  placeholder="salary-title"
                  onChange={handleInput("title")}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
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
      <div className="input-control">
        <input
          type="text"
          name={"title"}
          placeholder="salary-title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          name={"amount"}
          placeholder="salary-amount"
          onChange={handleInput("amount")}
        />
      </div>

      <div className="select input-control">
        <select
          required
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="">select option</option>
          <option value="salary">salary</option>
          <option value="other">other</option>
        </select>
      </div>
      <div className="submit-btn">
        <button>add income</button>
      </div>
    </div>
  );
}

export default Form;
