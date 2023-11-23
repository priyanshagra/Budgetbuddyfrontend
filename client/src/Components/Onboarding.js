import React, { useState } from "react";
import logo from './budgetbuddysignin.jpeg'

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
import { useToast } from "@chakra-ui/react";

const Onboarding = () => {
  const [name, setName] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  let navigate = useNavigate();
  const toast = useToast();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !password || !confirmpassword || !pic) {
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
        id: cookies.UserId,
      }),
    });

    const json = await response.json();
    if (json.success) {
      setCookie("name", name);
      setCookie("pic", pic);
      toast({
        title: "Welcome",
        description: "onboarding successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      window.location.reload();
      navigate("/");
    } else {
      toast({
        title: "Error Occured!",
        description: "unsuccesfull onboarding try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      navigate("/onboarding");
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    console.log(cookies.UserId);
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
      toast({
        title: "Error Occured!",
        description: "Please upload png image",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-stone-800 via-stone-400 to-neutral-700">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-neutral-200 h-full m-5 p-8 shadow-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register to
          </h2>
          <h2 className="text-center text-4xl font-bold text-white mb-6 animate-pulse">
        <span className="text-green-700">Budget Buddy</span>
        </h2>
        </div>

          <div className="flex flex-row justify-center items-center">
            <div className="rounded-lg p-2 bg-pink-100 hover:bg-black transition">
              <img src={logo} alt="" className="h-20 w-20" />
            </div>
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
                className="pl-1 block text-sm font-medium leading-6 text-gray-900"
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
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="pl-1 block text-sm font-medium leading-6 text-gray-900"
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
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="pl-1 block text-sm font-medium leading-6 text-gray-900"
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
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="pl-1 block text-sm font-medium leading-6 text-gray-900"
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
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-500 hover:bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={picLoading}
              >
                Register
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
