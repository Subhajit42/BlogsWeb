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
        <div className='container contentbox mx-5 my-5'>
        <h3> Sign In</h3>
        {/* <div className="form-row"> */}
            <input placeholder='username' onChange={(e)=> setUsername(e.target.value)} /> <br/>
        {/* </div> */}
        {/* <div className="form-row"> */}
            <input type="password" placeholder='password' onChange={(e)=> setPassword(e.target.value)} /> <br/>
        {/* </div> */}
            <button type="button" onClick={SignIn}> Sign In </button>
            <button type="button" onClick={SignWithGoogleID}> Google SignIn</button> <br/>
            <Link to={"/log-in"}>Already have an account? Log in</Link>
        </div>
        </>
    )
}