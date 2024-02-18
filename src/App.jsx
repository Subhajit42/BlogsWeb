import HomePage from "./components/HomePage";
import MyBlogs from "./components/MyBlogs";
import LogIn from "./components/logIn";
import Navbar from "./components/navbar";
import SignIn from "./components/signIn";
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
