import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]')
}

refs.startBtn.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: 'topRight',
      });
      refs.startBtn.disabled = true;
      
    } else {
      refs.startBtn.disabled = false;
      
    }
  },
};

flatpickr("#datetime-picker", options);

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) return;
    this.isActive = true;
    refs.startBtn.disabled = true;
    refs.input.disabled = true;
   
    this.intervalId = setInterval(() => {
      const currentTime = new Date();
      const diffMS = userSelectedDate - currentTime;
      
      if (diffMS <= 0) {
        clearInterval(this.intervalId);
        this.isActive = false;
        refs.input.disabled = false;
        return;
      }
      const result = convertMs(diffMS);
      
      refs.days.textContent = result.days.toString().padStart(2, '0');
      refs.hours.textContent = result.hours.toString().padStart(2, '0');
      refs.minutes.textContent = result.minutes.toString().padStart(2, '0');
      refs.seconds.textContent = result.seconds.toString().padStart(2, '0');
    }, 1000);
  },
}

refs.startBtn.addEventListener('click', () => timer.start());

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
