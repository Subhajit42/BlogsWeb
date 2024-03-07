import React from 'react'
import { useState } from 'react';
import { getDocs, collection ,query , where } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
// import NewNavbar from './NewNavbar';
// import Blog from './Blog';
import './componentsCss/SearchBlogs.css';

export default function SearchBlogs() {
    
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
        console.log(a)
        // const q = query(RefBlogsDB, where("Title", "==", search));
        // const q = query(RefBlogsDB, where("Title", "in", a));
        const q = query(RefBlogsDB, where("Title", "in", a), where("UserId", "==", auth.currentUser.email));
        const data = await getDocs(q).then((data)=>{
            if(data.empty){
                setSearchRes(false);
                return;
            }else{
                setSearchRes(true);
                const arr = data.docs.map((doc) => ({ ...doc.data() }));
                setBlogList(arr);
            }
        })

        
    }

    return (
        <>
        <div className="mainBody">
            {/* <NewNavbar /> */}
            <div className="container search-head p-0">
                <h2 id='section-heading'>Search Blogs</h2>
                <form className='searchBar' onSubmit={(e)=>{e.preventDefault();getBlogList}}>
                    <input placeholder='Search by Title' onChange={(e) => setSearch(e.target.value)} />
                    <button onClick={getBlogList}>Search</button>
                </form>
            </div>
            <div className="section-sub-heading">
                <h3><i> Search Results </i></h3>
            </div>
            
                
                {searchRes ? 
                    <div className="blogs-list">
                    {blogList.map((blog,index) => {
                            return (
                                <div className='blog' key={index}>
                                    <h3>{blog.Title}</h3>
                                    <h5><small><i>{blog.UserId}</i></small></h5>
                                    <h5>{blog.Dated}</h5>
                                    {/* <h5>{blog.Dated}, {blog.Time}</h5> */}
                                    
                                    {/* <p>{blog.Content}</p> */}
                                </div>
                            )
                        })}
                    </div> : 
                    <div id="no-response">
                        <h4>No matching blogs found....</h4>
                    </div>
                }            
        </div>

        </>
    )
}
