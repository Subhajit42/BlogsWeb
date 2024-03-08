import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { query, where, orderBy, limit, doc, onSnapshot} from "firebase/firestore"; 
import { auth, db } from '../config/firebase';
import './componentsCss/RecentBlogs.css';
import { Link } from 'react-router-dom';

export default function ReadBlogs(props) {


    const [BlogsList,setBlogList] = useState([]);
    const RefBlogsDB = collection(db, "Blogs")

    
    var q;
    if (props.condition){
        const Id = auth.currentUser.displayName ? auth.currentUser.displayName: auth.currentUser.email;
        q = query(RefBlogsDB, where("UserId","==",Id) , orderBy("Dated","desc"), orderBy("Time","desc"), limit(props.lim));
    }
    else{
        q = query(RefBlogsDB,orderBy("Dated","desc"), orderBy("Time","desc"), limit(props.lim));
    }
    
    
    const getBlogList = async (q) =>{        
        const data = await getDocs(q);
        const arr = data.docs.map((doc)=>({...doc.data()}))
        // console.log("not using snapshot");
        setBlogList(arr);
    }

    const getBlogListSnapshot = ()=> {
        // console.log("using snapshot")
        onSnapshot(q,(querySnapshot)=>{
        const arr = querySnapshot.docs.map((doc)=>({...doc.data()}))
        setBlogList(arr);
        });
    }

    if (props.liveUpdates){
        useEffect(()=>{ getBlogListSnapshot() },[])
    }else{
        useEffect(()=>{ getBlogList(q) },[])
        
    }
   



    return (
        <>
            <div className="section" >
            {/* style={{height:"fit-content",marginBottom:"10px"}} */}

                <div className='recent-blogs'>
                    <h3 >{props.title}</h3>
                </div>

                <div className="recent-blogs-body">
                    {BlogsList.map((blog,index)=>{
                        return (
                            <div key={index} className='BlogCard'>
                                <Link to="/blog" state={blog} >
                                    <h3>{blog.Title}</h3>
                                    <h5>{blog.Dated}</h5>
                                    {/* <h5>{blog.Dated} | {blog.Time}</h5> */}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

ReadBlogs.defaultProps = {
    lim : 3,
    title : "Recent Blogs",
    condition: false,
    liveUpdates: false
}