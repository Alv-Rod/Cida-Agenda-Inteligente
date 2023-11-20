const carousel = document.querySelector('#event-carousel');
const slides = document.querySelectorAll('.event-card');
// const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.getElementById('btn-next')

btnNext.addEventListener('click', () => {
    console.log("Pressed btn next");
    let slide = slides[0];
    carousel.scrollLeft += carousel.offsetWidth;
})

btnPrev.addEventListener('click', () => {
    console.log('pressed')
})