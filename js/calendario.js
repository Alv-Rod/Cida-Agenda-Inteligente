import { closeEventPopup, displayCalendar } from "./modules/displayCalendar.js";

let currentDate = new Date(),
currentMonth = currentDate.getMonth(),
currentYear = currentDate.getFullYear();

await displayCalendar();
assignWeek()
displayCurrentDate()

const nextMonthBtns = document.querySelectorAll('.next-month');
const prevMonthBtns = document.querySelectorAll('.prev-month');

nextMonthBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        await displayCalendar('next')
        assignWeek()
        currentMonth += 1;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
        }
        currentDate = new Date(currentYear, currentMonth, 1);
        displayCurrentDate(currentDate)
    })
});
prevMonthBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        await displayCalendar('prev')
        assignWeek()
        currentMonth -= 1;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        }
        currentDate = new Date(currentYear, currentMonth, 1)
        displayCurrentDate(currentDate)
    })
});

function assignWeek() {
    let dayList = document.querySelectorAll(".day");
    let dayItem = document.querySelectorAll(".day .date-value")
    let weekList = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

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
}

function displayCurrentDate(currentDate) {
    const currentDateDisplay = document.querySelector("#current-date");
    let currentDateValue = new Intl.DateTimeFormat('pt-BR', {month: 'long', year: 'numeric'}).format(currentDate); 
    currentDateValue = currentDateValue.charAt(0).toUpperCase() + currentDateValue.slice(1);
    currentDateDisplay.textContent = currentDateValue;
}


const closeButtons = document.querySelectorAll('.close-btn');

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('got here')
        closeEventPopup();
    })
});



const currentDateDisplay = document.querySelector("#current-date");
let currentDateValue = new Intl.DateTimeFormat('pt-BR', {month: 'long', year: 'numeric'}).format(currentDate); 
currentDateValue = currentDateValue.charAt(0).toUpperCase() + currentDateValue.slice(1);
currentDateDisplay.textContent = currentDateValue;