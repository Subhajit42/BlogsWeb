import React from 'react'
import { useState } from 'react';
import { getDocs, collection ,query , where } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function SearchBlogs() {
    
    const RefBlogsDB = collection(db, "Blogs");

    const [search, setSearch] = useState('');
    const [blogList, setBlogList] = useState([]);

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
    

    const getBlogList = async () => {
        let a = [];
        a.push(search.toLowerCase())
        a.push(search.toUpperCase())
        a.push(toTitleCase(search))
        a.push(toCamelCase(search))
        console.log(a)
        // const q = query(RefBlogsDB, where("Title", "==", search));
        const q = query(RefBlogsDB, where("Title", "in", a));
        const data = await getDocs(q);
        const arr = data.docs.map((doc) => ({ ...doc.data() }));
        setBlogList(arr);
    }


    return (
        <>
            <div className="container mx-5 my-5">
                <h1>Search Blogs</h1>
                <form className='searchBar' onSubmit={(e)=>{e.preventDefault();getBlogList}}>
                    <input placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
                    <button onClick={getBlogList}>Search</button>
                </form>
            </div>
            <div className="container mx-5 my-5 border">
                <h2><i> Search Results </i></h2>
                {blogList.map((blog,index) => {
                    return (
                        <div key={index}>
                            <h3>{blog.Title}</h3>
                            <small><i>{blog.UserId}</i></small>
                            <p>{blog.Dated}, {blog.Time}</p>
                            
                            <p>{blog.Content}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
