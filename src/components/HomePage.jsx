import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import Navbar from './Navbar';
import ReadBlogs from './ReadBlogs';
import './componentsCss/HomePage.css';

import MainHead from './assets/Main.svg';
import BlogCategories from './BlogCategories';
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
            <Navbar />
            <div className="title">
                <img src={MainHead} className="main head" alt="MainHead" />
                
                {/* <h1>Welcome to BlogsWeb</h1> */}
            </div>

            {/* <BlogCategories /> */}

            <div className="latestBlogs rounded p-4">
                <ReadBlogs condition={false} />
            </div>
        </>
    )
}
