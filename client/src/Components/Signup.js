import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {gapi} from "gapi-script";
import { GoogleLogin } from "react-google-login";
import { useCookies } from "react-cookie";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ email: "" });
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  let navigate = useNavigate();
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({
        clientId:
          "504611249331-3l8vq2l7k662aof3rllqu4ldeo9cr535.apps.googleusercontent.com",
      });
    });
  }, []);
  const failure=(error)=>{
    console.log(error);
  }
  const responseGoogle = async (response) => {

    console.log(response)
    navigate("/loading");
    const response1 = await fetch(
      "http://localhost:8000/api/auth/createusergoogle",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: response.profileObj.name,
          email: response.profileObj.email,
        }),
      }
    );
    const json = await response1.json();
    console.log(json);
    if (json.success) {
      setCookie("AuthToken", json.authtoken);
      setCookie("UserId", json.id);
      props.showAlert("Google signup successfull", "success");
      navigate("/onboarding");
    } else {
      props.showAlert("Goggle signup unsuccessfull", "danger");
      navigate("/")
    }
  };

  return (
    <div>
      <button className="flex w-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <Link to="/emailcheck">Login</Link>
      </button>
      <button className="flex w-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <Link to="/authemail">Signup</Link>
      </button>
      <GoogleLogin
              clientId="504611249331-3l8vq2l7k662aof3rllqu4ldeo9cr535.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={responseGoogle}
              onFailure={failure}
              cookiePolicy={"single_host_origin"}
              
            />
    </div>
  );
};

export default Signup;
