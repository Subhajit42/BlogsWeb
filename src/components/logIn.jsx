import React, { useState } from 'react'
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function logIn() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const LogIn = async () =>{
        try {
            await signInWithEmailAndPassword(auth,username, password)
            .then(console.log("Login Successful"));
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
            <h3> Log In</h3>
            <input placeholder='username' onChange={(e)=> setUsername(e.target.value)} /> <br/>
            <input placeholder='password' onChange={(e)=> setPassword(e.target.value)} /> <br/>
            <button onClick={LogIn}> Log In </button>
            <button onClick={SignOut}> SignOut</button>
        </div>
    </>
  )
}
