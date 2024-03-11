import React from 'react'
import NewNavbar from './NewNavbar'
import { useLocation } from 'react-router-dom';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import './componentsCss/Blog.css';

export default function Blog(props) {

    // const qwerty = props.location;
    const location = useLocation();
    const { Title, Author, UserId, Dated, Time, Content, id } = location.state;
    const blog = location.state;
    console.log(blog);
    
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

    const RefBlogsDB = collection(db, "Blogs")
    const navigate = useNavigate();

    const updateBlog = (blog)=>{
        navigate('/update-blog', { state: { blogData : blog } });
        
    }


    return (
        <>
            <NewNavbar />
            <div className="mainBody">
                <div className="blog-head">
                    <div className="blog-info">
                        <h2 id='blog-title'>{Title}</h2>
                        <div className="line-author"></div>
                        <h5 id='blog-author'><small>By -{Author}</small></h5>
                    </div>

                    
                    <div className="extra-info">
                        <h5 id='blog-timestamp'>{Dated}, {Time}</h5>
                    </div>
                </div>
                <div className="line"></div>

                        <center>
                            <p id='blog-content'>
                                {blog.Content}
                            </p>
                        </center>


                
                {console.log(auth.currentUser)}

                {
                    (auth.currentUser.uid == blog.UserId) ? 
                        <div className="utility-btn">
                            <button className='btn btn-warning' onClick={()=>updateBlog(blog)}>
                                Update Blog
                            </button>

                            <button className='btn btn-outline-danger' onClick={()=>deleteBlog(blog.id)}>
                                Delete Blog
                            </button>
                        </div>
                        :
                        <></>
                }



            </div>
        </>
    )
}
