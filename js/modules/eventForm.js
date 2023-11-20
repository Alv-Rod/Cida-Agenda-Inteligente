import { database } from "../server.js";

export function eventForm() {
    const submitButton = document.querySelector('#event-submit');
    const dropdown = document.querySelector('#event-type');
    const dropdownContent = document.querySelector('#event-type ul')
    const options = document.querySelectorAll('#event-type ul li')
    const selectedType = document.querySelector('#type-selected');


    options.forEach(option => {
        option.addEventListener('click', () => {
            console.log('got here')
            selectedType.textContent = option.textContent;
        })
    });

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        let eventName = document.querySelector('#event-name'),
        eventDescription = document.querySelector('#event-description'),
        dateStart = document.querySelector('#date-start'),
        dateEnd = document.querySelector('#date-end'),
        eventAllDay = document.querySelector('#all-day'),
        eventType = selectedType !== 'Tipo' ? selectedType.textContent : '';
        
        if (eventName.value.trim() === '') {
            console.log('err: no event name');
            return
        }
        if (!dateStart && !dateEnd && !eventAllDay.checked) {
            console.log ('err: no event date given or all day checked');
            return
        }
        let newEvent = {
            eventName: eventName.value,
            eventDescription: eventDescription.value.trim() !== '' ? eventDescription.value : 'Sem Descrição',
            eventStart: eventAllDay.checked !== true ? dateStart : 'Dia todo',
            eventEnd: eventAllDay.checked !== true ? dateEnd : 'Dia todo',
            eventType: eventType
        }
        console.log(newEvent);
        database(newEvent);
    });
}
