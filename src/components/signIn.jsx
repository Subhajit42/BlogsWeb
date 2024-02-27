import React, { useState } from 'react';
import { GoogleAuth, auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './componentsCss/SignIn.css';

export default function signIn() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const SignIn = async () =>{
        try {
            let logged = await createUserWithEmailAndPassword(auth, username, password).then(console.log("SignUp Successful"));
            if (logged){
                navigate('/user');
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


    return (
        <>
        <Navbar />
        <div className="body">
            <div className='container contentbox'>
                <div className="heading">
                    <center><h2> Sign In</h2></center>
                </div>
                <input placeholder='username' onChange={(e)=> setUsername(e.target.value)} />
                <input type="password" placeholder='password' onChange={(e)=> setPassword(e.target.value)} />
            
                <button type="button" className="form-btn"  onClick={SignIn}> Sign In </button>
                <center><p>or</p></center>
                <button type="button" className="form-btn" onClick={SignWithGoogleID}> Google SignIn</button>
                
                <center>
                    <Link id='redirect-link' to={"/log-in"}>Already have an account? Log in</Link>
                </center>
            </div>
        </div>
        </>
    )
}