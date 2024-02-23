import React from 'react'
import { useNavigate} from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

export default function navbar() {

    let navigate = useNavigate();
    const ToSignIn = () =>{
        let path = `/sign-in`; 
        navigate(path);
    }
    const ToLogIn = () =>{
        let path = `/log-in`; 
        navigate(path);
    }
    const SignOut = async () =>{
            try {
                console.log(auth?.currentUser?.email)
                await signOut(auth).then(console.log("SignOut Successful")).then(navigate('/'));
                
            } catch (err) {
                console.error(err);
            }
        navigate('/');
    }

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">BlogsWeb</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/user">Profile</a>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>
                </ul>
                <form className="d-flex">
                    {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button> */}
                    {/* Sign In button */}
                    { !(auth?.currentUser?.email) && 
                        <>
                            <button className="btn btn-primary mx-2" onClick={ToSignIn}>SignIn</button>
                            <button className="btn btn-primary mx-2" onClick={ToLogIn}>LogIn</button>
                        </>
                    }

                    {auth?.currentUser?.email && 
                        <button className="btn btn-primary" onClick={SignOut}>SignOut</button>
                    }

                </form>
                </div>
            </div>
        </nav>
    </>
  )
}
