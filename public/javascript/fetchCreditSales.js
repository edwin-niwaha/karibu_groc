let productInput = document.getElementById("prodname");
let productCatInput = document.forms['creditfrm']['itemcat'];
let skuInput = document.forms['creditfrm']['sku'];
let UnitInput = document.forms['creditfrm']['unitprice'];


productInput.onchange = function () {
    let option = productInput.selectedOptions;
    let itemNew = option[0].dataset;
    productCatInput.value = itemNew.itemcat;
    skuInput.value = itemNew.sku;
    UnitInput.value = itemNew.unitprice;
};



