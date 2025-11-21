import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    form: document.querySelector('.form')
}


function handleClick(e) {
    e.preventDefault();
    const delay = +refs.form.elements.delay.value;
    const state = refs.form.elements.state.value;
    const promise = new Promise((res, rej) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                res()
            } else {
                rej()
            }
        }, delay);
    });
    promise
        .then(value => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`
            })
        })
        .catch(error => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`
            })
        })
    
}
refs.form.addEventListener('submit', handleClick);