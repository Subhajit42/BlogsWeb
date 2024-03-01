import React from 'react'
import './componentsCss/NotSignedUp.css'
import { useNavigate } from 'react-router-dom'

export default function NotSignedUp() {

  const navigator = useNavigate();

  return (
    <>
      <div className="NotSignedBg">
        <div className="headingElement" id="NotSigned">
            <h3>Please SignUp or LogIn to continue.</h3>
            <div className='utility-btns'>
              <button className='btn btn-dark' onClick={()=>navigator('/sign-in')}>SignIn</button>
              <button className='btn btn-dark' onClick={()=>navigator('/log-in')}>LogIn</button>
            </div>
        </div>
      </div>
    </>
  )
}
