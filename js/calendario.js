const days = document.querySelector("#days");
const currentDate = document.querySelector("#current-date");

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const displayCalendar = () => {
    let firstWeekDayMonth
    let firstDate
    let test = new Date(currentYear, currentMonth + 1, 0)
}