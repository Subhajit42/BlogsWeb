import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from "./components/HomePage";
import LogIn from "./components/LogIn.jsx";
import SignIn from "./components/SignIn.jsx";

import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import ErrorNotFound from './components/ErrorNotFound.jsx'
import UserSpace from './components/UserSpace.jsx';
import UserBlogs from './components/UserBlogs.jsx';
import Blog from './components/Blog.jsx';


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
  },
  {
    path: "/write-blog",
    element: <UserBlogs />
  }
  ,{
    path: "/update-blog",
    element: <UserBlogs />
  }
  ,{
    path: '/blog',
    element: <Blog />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
