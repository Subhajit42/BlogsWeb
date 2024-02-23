import React, { useState } from 'react'
import { GoogleAuth, auth } from '../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
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
    
    const SignWithGoogleID = async () =>{
        try {
            let logged = await signInWithPopup(auth,GoogleAuth);
            if (logged){
                navigate('/user');
            }
        } catch (err) {
            console.error(err);
        }
    }


    document.addEventListener("submit", (event)=>{
        event.preventDefault();
        try{
            LogIn();
        }catch(err){
            console.error(err);
        }
    });

    return (
    <>
        <Navbar/>
        <div className='mx-5 my-5'>
            <h3> Log In</h3>
            <form>
                <input placeholder='username' onChange={(e)=> setUsername(e.target.value)} /> <br/>
                <input type="password" placeholder='password' onChange={(e)=> setPassword(e.target.value)} /> <br/>
                <button onClick={LogIn}> Log In </button>
                <button onClick={SignWithGoogleID}> Google SignIn</button> <br/>
            </form>
            <Link to="/sign-in">Don't have an account? Sign in</Link>
        </div>
    </>
  )
}
