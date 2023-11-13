import React, { useState } from "react";

import {
    Container,
    MenuItem,
    AppBar,
    Toolbar,
    Typography,
    Select,
  } from "@material-ui/core";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Onboarding = (props) => {
  const [name, setName] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [maxexpense, setmaxexpense] = useState();
  const [minexpense, setminexpense] = useState();
  const [maxsalary, setmaxsalary] = useState();
  const [minsalary, setminsalary] = useState();
  const [picLoading, setPicLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [ currency, setCurrency ] = useState("INR");
  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !password ||
      !confirmpassword ||
      !pic ||
      !maxexpense ||
      !minexpense ||
      !maxsalary ||
      !minsalary
    ) {
      return;
    }
    if (password !== confirmpassword) {
      return;
    }
    
    navigate("/loading");
    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
        pic: pic,
        maxexpense: maxexpense,
        minexpense: minexpense,
        maxsalary: maxsalary,
        minsalary: minsalary,
        id:cookies.UserId
      }),
    });

    const json = await response.json();
    if (json.success) {
      props.setforlogin(); 
      setCookie("name", name);
      setCookie("pic", pic);
      setCookie("maxexpense", maxexpense);
      setCookie("minexpense", minexpense);
      setCookie("maxsalary", maxsalary);
      setCookie("minsalary", minsalary);
      setCookie("currency", currency);
      props.showAlert(" successfully ", "success");
      props.setDash();
      navigate("/");
    } else {
      props.showAlert("unsuccesfull ", "danger");
      navigate("/onboarding");
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    console.log(cookies.UserId)
    if (pics === undefined) {
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);

        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      setPicLoading(true);
      props.showAlert("choose png image", "danger");
      return;
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={submitHandler}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="cpassword"
                name="cpassword"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setConfirmpassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload your image
              </label>
            </div>
            <div className="mt-2">
              <input
                id="pic"
                name="pic"
                type="file"
                autoComplete="pic"
                required
                onChange={(e) => postDetails(e.target.files[0])}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                style={{ width: 100, height: 40, marginLeft: 15 }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Maximum Salary
              </label>
            </div>
            <div className="mt-2">
              <input
                id="maxsalary"
                name="maxsalary"
                type="number"
                autoComplete="maxsalary"
                required
                onChange={(e) => setmaxsalary(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Minimum Salary
              </label>
            </div>
            <div className="mt-2">
              <input
                id="minsalary"
                name="minsalary"
                type="number"
                autoComplete="minsalary"
                required
                onChange={(e) => setminsalary(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Maximum Expenses
              </label>
            </div>
            <div className="mt-2">
              <input
                id="maxexpense"
                name="maxexpense"
                type="number"
                autoComplete="maxexpense"
                required
                onChange={(e) => setmaxexpense(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Minimum Expenses
              </label>
            </div>
            <div className="mt-2">
              <input
                id="minexpense"
                name="minexpense"
                type="number"
                autoComplete="minexpense"
                required
                onChange={(e) => setminexpense(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={picLoading}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
