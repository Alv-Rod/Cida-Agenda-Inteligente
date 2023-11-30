import { fetchNextEvents } from "./database/eventsModule.js";

let eventsToDisplay = await fetchNextEvents();

const templatePlaceholder = document.querySelector('#event-placeholder-template').content,
templateEventCard = document.querySelector('#event-card-template').content;
const carousel = document.querySelector('#event-carousel');
const slides = document.querySelectorAll('.event-card');

function createEventCards() {
    if (eventsToDisplay.length === 0) {
        const eventPlaceholder = document.importNode(templatePlaceholder, true);
        carousel.appendChild(eventPlaceholder);
    }

    eventsToDisplay.forEach(event => {
        let eventCard = document.importNode(templateEventCard, true);
        let dateString = event.eventDay,
        date = new Date(dateString),
        day = date.getDate(),
        month = date.getMonth() + 1;

        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        const dateToDisplay = `${day}/${month}`;

        let startTimeString = event.eventStart,
        endTimeString = event.eventEnd,
        tempStartDate = new Date(`1970-01-01T${startTimeString}Z`),
        tempEndDate = new Date(`1970-01-01T${endTimeString}Z`);

        const formattedStart = tempStartDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        const formattedEnd = tempEndDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        let eventTime = `${formattedStart} - ${formattedEnd}`;

        if (event.eventIsAllDay == 1) {
            eventTime = 'Dia Todo'
        }

        eventCard.querySelector('.title').textContent = event.eventName;
        eventCard.querySelector('.event-date').textContent = dateToDisplay;
        eventCard.querySelector('.event-description p').textContent = event.eventDescription;
        eventCard.querySelector('.event-time').textContent = eventTime;
        eventCard.querySelector('.event-type').textContent = event.eventType;
        carousel.appendChild(eventCard);
    });

}

createEventCards();

const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next')

btnNext.addEventListener('click', () => {
    console.log("Pressed btn next");
    let slide = slides[0];
    carousel.scrollLeft += carousel.offsetWidth;
})

btnPrev.addEventListener('click', () => {
    console.log('pressed btn prev');
    let slide = slides[0];
    carousel.scrollLeft -= carousel.offsetWidth;
})


