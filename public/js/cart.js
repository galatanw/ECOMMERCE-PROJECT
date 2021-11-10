const sumCart = document.getElementsByClassName("finalCart");
const cartTable = document.getElementById("cartTable");
const priceDisplay = document.getElementById("sum");
const cartRow = document.getElementsByClassName("cartRow");
let sum;
let quant;
let sale;
function buildCart(params) {
  let sum = 0;
  cartTable.innerHTML = `
<tr class="terraContainer">
<th>item</th>
<th>quantity</th>
<th>final price</th>
</tr> `;
  axios
    .get("/singleCart")
    .then((data) => {
      const products = data.data.products;
      sumCart[0].innerHTML = `<h6>${data.data.sum - data.data.sale}</h6>`
      sumCart[1].innerHTML = `<h6>${data.data.shipping}</h6>`
      sumCart[2].innerHTML = `<h6>${data.data.sum-data.data.sale}</h6>`
      for (let index = 0; index < products.length; index++) {
        const element = products[index];
        if (element) sum += Number(element.price);
        cartTable.innerHTML += `
    <tr class=terraContainer >
    <td><img src="${element.images[0]}"><h1 style="display:inline-block">${
          element.description
        }</h1></td>
    <td><h5 class=qntTerra>${element.qnt} pcs</h5></td> 
    <td><h1 class=priceTerra style:color:"red">${
      element.price * element.qnt
    } USD</h1>
    <td style="border: none; "><button onClick="plus('${element._id}')">
    <h1>+</h1></button><button onClick="minus('${element._id}')" style="margin-left:5px"><h1>-</h1></button>
    </td >
    `;
      }
    })
    .catch((err) => {
      console.log(err);
      cartTable.innerHTML += `
        no procuts added
    `;
    });
}
buildCart();

function plus(ID) {
  axios
    .get("/singleCart")
    .then((data) => {
      for (const iterator of data.data.products) {
        if ((iterator._id = ID)) {
          quant = 1 + Number(iterator.qnt);
          sum = Number(data.data.sum) + Number(iterator.price);
          sale =
            Number(data.data.sale) +
            Number((iterator.sale / 100 * iterator.price));
          changeQuantity(ID);
          return;
        }
      }
    })
    .catch((err) => {
      alert("error accured");
    });
}

function minus(ID) {
  axios
    .get("/singleCart")
    .then((data) => {
      for (const iterator of data.data.products) {
        if ((iterator._id = ID)) {
          if(Number(iterator.qnt)==1){
            removeFromCart(ID,iterator.sale,iterator.price)
          buildCart();
            return
          }
          quant = Number(iterator.qnt)-1 ;
          sum = Number(data.data.sum) - Number(iterator.price);
          sale =
            Number(data.data.sale) -
            Number((iterator.sale / 100 * iterator.price));
          changeQuantity(ID);
          return;
        }
      }
    })
    .catch((err) => {
      alert("error accured");
    });
}
function changeQuantity(ID) {
  axios
    .patch(`/carts/changeQnt/${ID}`, { qnt: quant, sale: sale, sum: sum })
    .then((data) => {
      buildCart();
    })
    .catch((err) => {
      console.log(err);
    });
  return;
}
function removeFromCart(ID,sale,price){
  axios
  .patch(`/carts/deleteOneProduct/${ID}`,{price,sale})
  .then((data)=>{

  })
  .catch((err)=>{
    console.log(err);
  })
  .then()
}