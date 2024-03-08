import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import NewNavbar from './NewNavbar';

import titleText from './assets/Title.svg'
import './componentsCss/HomePage.css';
// import BlogCategories from './BlogCategories';

// import BgImage from './assets/BgImage.png'
// import Navbar from './Navbar';
// import ReadBlogs from './ReadBlogs';
// import MainHead from './assets/Main.svg';
// import MainHead from "./componentsCss/MainHead.svg";
// import { ReactComponent as MainHead } from "./componentsCss/MainHead.svg?react";
// import MainHead from "./componentsCss/MainHead.svg?react";
// import { ReactComponent as ReactLogo } from './assets/react.svg'

const RefBlogsDB = collection(db, "Blogs");

export default function HomePage() {
    
    const [BlogsList, setBlogList] = useState([]);

    const getBlogList = async () =>{
        const q = query(RefBlogsDB, orderBy("Time","desc"), limit(3));
        const data = await getDocs(q);
        const arr = data.docs.map((doc)=>({...doc.data()}));
        setBlogList(arr);
    }

    useEffect(()=>{ getBlogList() },[])

    return (
        <>
            {/* <Navbar /> */}
            <NewNavbar />

            <div className="section-title">
                {/* <img src={BgImage} className="main head" alt="MainHead" /> */}
                <img src={titleText} className="main head" alt="MainHead" />
                
                <div className="features">
                    <div className="f1 feature">
                        <h6>Share Your Experience</h6>
                        <div className='content' >Write your side of story and experiences and let people know what’s best.</div>
                    </div>
                    <div className="f2 feature">
                        <h6>Find Your Audience</h6>
                        <div className='content' >Find people who share the same thoughts and experiences as you.</div>
                    </div>
                </div>
            </div>


            {/* <BlogCategories /> */}
            {/* <div className="latestBlogs rounded p-4">
                <ReadBlogs condition={false} />
            </div> */}
        </>
    )
}
