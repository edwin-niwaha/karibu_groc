const prodnameEl = document.querySelector('#prodname');
const itemcatEL = document.querySelector('#itemcat');
const skuEL = document.querySelector('#sku');
const sdateEL = document.querySelector('#sdate');
const tonnEl = document.querySelector('#tonn');
const costpriceEL = document.querySelector('#costprice');
const unitpriceEL = document.querySelector('#unitprice');
const dealerEL = document.querySelector('#dealer');
const contacttelEL = document.querySelector('#contacttel');
const sellpriceEL = document.querySelector('#sellprice');
const supplierEL = document.querySelector('#supplier');


const letters = /^[A-Za-z]+$/;

const form = document.querySelector('#purchfrm');


const checkProdName = () => {

    let valid = false;

    const prodname = prodnameEl.value.trim();

    if (!isRequired(prodname)) {
        // alert("Please select the user role!");
        showError(prodnameEl, '⛔️ Please enter the produce name !');
        return false;
    }
    else {
        showSuccess(prodnameEl);
        valid = true;
    }
    return valid;
};

const Checksku = () => {

    let valid = false;
    const min = 7,
        max = 8;
    const sku = skuEL.value.trim();

    if (!isRequired(sku)) {
        // alert("Please select the user role!");
        showError(skuEL, '⛔️ Please enter the Stock Keeping Unit !');
        return false;
    }
    else {
        showSuccess(skuEL);
        valid = true;
    }
    return valid;
};

const CheckProdType = () => {

    let valid = false;

    const itemcat = itemcatEL.value.trim();

    if (!isRequired(itemcat)) {
        // alert("Please select the user role!");
        showError(itemcatEL, '⛔️ Enter produce type !');
        return false;
    }
    else {
        showSuccess(itemcatEL);
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
    else if (unitprice.length < 4) {
        showError(unitpriceEL, '⛔️ Lengthen this to 4 characters or more.');
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

const checkSupplier = () => {

    let valid = false;
    const tonn = tonnEl.value.trim();
    const supplier = supplierEL.value.trim();

    if (!isRequired(supplier)) {
        showError(supplierEL, '⛔️ Please select the supplier !');
        return false;
    }
    else if (tonn < 1000 && supplier =='Ind dealers') {
        showError(tonnEl, '⛔️ Tonnage must be 1000 kgs or more');
        showError(supplierEL, '☚ Increase tonnage to 1000 kgs or more');

        return false;
    }
    else {
        showSuccess(tonnEl);
        showSuccess(supplierEL);
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
    else if (sellprice.length < 4) {
        showError(sellpriceEL, '⛔️ Lengthen this to 4 characters or more.');
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

    //Regex for Valid Characters i.e. Alphabets and Numbers and space
    var regex = /^[A-Za-z0-9 _]+$/;

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
        max = 10;
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
        isSku = Checksku(),
        isValidDate = checkDate(),
        isTonnValid = checkTonnage(),
        isCostPriceValid = checkCostPrice(),
        isUnitPriceValid = checkUnitPrice(),
        isValidDealer = checkDealer(),
        isSupplierValid = checkSupplier(),
        isValidContact = checkContact(),
        isValidSellPrice = checkSellPrice();

    let isFormValid = isProdValid &&
        isSku &&
        isProduceTypeValid &&
        isValidDate &&
        isTonnValid &&
        isCostPriceValid &&
        isUnitPriceValid &&
        isValidDealer &&
        isSupplierValid &&
        isValidContact &&
        isValidSellPrice;

    // submit to the server if the form is valid
    if (isFormValid) {
        e.target.submit()
        alert('✅ Transaction saved successfully!');
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
        case 'sku':
            Checksku();
            break;
        case 'itemcat':
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
        case 'supplier':
            checkSupplier();
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

function sumCalc() {
    var txtNum1 = document.getElementById('tonn').value;
    var txtNum2 = document.getElementById('unitprice').value;
    var result = parseInt(txtNum1) * parseInt(txtNum2);
    if (!isNaN(result)) {
        document.getElementById('costprice').value = result;
    }
}


