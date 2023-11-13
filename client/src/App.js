import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {useCookies} from "react-cookie";
import Signup from './Components/Signup';
import Emailcheck from './Components/Emailcheck.js';
import Friends from './Components/Friends.js';
import Group from './Components/Group.js';
import Income from './Components/Income.js';
import Expenses from './Components/Expenses.js';
import Authemail from './Components/Authemail.js';
import Forgotpassword from './Components/Forgotpassword.js';
import Onboarding from './Components/Onboarding.js';
import Dashboard from './Components/Dashboard.js';
import Loading from './Components/Loading.js';
import Alert from './Components/Alert.js';
import { useState } from 'react';
import Getotp from './Components/Getotp.js';
import Stocks from './Components/Stocks.js';
import CoinPage from './Components/Coinpage.js';

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const global=useGlobalContext()
    console.log(global)

    const [alert,setAlert] = useState(null);
    const [login,setlogin] = useState(false);
    const [dash,setdash] = useState(false);

    const showAlert =(message,type)=>
  { 
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },3000);

  }


  const setforlogin2=() =>
  {
    setlogin(false);
  }


  const setDash =()=>{
    setdash(true)
  }
  return (
    
      <BrowserRouter>
       <Alert alert={alert}/>
      {(login||cookies.name)&&<Header dash={dash}/>} 

        <Routes>
            {(login||cookies.name)?<Route path="/" element={<Dashboard  setforlogin2={setforlogin2}/>}/>:
                <Route path="/" element={<Signup showAlert={showAlert} setforlogin={setforlogin}/>}/>
            }
          <Route path="/emailcheck" element={<Emailcheck showAlert={showAlert} setforlogin={setforlogin}/>}/>
          <Route path="/authemail" element={<Authemail showAlert={showAlert}/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route path="/groups" element={<Group/>}/>
          <Route path="/income" element={<Income/>}/>
          <Route path="/expenses" element={<Expenses/>}/>
          <Route path="/forgotpassword" element={<Forgotpassword  showAlert={showAlert}/>}/>
          <Route path="/onboarding" element={<Onboarding  showAlert={showAlert} setDash={setDash} setforlogin={setforlogin}/>}/>
          
          <Route path="/loading" element={<Loading/>}/>
          <Route path="/getotp" element={<Getotp  showAlert={showAlert} />}/>
          <Route path="/stocks" element={<Stocks showAlert={showAlert}/>}/>
          <Route path="/coins/:id" element={<CoinPage showAlert={showAlert} />} />
        </Routes>
      </BrowserRouter>
  )
}
export default App;