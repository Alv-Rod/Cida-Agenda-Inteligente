import { closeEventPopup, updateCalendarEvents } from "../modules/displayCalendar.js";

export function addData(dayItem, data) {
    fetch('http://localhost:5505/addData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response =>{
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(result);
        updateCalendarEvents(dayItem, data);
        closeEventPopup();
    })
    .catch(error => {
        console.error(error);
    });
}

