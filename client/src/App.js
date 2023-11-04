import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {useCookies} from "react-cookie";
import Signup from './Components/Signup';
import Emailcheck from './Components/Emailcheck.js';
import Friends from './Components/Friends.js';
import Group from './Components/Group.js';
import Income from './Components/Income.js';
import Expenses from './Components/Expenses.js';

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])



    const authToken = cookies.AuthToken


  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="/emailcheck" element={<Emailcheck/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route path="/groups" element={<Group/>}/>
          <Route path="/income" element={<Income/>}/>
          <Route path="/expenses" element={<Expenses/>}/>
           
        </Routes>
      </BrowserRouter>
  )
}


export default App;