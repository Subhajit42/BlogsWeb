import React from 'react'
import NewNavbar from './NewNavbar'
import { useLocation } from 'react-router-dom';
import './componentsCss/Blog.css';

export default function Blog(props) {

    // const qwerty = props.location;
    const location = useLocation();
    const { Title, UserId, Dated, Time, Content } = location.state;
    
    return (
        <>
            <NewNavbar />
            <div className="mainBody">
                <div className="blog-head">
                    <div className="blog-info">
                        <h2 id='blog-title'>{Title}</h2>
                        <div className="line-author"></div>
                        <h5 id='blog-author'><small>By -{UserId}</small></h5>
                    </div>

                    
                    <div className="extra-info">
                        <h5 id='blog-timestamp'>{Dated}, {Time}</h5>
                    </div>
                </div>
                <div className="line"></div>

                <p id='blog-content'>
                    {Content}
                </p>
            </div>
        </>
    )
}
