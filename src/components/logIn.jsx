import React, { useState } from 'react'
import { GoogleAuth, auth } from '../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar"
import './componentsCss/SignIn.css';

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

    // document.addEventListener("keypress", function(event) {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         console.log("clicked");
    //         LogIn();
    //     }
    // });



    return (
    <>
        <Navbar/>
        <div className="body">
            <div className='container contentbox'>
                <div className="heading">
                {/* <div className='mx-5 my-5'> */}
                    <center>
                        <h2> Log In</h2>
                    </center>
                </div>
                    {/* <form> */}
                        <input placeholder='username' onChange={(e)=> setUsername(e.target.value)} />
                        <input type="password" placeholder='password' onChange={(e)=> setPassword(e.target.value)} />
                        <button type="button" className="form-btn" onClick={LogIn}> Log In </button>
                        <center><p>or</p></center>
                        <button type="button" className="form-btn" onClick={SignWithGoogleID}> Google SignIn</button>
                    {/* </form> */}
                    <Link id='redirect-link' to="/sign-in">Don't have an account? Sign in</Link>
            </div>
        </div>
    </>
  )
}
