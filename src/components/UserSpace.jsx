import React from 'react'
import Navbar from './Navbar'
import UserBlogs from './UserBlogs'
import ReadBlogsUser from './ReadBlogsUser'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'

export default function UserSpace() {

    return (
        <>
            <Navbar />

            {/* <div className="d-flex mx-5 my-5">
                <button onClick={SignOut}>Sign Out</button>
            </div>
            <UserBlogs title={"My Latest Blogs"} /> */}
            <h2>Write your own Blog.</h2>
            <UserBlogs />
            <ReadBlogsUser />

        </>
    )
}

