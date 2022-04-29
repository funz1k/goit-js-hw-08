const throttle = require('lodash.throttle');


const STORAGE_KEY = 'feedback-form-state';
const formData = {};


const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('input[name="email"]'),
    textarea: document.querySelector('textarea[name="message"]'),
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormData, 500));

populatedTextarea();

function onFormSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset()
    localStorage.removeItem(STORAGE_KEY)
}

function onFormData(e) {

    console.log(formData);
    if (localStorage.STORAGE_KEY) {
        const parseData = JSON.parse(localStorage.getItem(STORAGE_KEY))
        formData = { ...parseData };
        formData[e.target.name] = e.target.value
        console.log(formData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    } else {
        formData[e.target.name] = e.target.value
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }
}

function populatedTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY)
    if (savedMessage) {
        const parseMessage = JSON.parse(savedMessage)
        refs.textarea.value = parseMessage.message || ''
        refs.input.value = parseMessage.email || ''
    }
}