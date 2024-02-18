import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase';


export default function MyBlogs() {

    const RefBlogSite = collection(db,"Blogs")

    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");

    const getDate = () =>{
        const currentDate = Date().split(' ');
        return [currentDate[2],currentDate[1],currentDate[3]].join(' ')
    }

    const getUser = () =>{
        if (auth.currentUser.displayName){
            return auth.currentUser.displayName;
        }
        return auth.currentUser.email;
    }

    const publishBlog = async () =>{
        
        try {
            await addDoc(RefBlogSite,{Title: blogTitle, Content: blogContent, UserId: getUser() , Dated: getDate() })
            console.log("Blog Published");
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <>
        <div className="NewBlogs mx-5 my-5">
            <input placeholder='Title' onChange={(e)=>setBlogTitle(e.target.value)} />
            <input placeholder='Content' onChange={(e)=>setBlogContent(e.target.value)} />
            <button onClick={publishBlog} > Publish </button>
        </div>
        </>
    )
}
