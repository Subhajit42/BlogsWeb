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
   

    const toggleViewRB = ()=>{
        const RB_body = document.getElementById('recent-blogs-body');
        if (RB_body.classList.contains('show')){
            document.getElementById('symbol').innerHTML = '&#x25BC;';
            RB_body.classList.remove('show');
        }else{
            document.getElementById('symbol').innerHTML = '&#x25B2;';
            RB_body.classList.add('show');
        }
    }

    return (
        <>
            <div className="section" >

                <div className='recent-blogs'>
                    <button className='collapse-btn' onClick={toggleViewRB}>
                        <h3 >{props.title}</h3>
                        <h6 id='symbol' style={{scale:"0.8"}}>&#x25BC;</h6>
                    </button>
                </div>

                <div className="recent-blogs-body collapse" id='recent-blogs-body'>
                    {BlogsList.map((blog,index)=>{
                        return (
                            <div key={index} className='BlogCard'>
                                <Link to="/blog" state={blog} >
                                    <h3>{blog.Title}</h3>
                                    <h5>{blog.Dated}</h5>
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