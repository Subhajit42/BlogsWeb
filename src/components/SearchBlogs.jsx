import React, { useEffect } from 'react'
import { useState } from 'react';
import { getDocs, collection ,query , where, orderBy } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import './componentsCss/SearchBlogs.css';
import { Link } from 'react-router-dom';

export default function SearchBlogs(props) {
    
    const RefBlogsDB = collection(db, "Blogs");

    const [search, setSearch] = useState('');
    const [blogList, setBlogList] = useState([]);
    const [userBlogList, setUserBlogList] = useState([]);
    const [otherAuthBlogList, setOtherAuthBlogList] = useState([]);
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
        let searchCases = [];
        searchCases.push(search.toLowerCase());
        searchCases.push(search.toUpperCase());
        searchCases.push(toTitleCase(search));
        searchCases.push(toCamelCase(search));
        searchCases.push(toCapitalise(search));
        
        const q = query(RefBlogsDB, where("Title", "in", searchCases));

        const data = await getDocs(q).then((data)=>{
            if(data.empty){
                setSearchRes(false);
                return;
            }else{
                setSearchRes(true);
                const arr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                if (props.loggedIn){
                    seperateOtherAuthors(arr);
                }
                setBlogList(arr);
            }
        })

        function seperateOtherAuthors(data){
            let MyBlogs = data.filter((blog) => blog.UserId === auth.currentUser.uid);
            let OtherBlogs= data.filter((blog) => blog.UserId !== auth.currentUser.uid);

            setUserBlogList(MyBlogs);
            setOtherAuthBlogList(OtherBlogs);
            
        } 
    }

    return (
        <>
        <div className="mainBody" style={{display:"contents"}}>
            <div className="container search-head p-0" id="search-section">
                <h2 id='section-heading' style={{alignSelf: "auto"}}>{props.title}</h2>
                <form className='searchBar' onSubmit={(e)=>{e.preventDefault();getBlogList}}>
                    <input placeholder='Search by Title' onChange={(e) => setSearch(e.target.value)} />
                    <button className="btn btn-warning" onClick={getBlogList}>Search</button>
                </form>
            </div>

            <div className="search-body">

            {blogList.length > 0 ?
                <div className="section-sub-heading">
                    <h3><i> Search Results </i></h3>
                </div>:
                null
            }
                 
                        {searchRes ? 
                            <div className="blogs-list">
                                {props.loggedIn ?
                                <div>
                                    {userBlogList?.map((blog,index) => {
                                        return (
                                                <div className='blog' key={index} >
                                                    <div className="rect"></div>
                                                    <Link to="/blog" state={blog} >
                                                        <div className="r-1">
                                                            <h3>{blog.Title}</h3>
                                                        </div>
                                                        <div className="r-2">
                                                            <h5><small><i>{blog.Author}</i></small></h5>
                                                            <h5 id='date'>{blog.Dated}</h5>
                                                        </div>
                                                    </Link>
                                                </div>
                                                )
                                    })}


                                    {otherAuthBlogList.length > 0 ?
                                        <div className="section-sub-heading">
                                            <h3><i>From Other Authors</i></h3>
                                        </div>:
                                        null
                                    }

                                    




                                    {otherAuthBlogList?.map((blog,index) => {
                                        return (
                                                <div className='blog' key={index} >
                                                    <div className="rect"></div>
                                                    <Link to="/blog" state={blog} >
                                                        <div className="r-1">
                                                            <h3>{blog.Title}</h3>
                                                        </div>
                                                        <div className="r-2">
                                                            <h5><small><i>{blog.Author}</i></small></h5>
                                                            <h5 id='date'>{blog.Dated}</h5>
                                                        </div>
                                                    </Link>
                                                </div>
                                                )
                                    })}

                                </div>:
                                <div>
                                    {blogList.map((blog,index) => {
                                        return (
                                                <div className='blog' key={index} >
                                                    <div className="rect"></div>
                                                    <Link to="/blog" state={blog} >
                                                        <div className="r-1">
                                                            <h3>{blog.Title}</h3>
                                                        </div>
                                                        <div className="r-2">
                                                            <h5><small><i>{blog.Author}</i></small></h5>
                                                            <h5 id='date'>{blog.Dated}</h5>
                                                        </div>
                                                    </Link>
                                                </div>
                                                )
                                    })}
                                </div>
                                }
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
    globalSearch : true,
    loggedIn: false,
    title: "Search Blogs"
}
