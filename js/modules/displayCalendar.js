import { eventForm } from "./eventForm.js";
import { fetchEventsWhere } from "../database/eventsModule.js";

let currentDate = new Date();
export let currentYear = currentDate.getFullYear();
export let currentMonth = currentDate.getMonth();
const daysContainer = document.querySelector("#days");
const templateSummaryContainer = document.getElementById('event-summary-template').content;
const templateAdd = document.getElementById('event-add-template').content;
const templateSummaryItem = document.getElementById('summary-item-template').content;

let highlightedDay = null;

export const displayCalendar = async (nextOrPrev) => {

    
    if (nextOrPrev === 'next') {
        currentMonth += 1;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
        }
    } else if (nextOrPrev === 'prev') {
        currentMonth -= 1;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        }
    } else {
        currentMonth = currentMonth;
    }

    daysContainer.innerHTML = '';

    const firstWeekDay = new Date(currentYear, currentMonth, 1).getDay(); //getDay returns week day (0 to 6)
    const daysinMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //getDate returns 
    const daysinPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    const lastWeekDayofMonth = new Date(currentYear, currentMonth + 1, 0).getDay();

    let daysPrevMonthToShow = firstWeekDay === 0 ? 6 : firstWeekDay - 1;

    for (let i = 0; i <= daysPrevMonthToShow; i++) {
        let prevDayItem = document.createElement('li');
        prevDayItem.className = 'day';
        let prevDay = document.createElement('div')
        prevDay.className = 'date-value';
        prevDay.textContent = daysinPrevMonth - daysPrevMonthToShow + i;
        prevDayItem.classList.add('previous-month');
        prevDayItem.appendChild(prevDay)
        daysContainer.appendChild(prevDayItem);
    }


    for (let date = 1; date <= daysinMonth; date++) {
        const dayItem = document.createElement('li');
        dayItem.className = 'day';
        let day = document.createElement('div');
        day.className = 'date-value';
        day.textContent = date;

        console.log('calendar date: ', currentMonth, 'current date: ',new Date().getMonth());

        if (currentMonth === new Date().getMonth()) {
            if (date === currentDate.getDate()) {
                dayItem.classList.add('current-day');
            }
        }

        

        

        dayItem.appendChild(day)
        daysContainer.appendChild(dayItem);
        
        await displayEventsInCalendar(dayItem, `${currentYear}-${currentMonth + 1}-${date}`);
        
        // console.log(events)

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
            nextDay.className = 'date-value';
            nextDayItem.appendChild(nextDay)
            daysContainer.appendChild(nextDayItem);
            updateCalendarSize();
        }
    }
}


function updateCalendarSize() {
    let allDays = document.querySelectorAll('.day')
    if (allDays.length <= 35) {
        console.log('got here')
        daysContainer.style.gridTemplateRows = 'repeat(5, 1.5fr)';
    } else if (allDays.length > 35) {
        daysContainer.style.gridTemplateRows = 'repeat(6, 1.5fr)';
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
        displayEventSummaryElement();
        
    } else {
        highlightedDay = null;
        closeEventPopup();
    }
    
}

async function displayEventSummaryElement() {
    closeEventPopup();

    const eventElement = document.importNode(templateSummaryContainer, true);

    const eventDay = `${currentYear}-${currentMonth + 1}-${highlightedDay.querySelector('.date-value').textContent}`
    const events = await fetchEventsWhere(eventDay);

    highlightedDay.appendChild(eventElement);
    
    let eventSummaryContainer = document.querySelector('.event-popup');

    console.log(events)
    for (let i = 0; i <= 2; i++) {
        let event = events[i];
        // console.log(event)
        if (event) {
            let eventSummaryItem = document.importNode(templateSummaryItem, true);
            eventSummaryContainer.querySelector('.events-summary').appendChild(eventSummaryItem);
            let currentSummary = document.querySelectorAll('.display-event')[i];
            currentSummary.querySelector('.display-event-name').textContent = event.eventName;
            currentSummary.querySelector('.display-event-type').textContent = event.eventType;
            currentSummary.querySelector('.display-event-description').textContent = event.eventDescription;
        }
    }

    document.querySelector('.event-popup').scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: 'nearest'
    })
    const newEventBtn = document.querySelector('#add-event');
    newEventBtn.addEventListener('click', () => {
        displayAddEventForm();
    })
    const closeButtons = document.querySelectorAll('.close-btn');

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('got here')
            highlightedDay = null;
            closeEventPopup();
        })
    });

}

function displayAddEventForm() {
    const eventElement = document.querySelector('.event-popup');
    const eventAddElement = document.importNode(templateAdd, true);
    eventElement.replaceWith(eventAddElement);
    const closeButtons = document.querySelectorAll('.close-btn');

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('got here')
            highlightedDay = null;
            closeEventPopup();
        })
    });
    eventForm(highlightedDay);
}

export function closeEventPopup() {
    const eventPopupElement = document.querySelector('.event-popup');

    if (eventPopupElement) {
        eventPopupElement.remove();
    }
}

const eventsByDay = {}

async function displayEventsInCalendar(dayItem, eventDay) {
    try {
        const events = await fetchEventsWhere(eventDay);

        // Use the fetched events directly, don't overwrite the eventsByDay
        displayEvents(dayItem, events);

        return events;
    } catch (error) {
        console.error(error);
        return [];
    }
}

function displayEvents(dayItem, events) {
    for (let i = 0; i < Math.min(events.length, 4); i++) {
        // console.log('got here', events)
        const eventDiv = document.createElement('div');
        eventDiv.textContent =  `${events[i].eventName}`;
        eventDiv.className = 'event-wrapper';
        dayItem.appendChild(eventDiv);
    }
}

export async function updateCalendarEvents(dayItem, event) {
    const eventDay = `${currentYear}-${currentMonth + 1}-${dayItem.querySelector('.date-value').textContent}`;
    let events = eventsByDay[eventDay];

    if (!events){
        events = []
    }

    if (events) {
        events.push(event);
        displayEvents(dayItem, events);
    }
}


