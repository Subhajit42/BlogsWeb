import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase';
import NotSignedUp from './NotSignedUp';
import ReadBlogs from './ReadBlogs';

export default function UserBlogs(props) {
    
    const RefBlogSite = collection(db,"Blogs")

    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");

    const getDate = () =>{
        const currentDate = Date().split(' ');
        return [currentDate[2],currentDate[1],currentDate[3]].join(' ')
    }

    const getTime = () =>{
        const currentTime = Date().split(' ');
        return [currentTime[4],currentTime[5]].join(' ')
    }

    const getUser = () =>{
        if (auth.currentUser.displayName){
            return auth.currentUser.displayName;
        }
        return auth.currentUser.email;
    }

    const publishBlog = async () =>{
        
        try {
            await addDoc(RefBlogSite,{Title: blogTitle, Content: blogContent, UserId: getUser() , Dated: getDate(), Time: getTime() })
            console.log("Blog Published");
        } catch (err) {
            console.error(err);
        }
    }




    if (auth?.currentUser?.email == null){
    // if (auth == null){
        // console.log(auth);
        return (
            <>
                <NotSignedUp />
            </>
        )
    }else{
        return (
            <>
            <div className="NewBlogs mx-5 my-5">
                <h3>Publish your Blog</h3>
                <input placeholder='Title' onChange={(e)=>setBlogTitle(e.target.value)} />  <br/>
                <input placeholder='Content' onChange={(e)=>setBlogContent(e.target.value)} /> <br/>
                <button onClick={publishBlog} > Publish </button>
            </div>

            <div className="container  my-5 mx-5 border">
                <ReadBlogs condition={true} title={props.title} liveUpdates={true}/>
            </div>
            </>
        )
    }
}
