import React from 'react'
import Navbar from './Navbar'
import ReadBlogsUser from './ReadBlogsUser'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import NotSignedUp from './NotSignedUp'
import './componentsCss/UserSpace.css'

export default function UserSpace() {

    const navigator = useNavigate();

    const writeBlog = ()=>{
        navigator('/update-blog');
    }


    if (auth?.currentUser?.email == null){
        return (
            <>
                <Navbar/>
                    {/* <h3>Please SignUp or LogIn to continue.</h3>
                    <div>
                        <button className='btn btn-primary' onClick={()=>navigator('/sign-in')}>SignIn</button> <br/>
                        <button className='btn btn-primary' onClick={()=>navigator('/log-in')}>LogIn</button>
                    </div> */}
                    
                <NotSignedUp/>
            </>
        )
    }

    return (
        <div className='UserSpaceBody'>
            <Navbar />

            

            <div className="headingElement">
                <h3>Welcome, User</h3>
                <div className="head-buttons">
                    <button className='writeBlog-btn' onClick={writeBlog}>Write Blog</button>
                </div>
            </div>
            <ReadBlogsUser />

        </div>
    )
}

