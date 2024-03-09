import React from 'react'
import { collection, query, where } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { getDocs } from 'firebase/firestore';



export default function TestComponent() {
  
    const RefBlogsDB = collection(db, "Blogs");
    const test = ()=>{
        let searchCases = ["FFirstBlog","fFirstBlog","firstBlog","FirstBlog","firstblog"];
        var q = query(RefBlogsDB, where("Title", "in", searchCases), where("UserId", "==", auth.currentUser.uid));
        console.log(auth.currentUser.uid);
        getDocs(q).then((data)=>{
            if(data.empty){
                console.log("No Data Found");
                return;
            }else{
                const arr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log(arr);
            }
        });
    }
  
    return (
    <>
        <button className='btn btn-primary' onClick={test}>Test</button>
    </>
  )
}
