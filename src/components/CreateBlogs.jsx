import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Navbar from './Navbar';

export default function Blogs() {

    const navigate = useNavigate();
    const location = useLocation();

    const [blog,setBlog] = useState([]);
    const [title,setTitle] = useState(location.state.blogData.Title);
    const [content,setContent] = useState(location.state.blogData.Content);

    useEffect(()=>{setBlog(location.state.blogData)},[]);

    const updateBlog = async (id)=>{
        if (blog.Title === title && blog.Content === content){
            console.log("No Changes Made");
            navigate('/user');
            return;
        }else{
            const RefBlogsDB = doc(db, "Blogs", id);
            try {
                await updateDoc(RefBlogsDB, {
                    Title: title,
                    Content: content
                }).then(navigate('/user'));
            }catch(err){
                console.error(err);
            } 
            console.log("Updating Blog");
        }

    }

    return (
        <>
            <Navbar />
            <h1>Blogs</h1>
            {/* <div className="container">
                <h3><i>Previous View</i></h3>
                <h3>{blog.Title}</h3>
                <small> <i> {blog.UserId} </i> </small>
                <p>{blog.Dated}, {blog.Time}</p>
                <p>{blog.Content}</p>
            </div> */}


            <div className="container border border-secondary p-4 m-4">
                {console.log("first")}
                <small>Blog Title</small>
                <input type="text" className="form-control my-2" defaultValue={blog.Title} onChange={(e)=>setTitle(e.target.value)} />
                <small>Blog Content</small>
                <input type="text" className="form-control my-2" defaultValue={blog.Content} onChange={(e)=>setContent(e.target.value)} />
                
                <button onClick={()=>updateBlog(blog.id)} > Publish Changes</button>
            </div>
        </>
    )
}
