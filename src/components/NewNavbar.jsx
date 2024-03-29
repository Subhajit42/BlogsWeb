import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import Logo from './assets/Logo.png'
import './componentsCss/NewNavbar.css'

export default function NewNavbar() {

  let navigate = useNavigate();

  const ToSignUp = () =>{
      if (window.location.pathname == "/sign-in") return;
      let path = `/sign-in`; 
      navigate(path);
  }
  const ToLogIn = () =>{
      if (window.location.pathname == "/log-in") return;
      let path = `/log-in`; 
      navigate(path);
  }
  const SignOut = async () =>{
          try {
              await signOut(auth).then(console.log("SignOut Successful")).then(navigate('/'));
              
          } catch (err) {
              console.error(err);
          }
      navigate('/');
  }

    // document.addEventListener('DOMContentLoaded', function() {
    //     // console.log("loaded");
    //     const navBtn = document.getElementsByClassName("navbar-toggler")[0];
    //     navBtn.addEventListener('click', function() {
    //             console.log("clicked");
    //     });
    // });

    const navBtn = () =>{
        const collapseBtn = document.getElementsByClassName("navbar-toggler")[0];
        const navbar = document.getElementsByClassName("navbar")[0];
        if (collapseBtn?.getAttribute("aria-expanded") == "true") {
            navbar.style.backgroundColor = "rgba(0,0,0,0.8)";
        }else{
            navbar.style.backgroundColor = "rgba(0,0,0,0)";
        }
    }


  return (
    <>
        <div className="navbar navbar-expand-lg">
            <div className="logo" style={{display:"contents"}}>
                <a href="/">
                    <img src={Logo} alt="Logo" style={{height:"45px",marginLeft:"13px"}}/>
                </a>
            </div>
            <button onClick={navBtn} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            


        <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <div className="navbar-items">
                <a href="/#section-title">Home</a>
                <a href="/user">Profile</a>
                <a href="/#search-section">Search</a>
                {/* <a href="#">Featured</a> */}
                <a href="/#AboutUs">About Us</a>

            </div>

            <div className="utility-btns-navbar">
              { !(auth?.currentUser?.email) && 
                  <>
                      <button type="button" className="btn btn-warning mx-2" onClick={ToSignUp}>SignUp</button>
                      <button type="button" className="btn btn-warning mx-2" onClick={ToLogIn}>LogIn</button>
                  </>
              }

              {auth?.currentUser?.email && 
                  <button className="btn btn-warning" onClick={SignOut}>SignOut</button>
              }
            </div>
        </div>
        </div>
    </>
  )
}
