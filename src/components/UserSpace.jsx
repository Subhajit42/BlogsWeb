import React from 'react'
import Navbar from './Navbar'
import UserBlogs from './UserBlogs'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

export default function UserSpace() {

    const SignOut = async () =>{
        try {
            await signOut(auth).then(console.log("SignOut Successful"));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Navbar />
            <div className="d-flex mx-5 my-5">
                <button onClick={SignOut}>Sign Out</button>
            </div>
            <UserBlogs />
        </>
    )
}

