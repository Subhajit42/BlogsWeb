import React, { useState, useEffect } from 'react'
import { collection, deleteDoc } from 'firebase/firestore';
import { query, where, orderBy, limit, doc, onSnapshot} from "firebase/firestore"; 
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import NotSignedUp from './NotSignedUp';
import './componentsCss/ReadBlogs.css';



export default function ReadBlogs(props) {

    // if (auth?.currentUser?.email == null){
    //     return (
    //         <>
    //             <NotSignedUp />
    //         </>
    //     )
    // }

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
        <div className='second-section'>
            <div className='recentBlogsBody'>
                <h3 id="section-heading" >{props.title}</h3>
                {BlogsList.map((blog,index)=>{
                    return (
                        // <div className="blogBg">
                            <div key={index} className='BlogCardUser my-4 mx-3 p-4'>
                                <h3>{blog.Title}</h3>
                                {/* <small> <i> {blog.UserId} </i> </small> */}
                                <i>
                                    <div className='dated' >{blog.Dated}</div>
                                </i>
                                {/* <div className='dated' >{blog.Dated} , {blog.Time}</div> */}
                                {/* <p>{blog.Content}</p> */}
                                <div className='buttons-utility'>

                                    {/* <button onClick={()=>deleteBlog(blog.id)}> Delete </button> */}
                                    {/* <button onClick={()=>updateBlog(blog)}> Update </button> */}

                                    <button onClick={()=>updateBlog(blog)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                                            <rect width="44" height="44" rx="3" fill="#FAC406"/>
                                            <path d="M24.6438 13.6683C25.1811 13 25.0733 12.0241 24.4029 11.4885C23.7327 10.9529 22.7539 11.0605 22.2169 11.7287L24.6438 13.6683ZM11.2001 27.9136L12.378 28.9261C12.3901 28.9121 12.402 28.8978 12.4137 28.8833L11.2001 27.9136ZM10.8455 28.7779L9.29334 28.6768L9.29197 28.7061L10.8455 28.7779ZM10.5552 35.0281L9.00166 34.9563C8.99809 35.0332 9.00027 35.1103 9.00821 35.1871L10.5552 35.0281ZM12.1872 36.4485L12.238 37.9983C12.3417 37.9948 12.4448 37.9811 12.5458 37.9572L12.1872 36.4485ZM18.408 34.9784L18.7668 36.4873L18.7908 36.4813L18.408 34.9784ZM19.2064 34.474L20.4062 35.4608L20.4197 35.4441L19.2064 34.474ZM32.9443 19.8713C33.4816 19.2031 33.374 18.2272 32.704 17.6914C32.034 17.1556 31.0551 17.2629 30.5178 17.9311L32.9443 19.8713ZM22.2233 11.7283C21.686 12.3964 21.7934 13.3723 22.4636 13.9082C23.1336 14.444 24.1124 14.3368 24.6498 13.6687L22.2233 11.7283ZM26.7295 8.60475L27.9428 9.57495C27.9631 9.54954 27.9828 9.52349 28.0017 9.49684L26.7295 8.60475ZM30.1074 7.94314L31.1023 6.75132C31.0528 6.71022 31.0007 6.67224 30.9466 6.63757L30.1074 7.94314ZM34.7461 11.7929L35.8468 10.6974C35.813 10.6637 35.7777 10.6316 35.741 10.6011L34.7461 11.7929ZM34.7275 15.1795L33.6388 14.0721C33.5948 14.1152 33.5534 14.1608 33.5146 14.2088L34.7275 15.1795ZM30.5178 17.9311C29.9801 18.5989 30.0877 19.5742 30.7575 20.1103C31.4273 20.6464 32.4067 20.5391 32.9443 19.8713L30.5178 17.9311ZM24.9746 12.4687C24.8473 11.6218 24.0555 11.038 23.2062 11.165C22.3566 11.2919 21.7712 12.0814 21.8986 12.9283L24.9746 12.4687ZM31.9405 20.4376C32.7915 20.3224 33.3877 19.5409 33.2722 18.6924C33.1565 17.8437 32.3729 17.2493 31.5216 17.3646L31.9405 20.4376ZM22.2169 11.7287L9.98657 26.9438L12.4137 28.8833L24.6438 13.6683L22.2169 11.7287ZM10.0222 26.901C9.59225 27.3982 9.3362 28.0216 9.29334 28.6768L12.3974 28.8788C12.3963 28.8961 12.3895 28.9129 12.378 28.9261L10.0222 26.901ZM9.29197 28.7061L9.00166 34.9563L12.1088 35.0998L12.3991 28.8496L9.29197 28.7061ZM9.00821 35.1871C9.17757 36.8243 10.5881 38.0521 12.238 37.9983L12.1363 34.8986C12.1297 34.8988 12.1264 34.8978 12.1243 34.897C12.1213 34.8959 12.1174 34.8939 12.1134 34.8904C12.1094 34.8868 12.1068 34.8833 12.1053 34.8806C12.1043 34.8786 12.1029 34.8755 12.1022 34.8689L9.00821 35.1871ZM12.5458 37.9572L18.7668 36.4873L18.0493 33.4695L11.8285 34.9396L12.5458 37.9572ZM18.7908 36.4813C19.4243 36.3209 19.9902 35.9636 20.4062 35.4608L18.0066 33.4871C18.0116 33.4813 18.018 33.4772 18.0252 33.4753L18.7908 36.4813ZM20.4197 35.4441L32.9443 19.8713L30.5178 17.9311L17.9931 33.5039L20.4197 35.4441ZM24.6498 13.6687L27.9428 9.57495L25.5162 7.63458L22.2233 11.7283L24.6498 13.6687ZM28.0017 9.49684C28.2891 9.08928 28.8475 8.97989 29.2682 9.24873L30.9466 6.63757C29.1233 5.47259 26.7032 5.94659 25.4573 7.71269L28.0017 9.49684ZM29.1125 9.13495L33.7512 12.9847L35.741 10.6011L31.1023 6.75132L29.1125 9.13495ZM33.6454 12.8884C33.8028 13.0457 33.8907 13.2593 33.8895 13.4816L36.9999 13.4986C37.0057 12.4489 36.5906 11.4404 35.8468 10.6974L33.6454 12.8884ZM33.8895 13.4816C33.8885 13.7039 33.7981 13.9165 33.6388 14.0721L35.8161 16.287C36.568 15.5522 36.9941 14.5483 36.9999 13.4986L33.8895 13.4816ZM33.5146 14.2088L30.5178 17.9311L32.9443 19.8713L35.9403 16.1503L33.5146 14.2088ZM21.8986 12.9283C22.6229 17.7484 27.0967 21.0938 31.9405 20.4376L31.5216 17.3646C28.3637 17.7924 25.447 15.6112 24.9746 12.4687L21.8986 12.9283Z" fill="#1C1D1D"/>
                                        </svg>
                                    </button>

                                    <button onClick={()=>deleteBlog(blog.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                                            <g id="Delete Btn">
                                                <rect id="Rectangle 55" width="44" height="44" rx="3" fill="#FAC406"/>
                                                <path id="Vector" d="M8.7274 32.7273C8.02446 33.4302 8.02446 34.5698 8.7274 35.2727C9.43033 35.9757 10.57 35.9757 11.273 35.2727L8.7274 32.7273ZM23.2729 23.2727C23.9759 22.5698 23.9759 21.4302 23.2729 20.7273C22.57 20.0243 21.4304 20.0243 20.7275 20.7273L23.2729 23.2727ZM20.7275 20.7273C20.0245 21.4302 20.0245 22.5698 20.7275 23.2727C21.4304 23.9757 22.57 23.9757 23.2729 23.2727L20.7275 20.7273ZM35.2729 11.2728C35.9759 10.5699 35.9759 9.43014 35.2729 8.72721C34.57 8.02427 33.4304 8.02427 32.7275 8.72721L35.2729 11.2728ZM23.2729 20.7273C22.57 20.0243 21.4304 20.0243 20.7275 20.7273C20.0245 21.4302 20.0245 22.5698 20.7275 23.2727L23.2729 20.7273ZM32.7275 35.2727C33.4304 35.9757 34.57 35.9757 35.2729 35.2727C35.9759 34.5698 35.9759 33.4302 35.2729 32.7273L32.7275 35.2727ZM20.7275 23.2727C21.4304 23.9757 22.57 23.9757 23.2729 23.2727C23.9759 22.5698 23.9759 21.4302 23.2729 20.7273L20.7275 23.2727ZM11.273 8.72721C10.57 8.02427 9.43033 8.02427 8.7274 8.72721C8.02446 9.43014 8.02446 10.5699 8.7274 11.2728L11.273 8.72721ZM11.273 35.2727L23.2729 23.2727L20.7275 20.7273L8.7274 32.7273L11.273 35.2727ZM23.2729 23.2727L35.2729 11.2728L32.7275 8.72721L20.7275 20.7273L23.2729 23.2727ZM20.7275 23.2727L32.7275 35.2727L35.2729 32.7273L23.2729 20.7273L20.7275 23.2727ZM23.2729 20.7273L11.273 8.72721L8.7274 11.2728L20.7275 23.2727L23.2729 20.7273Z" fill="#1C1D1D"/>
                                            </g>
                                        </svg>   
                                    </button>

                                </div>
                            </div>
                        // </div>
                    )
                })}
            </div >

            {/* <div className="Analytics">
                <h3 id="section-heading" style={{paddingLeft: "0px"}}>Analytics</h3>
                <div className="analyticsBody">
                    <div className="analyticsCard BlogCardUser my-5 p-4">

                        <table>
                            <tr>
                                <th>Total Blogs</th>
                                <th>Total Blogs</th>
                            </tr>
                            <tr>
                                <td>{BlogsList.length}</td>
                                <td>{BlogsList.length}</td>
                            </tr>
                        </table>
                    <table>
                        <div className="row">
                            <div className="col"> Total Blogs </div>
                            <div className="col"> {BlogsList.length} </div>
                        </div>
                        <div className="row">
                            <div className="col"> Total Blogs </div>
                            <div className="col"> {BlogsList.length} </div>
                        </div>
                    </table>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

ReadBlogs.defaultProps = {
    lim : 3,
    title : "Recent Blogs",
    condition: false
}