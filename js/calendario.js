import { displayCalendar } from "./modules/displayCalendar.js";

let currentDate = new Date();

displayCalendar();

const daysContainer = document.querySelector("#days");
const dayList = document.querySelectorAll(".day");
let dayItem = document.querySelectorAll(".day > div")
const weekList = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

for (let day = 0; day < dayList.length; day++) {
    if (day <= 6){
        let weekDayWrapper = document.createElement('div');
        let weekDay = document.createElement('p');
        weekDay.textContent = weekList[day];
        weekDayWrapper.appendChild(weekDay);
        weekDayWrapper.className = 'week-day'
        dayList[day].insertBefore(weekDayWrapper, dayItem[day]);
    }
}

const currentDateDisplay = document.querySelector("#current-date");
let currentDateValue = new Intl.DateTimeFormat('pt-BR', {month: 'long', year: 'numeric'}).format(currentDate); 
currentDateValue = currentDateValue.charAt(0).toUpperCase() + currentDateValue.slice(1);
currentDateDisplay.textContent = currentDateValue;

// if (highlighted === true) {
//     eventPopup(hlDay)
// } else {
//     eventPopupElement = document.querySelector('.event-popup');
//     eventPopupElement.remove();
// }


// daysContainer.addEventListener('click', () =>{
//     dayList.forEach(day => {
//         if (day.firstChild.textContent !== hlDay.firstChild.textContent) {
//             day.classList.remove('highlighted');
//             highlighted = false;
//         }
//     })
// })