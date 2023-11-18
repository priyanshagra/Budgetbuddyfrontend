import React from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Setting = (props) => {


    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    let navigate = useNavigate();
    const deletecache = async () => {
        props.setforlogin2();
        try {
          removeCookie("AuthToken");
          removeCookie("UserId");
          removeCookie("email");
          removeCookie("name");
          removeCookie("pic");
          removeCookie("maxexpense");
          removeCookie("minexpense");
          removeCookie("maxsalary");
          removeCookie("minsalary");
          removeCookie("currency");
          navigate("/");
        } catch (error) {
          console.error("Error clearing cache:", error);
        }
      };

  return (
    <div>
      <button
              class="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg"
              onClick={deletecache}
            >
              Logout
            </button>
    </div>
  )
}

export default Setting
