// cart element to implant to 
const sumCart = document.getElementsByClassName("finalCart");
const cartTable = document.getElementById("cartTable");
const priceDisplay = document.getElementById("sum");
const cartRow = document.getElementsByClassName("cartRow");
// ---------------------------------------

// variables to keep updated Data(to be change with evrey  time the user change qnt)
let sum;
let quant;
let sale;
// ------------------------------------
buildCart();


