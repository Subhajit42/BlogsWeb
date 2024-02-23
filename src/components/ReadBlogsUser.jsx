import React, { useState, useEffect } from 'react'
import { collection, deleteDoc } from 'firebase/firestore';
import { query, where, orderBy, limit, doc, onSnapshot} from "firebase/firestore"; 
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import NotSignedUp from './NotSignedUp';




export default function ReadBlogs(props) {

    if (auth?.currentUser?.email == null){
        return (
            <>
                <NotSignedUp />
            </>
        )
    }

    const [BlogsList,setBlogList] = useState([]);
    const RefBlogsDB = collection(db, "Blogs")

    
    const Id = auth.currentUser.displayName ? auth.currentUser.displayName: auth.currentUser.email;
    const q = query(RefBlogsDB, where("UserId","==",Id) , orderBy("Dated","desc"), orderBy("Time","desc"), limit(props.lim));
    


    const getBlogListSnapshot = ()=> {
        onSnapshot(q,(querySnapshot)=>{
        const arr = querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id}))
        setBlogList(arr);
        });
    }

    const deleteBlog = async (id)=>{
        const choice = confirm("Are you sure you want to delete this blog?");
        if(!choice) return;
        try {
            await deleteDoc(doc(RefBlogsDB,id));
            console.log("Blog Deleted");
        }catch(err){
            console.error(err);
        }
    }

    
    
    useEffect(()=>{ getBlogListSnapshot() },[])
    
    const navigate = useNavigate();

    const updateBlog = (blog)=>{
        navigate('/update-blog', { state: { blogData : blog } });
        
    }




    

    return (
        <>
            <h1>{props.title}</h1>
            {BlogsList.map((blog,index)=>{
                return (
                    <div key={index} className='BlogCard my-5 mx-5 border border-primary p-4'>
                        <h3>{blog.Title}</h3>
                        <small> <i> {blog.UserId} </i> </small>
                        <p>{blog.Dated}, {blog.Time}</p>
                        <p>{blog.Content}</p>
                        <div className='buttons-utility'>

                            <button onClick={()=>deleteBlog(blog.id)}> Delete </button>
                            {/* <button onClick={()=>console.log(blog.id)}>Delete</button> */}

                            <button onClick={()=>updateBlog(blog)}> Update </button>
                        </div>
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