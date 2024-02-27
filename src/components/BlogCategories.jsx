import React from 'react'
import BooksBlog from './assets/BooksBlog.png';
import FoodsBlog from './assets/FoodsBlog.png';
import TravelBlog from './assets/TravelBlog.png';
import PersonalBlog from './assets/PersonalBlog.png';
import SportsBlog from './assets/SportsBlog.png';
import './componentsCss/BlogCategories.css';

export default function BlogCategories() {
  return (
    <>
        <h3>Categories</h3>
        <div className="container">
            <img src={BooksBlog} alt="Books-Blog" />
            <img src={FoodsBlog} alt="Foods-Blog" />
            <img src={TravelBlog} alt="Travel-Blog" />
            <img src={PersonalBlog} alt="Personal-Blog" />
            <img src={SportsBlog} alt="Sports-Blog" />

        </div>
    </>
  )
}
