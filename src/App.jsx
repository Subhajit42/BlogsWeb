import HomePage from "./components/HomePage";
import MyBlogs from "./components/UserBlogs";
import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
// import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <SignIn />
      <LogIn />
      <HomePage />
      <MyBlogs />
    </>
  )
}

export default App
