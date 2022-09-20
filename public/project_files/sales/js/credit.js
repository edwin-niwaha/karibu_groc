const ddbuyerEL = document.querySelector('#ddbuyer');
const ninEL = document.querySelector('#nin');
const locEL = document.querySelector('#loc');
const contactEL = document.querySelector('#contacttel');
const amtpdEL = document.querySelector('#amtpd');
const salesEL = document.querySelector('#salesagent');
const prodnameEl = document.querySelector('#prodname');
const ddproduceEl = document.querySelector('#ddproduce');
const tonnEl = document.querySelector('#tonn');
const unitpriceEL = document.querySelector('#unitprice');
const duedateEl = document.querySelector('#duedte');
const dpatchdateEL = document.querySelector('#dpatchdate');

const letters = /^[A-Za-z]+$/;

const form = document.querySelector('#creditfrm');

const checkBuyer = () => {

    let valid = false;

    const ddbuyer = ddbuyerEL.value.trim();

    if (!isRequired(ddbuyer)) {
        showError(ddbuyerEL, '⛔️ Please enter the buyer !');
        return false;
    }
    else if (ddbuyer.length < 2) {
        showError(ddbuyerEL, '⛔️ Lengthen this to 2 characters or more.');
        return false;
    }
    else {
        showSuccess(ddbuyerEL);
        valid = true;
    }
    return valid;
};

//valide alphanumeric
function validbuyer(e) {
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

const checkNIN = () => {

    let valid = false;

    const nin = ninEL.value.trim();
    const first2 = nin.slice(0, 2);
    // matches CM or CF
    // const ninvalid = /^[C]M|[C]F/gm;
    var validNin = /^(CM|CF)/;
    //source -- https://stackoverflow.com/questions/14071178/validate-first-2-characters-of-a-textfield
    
    if (!isRequired(nin)) {
        showError(ninEL, '⛔️ Please enter the NIN !');
        return false;
    }
    else if (nin.length < 2) {
        showError(ninEL, '⛔️ Lengthen this to 2 characters or more.');
        return false;
    }
    else if (nin.length != 14) {
        showError(ninEL, '⛔️ Invalid NIN format, enter upto 14 digits');
        return false;
    }
    else if (!first2.match(validNin)) {
        showError(ninEL, '⛔️ Valid NIN should start with 👉️ CF or CM');
    }
    else {
        showSuccess(ninEL);
        valid = true;
    }
    return valid;
};

function validid(e) {
    var keyCode = e.keyCode || e.which;
    var lblErrorid = document.getElementById("lblErrorid");
    lblErrorid.innerHTML = "";

    //Regex for Valid Characters i.e. Alphabets and Numbers.
    var regex = /^[A-Za-z0-9]+$/;

    //Validate TextBox value against the Regex.
    var isValid = regex.test(String.fromCharCode(keyCode));
    if (!isValid) {
        lblErrorid.innerHTML = "Oops! Special characters not allowed!";
    }

    return isValid;
}

const checkLocation = () => {

    let valid = false;

    const loc = locEL.value.trim();

    if (!isRequired(loc)) {
        // alert("Please select the user role!");
        showError(locEL, '⛔️ Please enter the location !');
        return false;
    }
    else if (loc.length < 2) {
        showError(locEL, '⛔️ Lengthen this to 2 characters or more.');
        return false;
    }
    else {
        showSuccess(locEL);
        valid = true;
    }
    return valid;
};
function valididLocation(e) {
    var keyCode = e.keyCode || e.which;
    var lblErrorlc = document.getElementById("lblErrorlc");
    lblErrorlc.innerHTML = "";

    //Regex for Valid Characters i.e. Alphabets and Numbers.
    var regex = /^[A-Za-z0-9]+$/;

    //Validate TextBox value against the Regex.
    var isValid = regex.test(String.fromCharCode(keyCode));
    if (!isValid) {
        lblErrorlc.innerHTML = "Oops! Special characters not allowed!";
    }

    return isValid;
}
const checkContact = () => {
    let valid = false;
    const min = 9,
        max = 14;
    const contacttel = contactEL.value.trim();

    if (!isRequired(contacttel)) {
        // alert("Please select the user role!");
        showError(contactEL, '⛔️ Please enter the contact number !');
        return false;
    }

    else if (!isBetween(contacttel.length, min, max)) {
        showError(contactEL, `phone number must be between ${min} and ${max} digits.`)
    }

    else {
        showSuccess(contactEL);
        valid = true;
    }
    return valid;
};

const checkAmount = () => {
    // var Textboxvalue = $("#amtpd").val();

    let valid = false;

    const amtpd = amtpdEL.value.trim();

    if (!isRequired(amtpd)) {
        showError(amtpdEL, '⛔️ Amount field cannot be empty.');
        return false;
    }
    else if (amtpd.length < 5) {
        showError(amtpdEL, '⛔️ Lengthen this to 5 characters or more.');
        return false;
    }
    else {
        showSuccess(amtpdEL);
        valid = true;
    }
    return valid;
};

const checkSalesAgent = () => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let valid = false;

    const salesagent = salesEL.value.trim();

    if (!isRequired(salesagent)) {
        showError(salesEL, '⛔️ Please enter the Sales Agent name!');
        return false;
    }
    else if (salesagent.length < 2) {
        showError(salesEL, '⛔️ Lengthen this to 2 characters or more.');
        return false;
    }
    else {
        showSuccess(salesEL);
        valid = true;
    }
    return valid;
};

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

const checkddproduce = () => {

    let valid = false;

    const ddproduce = ddproduceEl.value.trim();

    if (!isRequired(ddproduce)) {
        // alert("Please select the user role!");
        showError(ddproduceEl, '⛔️ Please select the produce type !');
        return false;
    }
    else {
        showSuccess(ddproduceEl);
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

const checkDate = () => {

    let valid = false;

    const duedte = duedateEl.value.trim();

    if (!isRequired(duedte)) {
        // alert("Please select the user role!");
        showError(duedateEl, '⛔️ Please enter due date !');
        return false;
    }
    else {
        showSuccess(duedateEl);
        valid = true;
    }
    return valid;
};

const checkdpatchdate = () => {

    let valid = false;

    const dpatchdate = dpatchdateEL.value.trim();

    if (!isRequired(dpatchdate)) {
        showError(dpatchdateEL, '⛔️ Please enter dispatch date date !');
        return false;
    }
    else {
        showSuccess(dpatchdateEL);
        valid = true;
    }
    return valid;
};

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isRequired = value => value === '' ? false : true;

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
    let isBuyerValid = checkBuyer(),
        isiNinValid = checkNIN(),
        isValidLoc = checkLocation(),
        isValidContact = checkContact(),
        isAmountValid = checkAmount(),
        isValidSales = checkSalesAgent(),
        isProdValid = checkProdName(),
        isProdtype = checkddproduce(),
        isTonnValid = checkTonnage(),
        isUnitPriceValid = checkUnitPrice(),
        isValidDate = checkDate(),
        isValiddpatchdate = checkdpatchdate();

    let isFormValid = isBuyerValid &&
        isiNinValid &&
        isValidLoc &&
        isValidContact &&
        isAmountValid &&
        isValidSales &&
        isProdValid &&
        isProdtype &&
        isTonnValid &&
        isUnitPriceValid &&
        isValidDate &&
        isValiddpatchdate;

    // submit to the server if the form is valid
    if (isFormValid) {
        alert('✅ Transaction recorded successfully');
        // Redirecting to other page or webste code. 
        window.location = "https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/";
        //window.location.replace("/add_sales.html");
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
        case 'ddbuyer':
            checkBuyer();
            break;
        case 'nin':
            checkNIN();
            break;
        case 'loc':
            checkLocation();
            break;
        case 'contacttel':
            checkContact();
            break;
        case 'amtpd':
            checkAmount();
            break;
        case 'salesagent':
            checkSalesAgent();
            break;
        case 'prodname':
            checkProdName();
            break;
        case 'ddproduce':
            checkddproduce();
            break;
        case 'tonn':
            checkTonnage();
            break;
        case 'unitprice':
            checkUnitPrice();
            break;
        case 'duedte':
            checkDate();
            break;
        case 'dpatchdate':
            checkdpatchdate();
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
    document.getElementById("amtpd").value = x1 + x2;
}

