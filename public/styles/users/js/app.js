const usernameEl = document.querySelector('#username');
const useroleEl = document.querySelector('#ddrole');
const userbranchEl = document.querySelector('#ddbranch');
const userphotoEl = document.querySelector('#file');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');
const letters = /^[A-Za-z]+$/;

const form = document.querySelector('#regform');


const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
        
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else if (!letters.test(username)) {
        alert('Name field requires only alphabet characters');
    }
    else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkUserole = () => {

    let valid = false;

    const ddrole = useroleEl.value.trim();

    if (!isRequired(ddrole)) {
        // alert("Please select the user role!");
        showError(useroleEl, 'Please select the user role!');
        return false;
    }
    else {
        showSuccess(useroleEl);
        valid = true;
    }
    return valid;
};

const checkBranch = () => {

    let valid = false;

    const ddbranch = userbranchEl.value.trim();

    if (!isRequired(ddbranch)) {
        showError(userbranchEl, 'Please select the branch!');
        return false;
    }
    else {
        showSuccess(userbranchEl);
        valid = true;
    }
    return valid;
};

const checkUpload = () => {

    let valid = false;

    const file = userphotoEl.value.trim();

    if (!isRequired(file)) {
        showError(userphotoEl, 'Please select the the image to upload!');
        return false;
    }
    // if ($('#file').get(0).files.length === 0) {
    //     showError(userphotoEl, 'Please select the the image to upload!');
    //     return false;
    // }
    else {
        showSuccess(userphotoEl);
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

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
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
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
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
        //isUsernameddValid = checkUsernamedd(),
        isUseroleValid = checkUserole(),
        isBranchValid = checkBranch(),
        isFileValid = checkUpload(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        //isUsernameddValid &&
        isUseroleValid &&
        isBranchValid &&
        isFileValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

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
        case 'ddrole':
            checkUserole();
            break;
        case 'ddbranch':
            checkBranch();
            break;
        case 'file':
            checkUpload();
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
    }
}));

// valiate image upload
Filevalidation = () => {
    const fi = document.getElementById('file');
    var fileInput =
        document.getElementById('file');

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions =
        /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    // Check if any file is selected.
    if (fi.files.length > 0) {
        for (const i = 0; i <= fi.files.length - 1; i++) {

            const fsize = fi.files.item(i).size;
            const file = Math.round((fsize / 1024));
            //check allowed file type
            if (!allowedExtensions.exec(filePath)) {
                alert('Invalid file type, allowed image file formats are JPG, JPEG, PNG and GIF');
                fileInput.value = '';
                return false;
            }
            // The size of the file.
            else if (file >= 4096) {
                alert(
                    "File too big, please select a file less than 4mb");
            }
            // else if (file < 2048) {
            //     alert(
            //         "File too small, please select a file greater than 2mb");
            // }
            else {
                // Image preview
                if (fileInput.files && fileInput.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        document.getElementById(
                            'imagePreview').innerHTML =
                            '<img src="' + e.target.result
                            + '"/>';
                    };

                    reader.readAsDataURL(fileInput.files[0]);
                    document.getElementById('size').innerHTML = '<b>'
                        + "File Size: " + file + '</b> KB';
                }
            }
        }
    }
}