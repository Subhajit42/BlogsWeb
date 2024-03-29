import React, { useState } from 'react'
import { GoogleAuth, auth } from '../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import NewNavbar from './NewNavbar';
import googleIcon from './assets/googleIcon.png';
import './componentsCss/SignIn.css';

export default function logIn() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    const navigate = useNavigate()

    // const passwordElement = document.getElementById('password');
    // const loginBtn = document.getElementById('logIn-btn');
    // const errorDisplay = document.createElement('div');
    // errorDisplay.id = 'errorDisplay';
    
    
    const LogIn = async () =>{
        try {
            const logged = await signInWithEmailAndPassword(auth, username, password)
            if (logged){
                navigate('/user');
            }
        } catch (err) {
            console.error(err);
            if (username == ""){
                setErrorText("Username cannot be empty");
            }else{
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
            passwordElement?.after(errorDisplay);
        }
    }


    // document.addEventListener("submit", (event)=>{
    //     event.preventDefault();
    //     try{
    //         LogIn();
    //     }catch(err){
    //         console.error(err);
    //     }
    // });

    // document.addEventListener("keypress", function(event) {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         console.log("clicked");
    //         LogIn();
    //     }
    // });



    return (
    <>
        <NewNavbar />

        <div className="body ml">
            <div className='contentbox'>
                <div className="menu" style={{animation: "fadeInLeft 1s ease-in-out"}}>
                    <div className="heading">
                        <center>
                            <h2> Log In</h2>
                        </center>
                    </div>
                        {/* <form> */}
                            <input id="username" placeholder='Username' onChange={(e)=> setUsername(e.target.value)} />
                            <input id="password" type="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)} />
                            <div id="errorDisplay">{errorText}</div>
                            <button type="button" className="form-btn" id='logIn-btn' onClick={LogIn}> Log In </button>
                            <center><div className='or'>or</div></center>
                            <button type="button" className="form-btn-google" onClick={SignWithGoogleID}>
                                <img src={googleIcon} alt='' style={{width:"25px"}}/>
                            </button>
                        {/* </form> */}
                        <Link id='redirect-link' to="/sign-in">Don't have an account? Sign in</Link>
                    </div>
                <div className="logIn-image">
                </div>
            </div>
        </div>
    </>
  )
}
