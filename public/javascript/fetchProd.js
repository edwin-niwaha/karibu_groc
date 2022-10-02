let productInput = document.getElementById("prodname");
// let productItemNameInput = document.forms['purchfrm']['itemName'];
let productCatInput = document.forms['purchfrm']['itemcat'];
let skuInput = document.forms['purchfrm']['sku'];
let UnitInput = document.forms['purchfrm']['unitprice'];
let amountInput = document.forms['purchfrm']['sellprice'];


productInput.onchange = function () {
    let option = productInput.selectedOptions;
    let itemNew = option[0].dataset;
    // productItemNameInput.value = itemNew.itemName;
    productCatInput.value = itemNew.itemcat;
    skuInput.value = itemNew.sku;
    UnitInput.value = itemNew.unitprice;
    amountInput.value = itemNew.sellprice;
};



