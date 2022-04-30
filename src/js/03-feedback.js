const throttle = require('lodash.throttle');


const STORAGE_KEY = 'feedback-form-state';

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
    if (refs.input.value === '' || refs.textarea.value === '') {
        alert('Все поля формы должны бать заполнены')
    } else {
        e.currentTarget.reset()
        localStorage.removeItem(STORAGE_KEY)
    }

}

function onFormData(e) {
    const parseData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    parseData[e.target.name] = e.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(parseData));
}

function populatedTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    if (savedMessage) {
        const parseMessage = JSON.parse(savedMessage);

        if (parseMessage) {
            Object.keys(parseMessage).forEach((key) => {
                refs.form.elements[key].value = parseMessage[key];
            });
        }
    }
}