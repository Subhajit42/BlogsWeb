import React, { useState, useEffect } from 'react'
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar"


export default function logIn() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const LogIn = async () =>{
        try {
            const logged = await signInWithEmailAndPassword(auth,username, password)
            .then(console.log("Login Successful"));
            if (logged){
                navigate('/user')
            }
        } catch (err) {
            console.error(err);
        }
    }

    const SignOut = async () =>{
        try {
            await signOut(auth).then(console.log("SignOut Successful"));
            
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
    <>
        <Navbar/>
        <div className='mx-5 my-5'>
            <h3> Log In</h3>
            <input placeholder='username' onChange={(e)=> setUsername(e.target.value)} /> <br/>
            <input placeholder='password' onChange={(e)=> setPassword(e.target.value)} /> <br/>
            <button onClick={LogIn}> Log In </button>
            <button onClick={SignOut}> SignOut</button> <br/>
            <Link to="/sign-in">Don't have an account? Sign in</Link>
        </div>
    </>
  )
}
