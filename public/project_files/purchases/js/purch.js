const prodnameEl = document.querySelector('#prodname');
const ddprodtypeEL = document.querySelector('#ddprodtype');
const sdateEL = document.querySelector('#sdate');
const tonnEl = document.querySelector('#tonn');
const costpriceEL = document.querySelector('#costprice');
const unitpriceEL = document.querySelector('#unitprice');
const dealerEL = document.querySelector('#dealer');
const contacttelEL = document.querySelector('#contacttel');

const sellpriceEL = document.querySelector('#sellprice');
const letters = /^[A-Za-z]+$/;

const form = document.querySelector('#purchfrm');


const checkProdName = () => {

    let valid = false;

    const prodname = prodnameEl.value.trim();

    if (!isRequired(prodname)) {
        // alert("Please select the user role!");
        showError(prodnameEl, '⛔️ Please select the produce name !');
        return false;
    }
    else {
        showSuccess(prodnameEl);
        valid = true;
    }
    return valid;
};
const CheckProdType = () => {

    let valid = false;

    const ddprodtype = ddprodtypeEL.value.trim();

    if (!isRequired(ddprodtype)) {
        // alert("Please select the user role!");
        showError(ddprodtypeEL, '⛔️ Please select the produce type !');
        return false;
    }
    else {
        showSuccess(ddprodtypeEL);
        valid = true;
    }
    return valid;
};
const checkDate = () => {

    let valid = false;

    const sdate = sdateEL.value.trim();

    if (!isRequired(sdate)) {
        // alert("Please select the user role!");
        showError(sdateEL, '⛔️ Please enter date !');
        return false;
    }
    else {
        showSuccess(sdateEL);
        valid = true;
    }
    return valid;
};

const checkUnitPrice = () => {

    let valid = false;

    const unitprice = unitpriceEL.value.trim();

    if (!isRequired(unitprice)) {
        showError(unitpriceEL, '⛔️ Unit price field cannot be empty.');
        return false;
    }
    else if (unitprice.length < 3) {
        showError(unitpriceEL, '⛔️ Lengthen this to 3 characters or more.');
        return false;
    }
    else {
        showSuccess(unitpriceEL);
        valid = true;
    }
    return valid;
};
const checkTonnage = () => {

    let valid = false;

    const tonn = tonnEl.value.trim();

    if (!isRequired(tonn)) {
        showError(tonnEl, '⛔️ Tonnage field cannot be empty.');
    }
    else if (tonn.length < 3) {
        showError(tonnEl, '⛔️ Lengthen this to 3 characters or more.');
        return false;
    }
    else {
        showSuccess(tonnEl);
        valid = true;
    }
    return valid;
};
const checkCostPrice = () => {

    let valid = false;

    const costprice = costpriceEL.value.trim();

    if (!isRequired(costprice)) {
        showError(costpriceEL, '⛔️ You must enter the cost price.');
        return false;
    }
    else if (costprice.length < 5) {
        showError(costpriceEL, '⛔️ Lengthen this to 5 characters or more.');
        return false;
    }
    else {
        showSuccess(costpriceEL);
        valid = true;
    }
    return valid;
};

const checkDealer = () => {

    let valid = false;

    const dealer = dealerEL.value.trim();

    if (!isRequired(dealer)) {
        // alert("Please select the user role!");
        showError(dealerEL, '⛔️ Please enter the dealer !');
        return false;
    }
    else if (dealer.length < 2) {
        showError(dealerEL, '⛔️ Lengthen this to 2 characters or more.');
        return false;
    }
    else {
        showSuccess(dealerEL);
        valid = true;
    }
    return valid;
};

const checkSellPrice = () => {

    let valid = false;

    const sellprice = sellpriceEL.value.trim();

    if (!isRequired(sellprice)) {
        showError(sellpriceEL, '⛔️ Selling price field cannot be empty.');
        return false;
    }
    else if (sellprice.length < 3) {
        showError(sellpriceEL, '⛔️ Lengthen this to 3 characters or more.');
        return false;
    }
    else {
        showSuccess(sellpriceEL);
        valid = true;
    }
    return valid;
};

//valide alphanumeric
function Validatedealer(e) {
    var keyCode = e.keyCode || e.which;
    var lblError = document.getElementById("lblError");
    lblError.innerHTML = "";

    //Regex for Valid Characters i.e. Alphabets and Numbers.
    var regex = /^[A-Za-z0-9]+$/;

    //Validate TextBox value against the Regex.
    var isValid = regex.test(String.fromCharCode(keyCode));
    if (!isValid) {
        lblError.innerHTML = "Only alphabets and numbers allowed.";
    }

    return isValid;
}

const checkContact = () => {
    let valid = false;
    const min = 9,
        max = 14;
    const contacttel = contacttelEL.value.trim();

    if (!isRequired(contacttel)) {
        // alert("Please select the user role!");
        showError(contacttelEL, '⛔️ Please enter the contact number !');
        return false;
    }

    else if (!isBetween(contacttel.length, min, max)) {
        showError(contacttelEL, `phone number must be between ${min} and ${max} digits.`)
    }

    else {
        showSuccess(contacttelEL);
        valid = true;
    }
    return valid;
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
    let isProdValid = checkProdName(),
        isProduceTypeValid = CheckProdType(),
        isValidDate = checkDate(),
        isTonnValid = checkTonnage(),
        isCostPriceValid = checkCostPrice(),
        isUnitPriceValid = checkUnitPrice(),
        isValidDealer = checkDealer(),
        isValidContact = checkContact(),
        isValidSellPrice = checkSellPrice();

    let isFormValid = isProdValid &&
        isProduceTypeValid &&
        isValidDate &&
        isTonnValid &&
        isCostPriceValid &&
        isUnitPriceValid &&
        isValidDealer &&
        isValidContact &&
        isValidSellPrice;

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
        case 'prodname':
            checkProdName();
            break;
        case 'ddprodtype':
            CheckProdType();
            break;
        case 'sdate':
            checkDate();
            break;
        case 'tonn':
            checkTonnage();
            break;
        case 'costprice':
            checkCostPrice();
            break;
        case 'unitprice':
            checkUnitPrice();
            break;
        case 'dealer':
            checkDealer();
            break;
        case 'contacttel':
            checkContact();
            break; 
            case 'sellprice':
                checkSellPrice();
                break;
    }
}));

//validate numbers only
function functionx(evt) {
    if (evt.charCode > 31 && (evt.charCode < 48 || evt.charCode > 57)) {
        alert("Only numbers are allowed");
        return false;
    }
}

// setting commas

function Comma(Num) {      //function to insert comma for two textboxes
    Num += '';
    Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    x = Num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}

// function to remove comma and then add to third textbo
function sumCalc() {

    var tonn = parseFloat(document.getElementById("tonn").value.replace(/,/g, ""));
    var unitprice = parseFloat(document.getElementById("unitprice").value.replace(/,/g, ""));

    x = (tonn * unitprice).toString().split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    document.getElementById("costprice").value = x1 + x2;
}