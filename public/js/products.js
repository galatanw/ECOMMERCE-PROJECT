let productsImages = [];
category = document.getElementById('titleName').innerText;
const div = document.getElementById("products");
const pics = document.getElementsByClassName("images");
const filter = document.getElementById("filter");
let i = 0;
getCategory(category);

// when the filter select is changed the eventlistener would take the value of the option 
// and start the sequence of possibility 
// the callback is located in "ProductFuntcions.js"


filter.addEventListener("change", () => {
  div.innerHTML = "";
  switch (filter.value) {
    case "high to low":
      {
        sortBySelect("highest");
      }
      break;
    case "low to high":
      sortBySelect("lowest");
      break;
    case "SALE":
      sortBySelect("DEFAULT");
      break;
    default:
      getCategory(category);
      break;
  }
});
// --------------------------------------------------------------------------------------

// would reset the filtering and bring the page back to state mode
document.getElementById("resetFilter").onclick=()=>{
  productsImages = [];
  div.innerHTML = "";
  i = 0;
  getCategory(category)
  
}
// --------------------------------------------------------------------------------------
