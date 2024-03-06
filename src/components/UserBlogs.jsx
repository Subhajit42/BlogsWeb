import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase';
import NotSignedUp from './NotSignedUp';
import ReadBlogs from './ReadBlogs';
import Navbar from './Navbar';
import NewNavbar from './NewNavbar';
import './componentsCss/PublishBlogs.css'
import { useNavigate } from 'react-router-dom';

export default function UserBlogs(props) {
    
    const navigator = useNavigate();

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
        // const choice = confirm("Are you sure you want to publish this blog?");
        if (blogTitle.trim() == "" || blogContent.trim() == "" ){
            console.log("Empty Blog");
            return;
        }else{
            try {
                console.log(auth.currentUser.uid);
                await addDoc(RefBlogSite,
                    {
                        Title: blogTitle,
                        Content: blogContent,
                        UserId: getUser(),
                        Dated: getDate(),
                        Time: getTime()
                    });
                console.log("Blog Published");
            } catch (err) {
                console.log("Error Publishing Blog");
                console.error(err);
            }
        }
    }

    const cancelPublish = () =>{
        const choice = confirm("Do you want to cancel this blog? The contents written wont be saved.");
        if (choice){
            navigator('/user');
        }
    }

    document.addEventListener("submit",(e)=>{
        e.preventDefault();
        publishBlog();
    });


    if (auth?.currentUser?.email == null){
        return (
            <>
                <NotSignedUp />
            </>
        )
    }else{
        return (
            <div className='MainBody'>
                {/* <Navbar /> */}
                <NewNavbar />
                <div className="NewBlogs mx-3 my-2">
                    <h3 id='section-heading'>Publish your Blog</h3>
                    <form id='publishBlog'>
                        <input id='title' placeholder='Title' onChange={(e)=>setBlogTitle(e.target.value)} />  <br/>
                        <textarea id='content' placeholder='Content' onChange={(e)=>setBlogContent(e.target.value)} /> <br/>
                        {/* <button id="submitBlog-btn" onClick={publishBlog} > Publish </button> */}
                        <div className="utility-btns-publish">
                            <button type="button" className="btn btn-outline-warning" onClick={publishBlog} style={{margin: "10px"}}> Publish </button>
                            <button type="button" className="btn btn-outline-warning" onClick={cancelPublish} style={{margin: "10px"}}> Cancel </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
