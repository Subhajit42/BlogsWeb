import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { query, orderBy, limit } from "firebase/firestore"; 
import { db } from '../config/firebase';

export default function ReadBlogs(props) {


    const [BlogsList,setBlogList] = useState([]);
    const RefBlogsDB = collection(db, "Blogs")

    const getBlogList = async () =>{
        const q = query(RefBlogsDB, orderBy("Time","desc"), limit(props.lim));
        const data = await getDocs(q);
        const arr = data.docs.map((doc)=>({...doc.data()}))
        setBlogList(arr);
    }

    useEffect(()=>{ getBlogList() },[])


    // console.log(BlogsList)

    return (
        <>
            <h1>{props.title}</h1>
            {BlogsList.map((blog,index)=>{
                return (
                    <div key={index} className='BlogCard'>
                        <h3>{blog.Title}</h3>
                        <small> <i> {blog.UserId} </i> </small>
                        <p>{blog.Dated}</p>
                        <p>{blog.Content}</p>
                        
                    </div>
                )
            })}
        </>
    )
}

ReadBlogs.defaultProps = {
    lim : 3,
    title : "Latest Blogs"
}