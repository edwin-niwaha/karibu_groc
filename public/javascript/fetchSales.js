let productInput = document.getElementById("prodname");
let productCatInput = document.forms['salesfrm']['itemcat'];
let skuInput = document.forms['salesfrm']['sku'];
let UnitInput = document.forms['salesfrm']['unitprice'];


productInput.onchange = function () {
    let option = productInput.selectedOptions;
    let itemNew = option[0].dataset;
    productCatInput.value = itemNew.itemcat;
    skuInput.value = itemNew.sku;
    UnitInput.value = itemNew.unitprice;
};



