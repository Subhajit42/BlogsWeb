import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import Navbar from './Navbar';
import ReadBlogs from './ReadBlogs';

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
            <div className="container my-5">
                <h1>Welcome to BlogsWeb</h1>
            </div>
            <div className="container my-5 border">
                <ReadBlogs condition={false} />
            </div>
        </>
    )
}
