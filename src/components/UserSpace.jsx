import React from 'react'
import Navbar from './Navbar'
import UserBlogs from './UserBlogs'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'

export default function UserSpace() {

    const navigate = useNavigate();

    const SignOut = async () =>{
        try {
            await signOut(auth).then(console.log("SignOut Successful")).then(navigate('/'));
            
        } catch (err) {
            console.error(err).then(navigate('/sign-in'));
        }
    }

    return (
        <>
            <Navbar />
            <div className="d-flex mx-5 my-5">
                <button onClick={SignOut}>Sign Out</button>
            </div>
            <UserBlogs title={"My Latest Blogs"} />
        </>
    )
}

