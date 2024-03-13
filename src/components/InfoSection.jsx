import React from 'react'
import vector1 from './assets/Info-vector-1.svg'
import vector2 from './assets/Info-vector-2.svg'
import './componentsCss/InfoSection.css'

export default function InfoSection() {
  return (
    <>
        <div className="info-section">
            <div className="info-1">
                <div className="vector-info-1">
                    <img src={vector1} alt="vector1" />
                    <div className="container content-info-1">
                        <center>Write your side of story and experiences and let people know what’s best.</center>
                    </div>
                </div>
            </div>
            
            <div className="info-2">
                <div className="vector-info-2">
                    <img src={vector2} alt="vector2" />
                    <div className="container content-info-2">
                        <center>Find like mided people who share the same thoughts and experiences as you.</center>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
