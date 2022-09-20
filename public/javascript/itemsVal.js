const itemNameEL = document.querySelector('#itemName');
const skuEL = document.querySelector('#sku');
const sdateEL = document.querySelector('#sdate');
const costpriceEL = document.querySelector('#costprice');
const contacttelEL = document.querySelector('#contacttel');
const sellpriceEL = document.querySelector('#sellprice');
const ddprodtypeEL = document.querySelector('#ddprodtype');

const letters = /^[A-Za-z]+$/;

const form = document.querySelector('#itemsfrm');


const checkitemName = () => {

    let valid = false;

    const itemName = itemNameEL.value.trim();

    if (!isRequired(itemName)) {
        // alert("Please select the user role!");
        showError(itemNameEL, '⛔️ Please enter item name !');
        return false;
    }
    else {
        showSuccess(itemNameEL);
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
const checkDate = () => {

    let valid = false;

    const sdate = sdateEL.value.trim();

    if (!isRequired(sdate)) {
        // alert("Please select the user role!");
        showError(sdateEL, '⛔️ Please enter expiry date !');
        return false;
    }
    else {
        showSuccess(sdateEL);
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


const checkCostPrice = () => {

    let valid = false;

    const costprice = costpriceEL.value.trim();

    if (!isRequired(costprice)) {
        showError(costpriceEL, '⛔️ You must enter the purchase price.');
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


const checkSellPrice = () => {

    let valid = false;

    const sellprice = sellpriceEL.value.trim();

    if (!isRequired(sellprice)) {
        showError(sellpriceEL, '⛔️ Selling price field cannot be empty.');
        return false;
    }
    else if (sellprice.length < 5) {
        showError(sellpriceEL, '⛔️ Lengthen this to 5 characters or more.');
        return false;
    }
    else {
        showSuccess(sellpriceEL);
        valid = true;
    }
    return valid;
};


//valid alphanumeric
function ValidateItem(e) {
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
    let isItemValid = checkitemName(),
        isProduceTypeValid = CheckProdType(),
        isSku = Checksku(),
        isValidDate = checkDate(),
        isCostPriceValid = checkCostPrice(),

        isValidSellPrice = checkSellPrice();

    let isFormValid = isItemValid &&
        isProduceTypeValid &&
        isSku &&
        isValidDate &&
        isCostPriceValid &&
        isValidSellPrice;

    // submit to the server if the form is valid
    if (isFormValid) {
        e.target.submit()
        alert('✅ Item added successfully');
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
        case 'itemName':
            checkitemName();
            break;
        case 'ddprodtype':
            CheckProdType();
            break;
        case 'sku':
            Checksku();
            break;
        case 'sdate':
            checkDate();
            break;
        case 'costprice':
            checkCostPrice();
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
    var txtNum1 = document.getElementById('sellprice').value;
    var txtNum2 = document.getElementById('costprice').value;
    var result = parseInt(txtNum1) - parseInt(txtNum2);
    if (!isNaN(result)) {
        document.getElementById('profit_loss').value = result;
    }
}
