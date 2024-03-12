import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import NewNavbar from './NewNavbar';
import SearchBlogs from './SearchBlogs';
import titleText from './assets/Title.svg'
import AboutUs from './AboutUs';
import InfoSection from './InfoSection';
import './componentsCss/HomePage.css';
// import BlogCategories from './BlogCategories';


const RefBlogsDB = collection(db, "Blogs");

export default function HomePage() {
    
    const [BlogsList, setBlogList] = useState([]);

    const getBlogList = async () =>{
        const q = query(RefBlogsDB, orderBy("Time","desc"), limit(3));
        const data = await getDocs(q);
        const arr = data.docs.map((doc)=>({...doc.data()}));
        setBlogList(arr);
    }

    useEffect(()=>{ getBlogList() },[])

    return (
        <>
            {/* <Navbar /> */}

            <div className="section-title" style={{overflowX:"hidden"}}>
            <NewNavbar/>
                {/* <img src={BgImage} className="main head" alt="MainHead" /> */}
                <img src={titleText} className="main head" alt="MainHead" />
                
                <div className="features">
                    <div className="f1 feature">
                        <h6>Share Your Experience</h6>
                        <div className='content' >Write your side of story and experiences and let people know what’s best.</div>
                    </div>
                    <div className="f2 feature">
                        <h6>Find Your Audience</h6>
                        <div className='content' >Find people who share the same thoughts and experiences as you.</div>
                    </div>
                </div>
            </div>

            
            <div className="section-latest">
                <InfoSection />
            </div>
            
            <div className="section-search">
                <SearchBlogs globalSearch={true}/>
            </div>





            <div className="footer" id='AboutUs'>
                <AboutUs />
            </div>
            {/* <BlogCategories /> */}
            {/* <div className="latestBlogs rounded p-4">
                <ReadBlogs condition={false} />
            </div> */}
        </>
    )
}
