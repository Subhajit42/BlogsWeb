import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import Navbar from './Navbar';

const RefBlogsDB = collection(db, "Blogs");



// let tempList=[];
// let flag = false;




export default function HomePage() {
    
    const [BlogsList, setBlogList] = useState([]);
     
    // onSnapshot( RefBlogsDB, async (doc)=>{
    //     doc.forEach((docs)=>{
    //         tempList.push(docs.data())
    //         // console.log(docs.data())
    //         console.log(flag);
    //         // setBlogList((BlogsList)=>[{...BlogsList},docs.data()]);
    //     }).then(flag = true);

    //     const changes = await ()=>{setBlogList(tempList)};
    //     flag = false;
    // })
    
    // console.log("flag 2 = ",flag);
    
    
    // console.log(BlogsList);


        // doc.map( (doc_elemnets)=>{
        //     const filteredData = {...doc_elemnets.data()};
        //     setBlogList(filteredData);
        // }

        // )

        // doc.forEach((docs)=>console.log(docs.data()))
        // console.log(BlogsList);
        // const a = await doc.data().then((e)=>console.log(e));
        // const filteredData = {};
        // setBlogList(filteredData);
        // console.log(BlogsList);
    // });

    // const getBlogsList = async () =>{
    //     try {
    //         const data = await getDocs(RefBlogsDB);
    //         const filteredData = data.docs.map((doc)=>({...doc.data()}));
    //         setBlogList(filteredData)
    //         // console.log(BlogsList);





    //     } catch (err) {
    //         console.error(err);
    //     }
    // }




    const getBlogList = async () =>{
        const data = await getDocs(RefBlogsDB);
        // console.log(data.docs);
        const filtered = data.docs.map((doc)=>doc.data());
        setBlogList(filtered);
    }

    useEffect(()=>{ getBlogList() },[])

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <h1>Welcome to BlogsWeb</h1>
            </div>
            <div className="BlogsOutput mx-5 my-5 border">
                
                    {/* <button onClick={getBlogsList}>GetDATA</button> */}
                    {BlogsList.map((blog)=>
                        <div id="blog">
                            <h3>{blog.Title}</h3>
                            <p>{blog.Content}</p>
                        </div>
                    )}
            </div>
        </>
    )
}
