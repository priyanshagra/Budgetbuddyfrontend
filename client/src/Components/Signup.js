import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div>
       <button className='' >
        <Link to="/emailcheck">Login</Link></button>
        <button className='' >
        <Link to="/authemail">Signup</Link></button>
    </div>
  )
}

export default Signup
