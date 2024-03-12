import React, { useEffect, useState } from 'react'
import NewNavbar from './NewNavbar'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import NotSignedUp from './NotSignedUp'
import TitleBlogsWeb from './assets/BlogsWeb.svg'
import CalendarWB from './CalenderWB'
import SearchBlogs from './SearchBlogs'
import RecentBlogs from './RecentBlogs'
import './componentsCss/UserSpace.css'

export default function UserSpace() {

    const navigator = useNavigate();

    const [CurrentDate,setCurrent] = useState(new Date());

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrent(new Date());
        },10000);
    },[]);

    const writeBlog = ()=>{
        navigator('/write-blog');
    }


    if (auth?.currentUser?.email == null){
        return (
            <>
                <NewNavbar/>
                    
                <NotSignedUp/>
            </>
        )
    }

    return (
        <div className='UserSpaceBody'>
            <NewNavbar/>
            
            <div className="UserSpaceLayout">
                <div className="column-1">

                    <div className="headingElement e-1">
                        <img id='titleImage' src={TitleBlogsWeb} alt='BlogsWeb' style={{width: "-webkit-fill-available"}}/>
                    </div>

                    <div className="userElement e-2">
                        <div className="greetings">
                            <h3>Welcome, User</h3>
                            <h2>“To blog is to share, connect, create, and inspire.”</h2>
                        </div>

                        <div className="line"></div>

                        <div className="head-buttons">
                            <button className='writeBlog-btn' onClick={writeBlog}>Write Blog</button>
                        </div>
                    </div>

                    <div className="UserBlogs e-3">
                        <SearchBlogs title={"Search Your Blogs"} globalSearch={false}/>
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

                    <div className="recent-logs e-6">
                        <RecentBlogs condition={true}/>
                    </div>
                </div>


            </div>

        </div>
    )
}

