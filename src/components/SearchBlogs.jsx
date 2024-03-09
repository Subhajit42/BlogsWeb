import React from 'react'
import { useState } from 'react';
import { getDocs, collection ,query , where } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
// import NewNavbar from './NewNavbar';
// import Blog from './Blog';
import './componentsCss/SearchBlogs.css';
import { Link } from 'react-router-dom';

export default function SearchBlogs(props) {
    
    const RefBlogsDB = collection(db, "Blogs");

    const [search, setSearch] = useState('');
    const [blogList, setBlogList] = useState([]);
    const [searchRes,setSearchRes] = useState(true);

    const toTitleCase = (str)=> {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    const toCamelCase = (str) => {
        return str.replace(/\W+(.)/g, function(match, chr)
        {   
            return chr.toUpperCase();
        });
    }
    
    const toCapitalise = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const getBlogList = async () => {
        let a = [];
        a.push(search.toLowerCase());
        a.push(search.toUpperCase());
        a.push(toTitleCase(search));
        a.push(toCamelCase(search));
        a.push(toCapitalise(search));
        // console.log(a)
        // const q = query(RefBlogsDB, where("Title", "in", a));
        if (props.globalSearch) {
            var q = query(RefBlogsDB, where("Title", "==", search));
        }else{
            var q = query(RefBlogsDB, where("Title", "in", a), where("UserId", "==", auth.currentUser.email));
        }

        // const q = query(RefBlogsDB, where("Title", "in", a), or (where("UserId", "==", auth.currentUser.email)));

        const data = await getDocs(q).then((data)=>{
            if(data.empty){
                setSearchRes(false);
                return;
            }else{
                setSearchRes(true);
                const arr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setBlogList(arr);
            }
        })

        
    }

    return (
        <>
        <div className="mainBody" style={{display:"contents"}}>
            {/* <NewNavbar /> */}
            <div className="container search-head p-0">
                <h2 id='section-heading' style={{alignSelf: "auto"}}>Search Blogs</h2>
                <form className='searchBar' onSubmit={(e)=>{e.preventDefault();getBlogList}}>
                    <input placeholder='Search by Title' onChange={(e) => setSearch(e.target.value)} />
                    <button className="btn btn-warning" onClick={getBlogList}>Search</button>
                </form>
            </div>

            <div className="search-body">

            
                <div className="section-sub-heading">
                    <h3><i> Search Results </i></h3>
                </div>
                
                    
                    {searchRes ? 
                        <div className="blogs-list">
                        {blogList.map((blog,index) => {
                            console.log(blog)
                                return (
                                    <div className='blog' key={index} >
                                        <Link to="/blog" state={blog} >
                                            {/* <Link to={{
                                                pathname:`/blog`,
                                                state: {title: "SecondBlog"}
                                            }}> */}
                                            <h3>{blog.Title}</h3>
                                            <h5><small><i>{blog.UserId}</i></small></h5>
                                            <h5>{blog.Dated}</h5>
                                            </Link>
                                    </div>
                                    )
                            })}
                        </div> : 
                        <div id="no-response">
                            <h4>No matching blogs found....</h4>
                        </div>
                    }
                </div>
        </div>

        </>
    )
}

SearchBlogs.defaultProps = {
    globalSearch : true
}
