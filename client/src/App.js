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

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])



    const authToken = cookies.AuthToken


  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="/emailcheck" element={<Emailcheck/>}/>
          <Route path="/authemail" element={<Authemail/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route path="/groups" element={<Group/>}/>
          <Route path="/income" element={<Income/>}/>
          <Route path="/expenses" element={<Expenses/>}/>
          <Route path="/forgotpassword" element={<Forgotpassword/>}/>
          <Route path="/onboarding" element={<Onboarding/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
  )
}


export default App;