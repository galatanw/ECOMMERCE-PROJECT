// requesting the server for the cart located in the carts collection
// and then tacking the field and planting them for the client's  cart
//! THE FINAL PRICE IS A COMPONANT OF THE SUM OF ALL PROUCT PRICE MINUS THE SUM OF ALL THE PRODUCTS'S SALES
function buildCart(params) {
  cartTable.innerHTML = `
  <tr class="terraContainer">
  <th>item</th>
  <th>quantity</th>
  <th>final price</th>
  </tr> `;
  axios
    .get("/singleCart")
    .then((data) => {
      if (data.status > 300) return;
      const products = data.data.products;
      sumCart[0].innerHTML = `<h6>${data.data.sale}</h6>`;
      sumCart[1].innerHTML = `<h6>${data.data.shipping}</h6>`;
      sumCart[2].innerHTML = `<h6>${data.data.sum - data.data.sale}</h6>`;
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
      <td style="border: none; ">
      <button onClick="plus('${element._id}',${index})"><h1>+</h1></button>
      <button onClick="minus('${
        element._id
      }',${index})" style="margin-left:5px"><h1>-</h1></button>
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

// ---------------------------------------------------------------------------------------------------

// ADDING TO THE DATABASE THE UPDATED PROUDCT'S QUANTITY AND ADJUSTING THE SUM AND SALE FIELD

function plus(ID, i) {
  axios
    .get("/singleCart")
    .then((data) => {
      for (const iterator of data.data.products) {
        if (iterator._id == ID) {
          quant = 1 + Number(iterator.qnt);
          sum = Number(data.data.sum) + Number(iterator.price);
          sale =
            Number(data.data.sale) +
            Number((iterator.sale / 100) * iterator.price);
          changeQuantity(ID, i, iterator.price, iterator.qnt + 1);
          return;
        }
      }
    })
    .catch((err) => {
      alert("error accured");
    });
}

function minus(ID, i) {
  const cartTerras = document.getElementsByClassName("terraContainer");
  axios
    .get("/singleCart")
    .then((data) => {
      for (const iterator of data.data.products) {
        if (iterator._id == ID) {
          if (Number(iterator.qnt) == 1) {
            removeFromCart(ID, iterator.sale, iterator.price);
            cartTerras[i + 1].style.display = "none";
            return;
          }
          quant = Number(iterator.qnt) - 1;
          sum = Number(data.data.sum) - Number(iterator.price);
          sale =
            Number(data.data.sale) -
            Number((iterator.sale / 100) * iterator.price);
          changeQuantity(ID, i, iterator.price, iterator.qnt - 1);
          return;
        }
      }
    })
    .catch((err) => {
      console.log(err);
      alert("error accured");
    });
}

// A CALL BACK FUCNTION TO PREFORM AFTER SETTING THE VALUES TO BE TRANSMITED TO THE SERVER

function changeQuantity(ID, index, price, qnt) {
  const priceCartTerras = document.getElementsByClassName("priceTerra");
  const qntCartTerras = document.getElementsByClassName("qntTerra");
  axios
    .patch(`/carts/changeQnt/${ID}`, { qnt: quant, sale: sale, sum: sum })
    .then((data) => {
      priceCartTerras[index + 1].innerText = `${price * qnt} USD`;
      qntCartTerras[index + 1].innerText = `${qnt} pcs `;      
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  return;
}
function removeFromCart(ID, sale, price) {
  axios
    .patch(`/carts/deleteOneProduct/${ID}`, { price, sale })
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    })
    .then();
}
function removeFromCart(ID, sale, price) {
  axios
    .patch(`/carts/deleteOneProduct/${ID}`, { price, sale })
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    })
    .then();
}

// ---------------------------------------------------------------------------------------------------
