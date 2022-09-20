const firstnameEl = document.querySelector('#firstname');
const surnameEL = document.querySelector('#surname');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');
const roleEL = document.querySelector('#role');
const userbranchEl = document.querySelector('#ddbranch');

const letters = /^[A-Za-z _]+$/;

const form = document.querySelector('#signup');


const checkFirstname = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const firstname = firstnameEl.value.trim();

    if (!isRequired(firstname)) {
        showError(firstnameEl, '⛔️ Required.');
    } else if (!isBetween(firstname.length, min, max)) {
        showError(firstnameEl, `⛔️ First name must be between ${min} and ${max} characters.`)
    } else if (!letters.test(firstname)) {
        alert('First name field requires only alphabet characters');
    }
    else {
        showSuccess(firstnameEl);
        valid = true;
    }
    return valid;
};

const checkSurname = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const surname = surnameEL.value.trim();

    if (!isRequired(surname)) {
        showError(surnameEL, '⛔️ Required.');
    } else if (!isBetween(surname.length, min, max)) {
        showError(surnameEL, `⛔️ Surname must be between ${min} and ${max} characters.`)
    } else if (!letters.test(surname)) {
        alert('Surname field requires only alphabet characters');
    }
    else {
        showSuccess(surnameEL);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, '⛔️ Emal is Required');
    } else if (!isEmailValid(email)) {
        showError(emailEl, '⛔️ Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, '⛔️ Enter Password.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, '⛔️ Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, '⛔️ Re-enter password');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, '⛔️ The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};

const checkRole = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const role = roleEL.value.trim();

    if (!isRequired(role)) {
        showError(roleEL, '⛔️ Required.');
    } else if (!isBetween(role.length, min, max)) {
        showError(roleEL, `⛔️ Role must be between ${min} and ${max} characters.`)
    } else if (!letters.test(role)) {
        alert('Role field requires only alphabet characters');
    }
    else {
        showSuccess(roleEL);
        valid = true;
    }
    return valid;
};

const checkBranch = () => {

    let valid = false;

    const ddbranch = userbranchEl.value.trim();

    if (!isRequired(ddbranch)) {
        showError(userbranchEl, '⛔️ Required!');
        return false;
    }
    else {
        showSuccess(userbranchEl);
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
    let isFnameValid = checkFirstname(),
        isSurnameValid = checkSurname(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();
        isRoleValid = checkRole(),
        isBranchValid = checkBranch();

    let isFormValid = isFnameValid &&
        isSurnameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isRoleValid &&
        isBranchValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        e.target.submit()
        alert('✅ Registration successful, Redirecting to login');
        // Redirecting to other page or webste code. 
        //window.location = "https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/";
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
        case 'firstname':
            checkFirstname();
            break;
        case 'surname':
            checkSurname();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
        case 'role':
            checkRole();
            break;
        case 'ddbranch':
            checkBranch();
            break;
    }
}));