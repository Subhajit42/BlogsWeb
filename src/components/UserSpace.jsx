import React from 'react'
import Navbar from './Navbar'
import NewNavbar from './NewNavbar'
import ReadBlogsUser from './ReadBlogsUser'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import NotSignedUp from './NotSignedUp'

// import TitleBlogsWeb from '../images/BlogsWeb.svg'
import TitleBlogsWeb from './assets/BlogsWeb.svg'
import './componentsCss/UserSpace.css'
import CalendarWB from './CalenderWB'

export default function UserSpace() {

    const navigator = useNavigate();

    const writeBlog = ()=>{
        navigator('/update-blog');
    }

    const CurrentDate = new Date();CurrentDate

    if (auth?.currentUser?.email == null){
        return (
            <>
                {/* <Navbar/> */}
                <NewNavbar/>
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
            {/* <Navbar /> */}
            <NewNavbar/>
            
            <div className="UserSpaceLayout">
                <div className="column-1">

                    <div className="headingElement e-1">
                        <img id='titleImage' src={TitleBlogsWeb} alt='BlogsWeb' style={{width: "-webkit-fill-available"}}/>
                    </div>

                    <div className="userElement e-2">
                        <div className="greetings">
                            <h3>Welcome, User</h3>
                            <h2>“To blog is to share, connect, create, and inspire. ”</h2>
                        </div>

                        <div className="line"></div>

                        <div className="head-buttons">
                            <button className='writeBlog-btn' onClick={writeBlog}>Write Blog</button>
                        </div>
                    </div>

                    <div className="UserBlogs e-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid porro, impedit maxime quia quibusdam voluptas libero commodi illo est perspiciatis labore maiores vitae facere, dolore asperiores quis ipsam beatae ducimus.
                    </div>

                </div>

                <div className="column-2">
                    <div className="day-time-date e-4">
                        <div className="day-time r-1">
                            <h4 id='day'>{CurrentDate.toLocaleDateString('default', { weekday: 'long' })}</h4>
                            <h2 id='time'>{CurrentDate.getHours().toString().padStart(2, '0') + ":" + CurrentDate.getMinutes().toString().padStart(2, '0')}</h2>
                        </div>
                        <div className="date r-2">
                            <h4 id='DD'>{CurrentDate.getDate().toString().padStart(2, '0')}</h4>
                            <div className="line"></div>
                            <h4 id='Month'>{CurrentDate.toLocaleString('default', { month: 'long' })}</h4>
                            <div className="line"></div>
                            <h3 id='YYYY'>{CurrentDate.getFullYear()}</h3>
                        </div>
                    </div>

                    <div className="calender e-5 py-2">
                        <CalendarWB />
                    </div>
                </div>


            </div>

            {/* <div className="headingElement">
                <h3>Welcome, User</h3>
                <div className="head-buttons">
                    <button className='writeBlog-btn' onClick={writeBlog}>Write Blog</button>
                </div>
            </div>
            <ReadBlogsUser /> */}

        </div>
    )
}

