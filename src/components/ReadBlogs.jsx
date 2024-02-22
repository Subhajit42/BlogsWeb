import React, { useState, useEffect } from 'react'
import { QueryOrderByConstraint, collection, getDocs } from 'firebase/firestore';
import { query, where, orderBy, limit } from "firebase/firestore"; 
import { auth, db } from '../config/firebase';

export default function ReadBlogs(props) {


    const [BlogsList,setBlogList] = useState([]);
    const RefBlogsDB = collection(db, "Blogs")

    const getBlogList = async () =>{
        var q;
        if (props.condition){
             const Id = auth.currentUser.displayName ? auth.currentUser.displayName: auth.currentUser.email;
            q = query(RefBlogsDB, where("UserId","==",Id) , orderBy("Dated","desc"), orderBy("Time","desc"), limit(props.lim));
        }
        else{
            q = query(RefBlogsDB,orderBy("Dated","desc"), orderBy("Time","desc"), limit(props.lim));
        }
        
        // q = query(RefBlogsDB, orderBy("Dated","desc"), orderBy("Time","desc"), limit(props.lim));

        const data = await getDocs(q);
        const arr = data.docs.map((doc)=>({...doc.data()}))
        // console.log(arr);
        setBlogList(arr);
    }

    useEffect(()=>{ getBlogList() },[])

    return (
        <>
            <h1>{props.title}</h1>
            {BlogsList.map((blog,index)=>{
                return (
                    <div key={index} className='BlogCard'>
                        <h3>{blog.Title}</h3>
                        <small> <i> {blog.UserId} </i> </small>
                        <p>{blog.Dated}, {blog.Time}</p>
                        <p>{blog.Content}</p>
                        
                    </div>
                )
            })}
        </>
    )
}

ReadBlogs.defaultProps = {
    lim : 3,
    title : "Latest Blogs",
    condition: false
}