import React, { useState } from 'react';
import { GoogleAuth, auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import NewNavbar from './NewNavbar';
import googleIcon from './assets/googleIcon.png';
import './componentsCss/SignIn.css';

export default function signIn() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    const navigate = useNavigate();

    // const passwordElement = document.getElementById('password');
    // const SignUpBtn = document.getElementById('signUp-btn');
    // const errorDisplay = document.createElement('div');
    // errorDisplay.id = 'errorDisplay';
    
    
    const SignIn = async () =>{
        try {
            let logged = await createUserWithEmailAndPassword(auth, username, password)
            .then(console.log("SignUp Successful"));
            if (logged){
                navigate('/user');
            }
        } catch (err) {
            console.error(err);
            if (username === ""){
                setErrorText("Username cannot be empty");
            }else if (password.length < 6){
                setErrorText("Password must be at least 6 characters long");
            }else{
                if (err = "FirebaseError: Firebase: Error (auth/already-in-use-email)."){
                    setErrorText("Username exists already");
                }
                setErrorText("Invalid username or password");
            }
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
            passwordElement.after(errorDisplay);
        }
    }


    return (
        <>
        <NewNavbar />
        <div className="body ms">
            <div className='contentbox'>
                <div className="signIn-image">
                </div>

                <div className="menu" style={{animation: "fadeInRight 1s ease-in-out"}}>
                    <div className="heading">
                        <center><h2> Sign Up</h2></center>
                    </div>
                    <input id="username" placeholder='Username' onChange={(e)=> setUsername(e.target.value)} />
                    <input id="password" type="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)} />
                    <div id="errorDisplay">{errorText}</div>
                    <button type="button" className="form-btn" id='signUp-btn' onClick={SignIn}> Sign In </button>
                    <center><div className='or'>or</div></center>
                    <button type="button" className="form-btn-google" onClick={SignWithGoogleID}>
                        <img src={googleIcon} alt='' style={{width:"25px"}}/>
                    </button>

                    <center>
                        <Link id='redirect-link' to={"/log-in"}>Already have an account? Log in</Link>
                    </center>
                </div>
            </div>
        </div>
        </>
    )
}