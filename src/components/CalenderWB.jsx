import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './componentsCss/CalenderWB.css'

export default function CalendarWB() {
	const [value, onChange] = useState(new Date());

	// function changingCSS(){
		
	// 	const elements = document.getElementsByClassName('react-calendar__viewContainer');

	// 	for (let i = 0; i < elements?.length; i++) {
	// 		if (elements[i].classList.contains('react-calendar__month-view__days__day--neighboringMonth') 
	// 			|| elements[i].classList.contains('react-calendar__month-view__days__day--weekend') ){
	// 		}else{
	// 			if (elements[i].style.color == "" ){
	// 				elements[i].style.color = 'white';
	// 			}
	// 		}
	// 	}


	// }


	return (
		<div>
			<Calendar
				onChange={onChange}
				value={value}
			/>
		</div>
	);
}