import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useGlobalContext } from "./globalcontext";
import datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function Form() {
  const { addIncome } = useGlobalContext();
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
            Enter you Income details
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              ></label>
              <div className="mt-2">
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
              <div className="input-control">
                <input
                  type="text"
                  name={"type"}
                  placeholder="salary-type"
                  onChange={handleInput("type")}
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
              {/* <div className="input-control">
                <input
                  type="date"
                  name={"date"}
                  placeholder="Enter a date"
                  dateFormat="dd/mm/yyyy"
                  onChange={(date) => {
                    setInputState({...inputState , date: date})
                  }}
                />
              </div> */}
              <div className="input-control">
                <input
                  type="date"
                  name={"date"}
                  placeholder="Enter a date"
                  dateFormat="dd/mm/yyyy"
                  onChange={handleInput("date")}
                />
              </div>
              <div className="input-control">
                <input
                  type="text"
                  name={"description"}
                  placeholder="Description of your income"
                  onChange={handleInput("description")}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Income
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
