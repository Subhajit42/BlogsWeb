import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
import HomePage from "./components/HomePage";
import LogIn from "./components/LogIn.jsx";
import SignIn from "./components/SignIn.jsx";
// import ReadBlogs from "./components/ReadBlogs.jsx";

import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import ErrorNotFound from './components/ErrorNotFound.jsx'
import UserSpace from './components/UserSpace.jsx';
// import SearchBlogs from './components/SearchBlogs.jsx';
import ReadBlogsUser from './components/ReadBlogsUser.jsx';
// import Blogs from './components/CreateBlogs.jsx';
import UserBlogs from './components/UserBlogs.jsx';


const router = createBrowserRouter([
  { path: '/',
    element: <HomePage />,
    errorElement: <ErrorNotFound />
  },{
    path: '/sign-in',
    element: <SignIn />
    
  },{
    path: '/log-in',
    element: <LogIn />
  },{
    path: '/user',
    element: <UserSpace />
  },{
    path: "/update-blog",
    element: <UserBlogs />
    // element: <Blogs />
  }
  ,{
    path: '/test',
    // element: <ReadBlogs condition={false}/>
    // element: <SearchBlogs />
    element: <ReadBlogsUser />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
