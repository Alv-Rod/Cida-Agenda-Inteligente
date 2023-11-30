import { addData } from "../database/addData.js";
import { currentMonth, currentYear, displayCalendar } from "./displayCalendar.js";

export function eventForm(dayItem) {
    const dayValue = dayItem.querySelector('.date-value').textContent;
    const submitButton = document.querySelector('#event-submit');
    const dropdown = document.querySelector('#event-type');
    const dropdownTop = document.querySelector('#type-top')
    const options = document.querySelectorAll('#event-type ul li')
    const selectedType = document.querySelector('#type-selected');

    const eventAddForm = document.querySelector('#event-add-form');

    dropdownTop.addEventListener('click', (event) =>{
            dropdown.classList.toggle('active');
    })
    options.forEach(option => {
        option.addEventListener('click', () => {
            selectedType.textContent = option.textContent;
            document.querySelector('#event-type').classList.remove('active');
        })
    });

    if (eventAddForm) {
        const dateStart = document.querySelector('#date-start'),
        dateEnd = document.querySelector('#date-end'),
        eventAllDay = document.querySelector('#all-day');
    
        eventAllDay.addEventListener('change', () => {
            if (eventAllDay.checked) {
                dateStart.disabled = true;
                dateEnd.disabled = true;
            } else {
                dateStart.disabled = false;
                dateEnd.disabled = false;
            }
        })


    }
   
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
            eventDay: `${currentYear}-${currentMonth + 1}-${dayValue}`,
            eventDescription: eventDescription.value.trim() !== '' ? eventDescription.value : 'Sem Descrição',
            eventStart: eventAllDay.checked !== true ? dateStart.value : null,
            eventEnd: eventAllDay.checked !== true ? dateEnd.value : null,
            eventIsAllDay: eventAllDay.checked,
            eventType: eventType !== 'Tipo' ? eventType : 'Outro'
        }
        console.log(newEvent);
        addData(dayItem, newEvent);
    });
}