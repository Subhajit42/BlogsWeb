import React, { useState } from 'react';
import { GoogleAuth, auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export default function signIn() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const SignIn = async () =>{
        try {
            await createUserWithEmailAndPassword(auth, username, password).then(console.log("SignUp Successful"));
        } catch (err) {
            console.error(err);
        }
    }

    const SignWithGoogleID = async () =>{
        try {
            await signInWithPopup(auth,GoogleAuth);
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
        <div className='mx-5 my-5'>
        <h3> Sign In</h3>
            <input placeholder='username' onChange={(e)=> setUsername(e.target.value)} /> <br/>
            <input placeholder='password' onChange={(e)=> setPassword(e.target.value)} /> <br/>
            <button onClick={SignIn}> Sign In </button>
            <button onClick={SignOut}> SignOut</button>
            <button onClick={SignWithGoogleID}> Google SignIn</button>
        </div>
        </>
    )
}