import React, { useState } from "react";
import logo from "./budgetbuddysignin.jpeg";

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
import { CryptoState } from "./CryptoContext";

const Onboarding = () => {
  const { isSwitchOn, setIsSwitchOn } = CryptoState();
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
        toast({
            title: "Error Occured!",
            description: "unsuccesfull onboarding try again",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
      return;
    }
    if (password !== confirmpassword) {
        toast({
            title: "Error Occured!",
            description: "unsuccesfull onboarding try again",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
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
      navigate("/");
      window.location.reload();
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
            
        <h2 className="text-center text-4xl font-bold text-white animate-pulse">
              <span
                className={`${
                  isSwitchOn ? "text-green-800" : "text-green-400"
                }`}
              >
                Budget Buddy
              </span>
            </h2>
            <h2
              className={`text-center text-2xl m-2 font-bold ${
                isSwitchOn ? "text-grey-100" : "text-gray-200"
              } `}
            >
              Register to Us
            </h2>
          </div>


          <div className={`rounded-lg p-2 ${
            isSwitchOn ? "hover:bg-neutral-500" : "hover:bg-gray-900"
          } sm:mx-auto sm:w-full sm:max-w-sm transition`}>
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={submitHandler}
            >
              <div>
                <label
                  htmlFor="email"
                  className={`ml-1 ${
                    isSwitchOn ? "text-gray-200" : "text-white"
                  } block text-sm font-medium leading-6 text-gray-900`}
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
                    className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                      isSwitchOn
                        ? "focus:ring-gray-300"
                        : "focus:ring-indigo-600"
                    } sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className={`ml-1 ${
                      isSwitchOn ? "text-gray-200" : "text-white"
                    } block text-sm font-medium leading-6 text-gray-900`}
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
                    className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                      isSwitchOn
                        ? "focus:ring-gray-300"
                        : "focus:ring-indigo-600"
                    } sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className={`ml-1 ${
                      isSwitchOn ? "text-gray-200" : "text-white"
                    } block text-sm font-medium leading-6 text-gray-900`}
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
                    className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                      isSwitchOn
                        ? "focus:ring-gray-300"
                        : "focus:ring-indigo-600"
                    } sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className={`ml-1 ${
                      isSwitchOn ? "text-gray-200" : "text-white"
                    } block text-sm font-medium leading-6 text-gray-900`}
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
                    className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                      isSwitchOn
                        ? "focus:ring-gray-300"
                        : "focus:ring-indigo-600"
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
