import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase';
import NotSignedUp from './NotSignedUp';
import NewNavbar from './NewNavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import './componentsCss/Blog.css'

export default function UserBlogs(props) {
    
    const navigator = useNavigate();
    const location = useLocation();
    const blog = location.state;
    // console.log(blog);



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

    const getCategory = () =>{
        return document.getElementById('blog-categories-dropdown').value;
    }

    const publishBlog = async () =>{
        const choice = confirm("Are you sure you want to publish this blog?");
        if (!choice){ return; }
        if (blogTitle.trim() == "" || blogContent.trim() == "" ){
            console.log("Empty Blog");
            return;
        }else{
            try {
                console.log(auth.currentUser.uid);
                await addDoc(RefBlogSite,
                    {
                        Author: getUser(),
                        Dated: getDate(),
                        Time: getTime(),
                        Title: blogTitle,
                        Category: getCategory(),
                        Content: blogContent,
                        UserId: auth.currentUser.uid
                    });
                console.log("Blog Published");
                navigator('/user');
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

    if (auth?.currentUser?.email == null){
        return (
            <>
                <NotSignedUp />
            </>
        )
    }else{
        return (
        <>
            <NewNavbar />
            <div className='mainBody'>
                <div className="NewBlogs mx-3 my-2">

                    {
                        window.location.href.includes('update-blog') ?
                            <></> :
                            <h2 id='section-heading'>Publish your Blog</h2>
                        
                    }



                    <form id='publishBlog'>
                        {window.location.href.includes('update-blog') ?
                            <input id='blog-title' placeholder='Title' value={blog.blogData.Title} onChange={(e)=>setBlogTitle(e.target.value)} />
                                :
                            <>
                                <input id='blog-title' placeholder='Title' onChange={(e)=>setBlogTitle(e.target.value)} />
                                <div class="input-group mb-3">
                                    
                                    <select className="dropdown" id="blog-categories-dropdown">
                                        <option selected>--Choose Category--</option>
                                        <option value="BooksBlog">Books Blog</option>
                                        <option value="FoodsBlog">Foods Blog</option>
                                        <option value="TravelBlog">Travel Blog</option>
                                        <option value="PersonalBlog">Personal Blog</option>
                                        <option value="SportsBlog">Sports Blog</option>
                                    </select>
                                </div>
                            </>
                        }

                        <div className="line"></div>

                        {window.location.href.includes('update-blog') ?
                            <textarea id='content' placeholder='Content' value={blog.blogData.Content} onChange={(e)=>setBlogContent(e.target.value)} />
                                :
                            <textarea id='content' placeholder='Content' onChange={(e)=>setBlogContent(e.target.value)} />

                        }

                        <div className="utility-btns-publish">
                            <button type="button" className="btn btn-outline-warning" onClick={publishBlog} style={{margin: "10px"}}> Publish </button>
                            <button type="button" className="btn btn-outline-warning" onClick={cancelPublish} style={{margin: "10px"}}> Cancel </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
        )
    }
}
