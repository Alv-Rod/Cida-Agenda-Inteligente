import { eventForm } from "./eventForm.js";

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
const daysContainer = document.querySelector("#days");

const templateSummary = document.getElementById('event-summary-template').content;
const templateAdd = document.getElementById('event-add-template').content;

let highlightedDay = null;

export const displayCalendar = () => {
    const firstWeekDay = new Date(currentYear, currentMonth, 1).getDay(); //getDay returns week day (0 to 6)
    const daysinMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //getDate returns 
    const daysinPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    const lastWeekDayofMonth = new Date(currentYear, currentMonth + 1, 0).getDay();

    let daysPrevMonthToShow = firstWeekDay === 0 ? 6 : firstWeekDay - 1;

    for (let i = 0; i <= daysPrevMonthToShow; i++) {
        let prevDayItem = document.createElement('li');
        prevDayItem.className = 'day';
        let prevDay = document.createElement('div')
        prevDay.textContent = daysinPrevMonth - daysPrevMonthToShow + i;
        prevDayItem.classList.add('previous-month');
        prevDayItem.appendChild(prevDay)
        daysContainer.appendChild(prevDayItem);
    }

    for (let date = 1; date <= daysinMonth; date++) {
        const dayItem = document.createElement('li');
        dayItem.className = 'day';
        let day = document.createElement('div');
        day.textContent = date;

        if (date === currentDate.getDate()) {
            dayItem.classList.add('current-day');
        }

        dayItem.appendChild(day)
        daysContainer.appendChild(dayItem);

        dayItem.addEventListener('click', (event) => {
            if (!event.target.closest('.event-popup')) {
                handleDayClick(dayItem);
            }
        })

    }
    if (lastWeekDayofMonth < 6) {
        for (let i = 0; i < 6 - lastWeekDayofMonth; i++) {
            let nextDayItem = document.createElement('li');
            nextDayItem.className = 'day';
            nextDayItem.classList.add('next-month');
            let nextDay = document.createElement('div');
            nextDay.textContent = i + 1;
            nextDayItem.appendChild(nextDay)
            daysContainer.appendChild(nextDayItem);
        }
    }
}

function handleDayClick(dayItem) {
    if (highlightedDay) {
        highlightedDay.classList.remove('highlighted');
    }

    if (highlightedDay !== dayItem) {
        closeEventPopup()
        dayItem.classList.add('highlighted');
        highlightedDay = dayItem;
        displayEventElement();
    } else {
        highlightedDay = null;
        closeEventPopup();
    }
    
}

function displayEventElement() {
    closeEventPopup();

    const eventElement = document.importNode(templateSummary, true);
    highlightedDay.appendChild(eventElement);

    const newEventBtn = document.querySelector('#add-event');
    newEventBtn.addEventListener('click', () => {
        displayAddEventForm();
    })
}

function displayAddEventForm() {
    const eventElement = document.querySelector('.event-popup');
    const eventAddElement = document.importNode(templateAdd, true);
    eventElement.replaceWith(eventAddElement);
    eventForm();
}

export function closeEventPopup() {
    const eventPopupElement = document.querySelector('.event-popup');

    if (eventPopupElement) {
        eventPopupElement.remove();
    }
}