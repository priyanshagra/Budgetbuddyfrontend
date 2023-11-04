import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div>
       <button className='' >
        <Link to="/login">Login</Link></button>
        <button className='' >
        <Link to="/checksignup">Signup</Link></button>
    </div>
  )
}

export default Signup
