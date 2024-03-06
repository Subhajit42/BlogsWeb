import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './componentsCss/CalenderWB.css'

export default function CalendarWB() {
	const [value, onChange] = useState(new Date());

	function changingCSS(){
		// const elements = document.getElementsByClassName('react-calendar__tile');
		const elements = document.getElementsByClassName('react-calendar__viewContainer');

		// imp - elements[0].childNodes[0]

		// for (let i = 0; i < elements?.length; i++) {
		// 	if (elements[i].classList.contains('react-calendar__month-view__days__day--neighboringMonth') 
		// 		|| elements[i].classList.contains('react-calendar__month-view__days__day--weekend') ){
		// 	}else{
		// 		if (elements[i].style.color == "" ){
		// 			elements[i].style.color = 'white';
		// 		}
		// 	}
		// }


		for (let i = 0; i < elements?.length; i++) {
			if (elements[i].classList.contains('react-calendar__month-view__days__day--neighboringMonth') 
				|| elements[i].classList.contains('react-calendar__month-view__days__day--weekend') ){
			}else{
				if (elements[i].style.color == "" ){
					elements[i].style.color = 'white';
				}
			}
		}


	}

	// useEffect(()=>{ changingCSS(); }, []);

	return (
		<div>
			<Calendar
				onChange={onChange}
				value={value}
			/>
			{/* {console.log("first")} */}
		</div>
	);
}