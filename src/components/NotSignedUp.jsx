import React from 'react'
import { Link } from 'react-router-dom'

export default function NotSignedUp() {
  return (
    <>
        <div className="container my-5">
            <h3>Please SignUp or LogIn to continue.</h3>    <br/>
            <Link to={"/sign-in"}>SignIn</Link> <br/>
            <Link to={"/log-in"}>LogIn</Link>
        </div>
    </>
  )
}
