import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { collection, getDocs, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import Navbar from './Navbar';
import ReadBlogs from './ReadBlogs';

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
        const q = query(RefBlogsDB, orderBy("Time","desc"), limit(3));
        const data = await getDocs(q);
        const arr = data.docs.map((doc)=>({...doc.data()}));
        setBlogList(arr);
    }

    useEffect(()=>{ getBlogList() },[])

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <h1>Welcome to BlogsWeb</h1>
            </div>
            <div className="container my-5 border">
                <ReadBlogs condition={false} />
            </div>
        </>
    )
}
