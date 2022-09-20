const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const countryEl = document.querySelector('#ddcountry');
// const feedbackEl = document.querySelector('#my-input');

const letters = /^[A-Za-z]+$/;

const form = document.querySelector('#contact');


const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'You must enter our names.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `A name must be between ${min} and ${max} characters.`)
    } else if (!letters.test(username)) {
        alert('Name field requires only alphabet characters');
    }
    else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkCountry = () => {

    let valid = false;

    const ddcountry = countryEl.value.trim();

    if (!isRequired(ddcountry)) {
        // alert("Please select the user role!");
        showError(countryEl, 'Please select your country!');
        return false;
    }
    else {
        showSuccess(countryEl);
        valid = true;
    }
    return valid;
};


const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail();
    isCountyValid = checkCountry();

    let isFormValid = isUsernameValid &&
        isEmailValid && isCountyValid;


    // submit to the server if the form is valid
    if (isFormValid) {
        alert('Thank You for Registration & You are Redirecting to the landing page');
        // Redirecting to other page or webste code. 
        window.location = "https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/";
    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'ddcountry':
            checkCountry();
            break;
    }
}));
