const cartTable = document.getElementById("cartTable");
let sum = 0;
const priceDisplay = document.getElementById("sum");
const cartRow = document.getElementsByClassName("cartRow");
function buildCart(params) {
  cartTable.innerHTML = `
<tr class="terraContainer">
<th>item</th>
<th>quantity</th>
<th>final price</th>
</tr> `;
  axios
    .get("/carts")
    .then((data) => {
      console.log(data.data);
      const products = data.data[0].products;
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
    <td style="border: none; "><button onClick=qnt('${element._id},${
          element.qnt
        },+')>
    <h1>+</h1></button><button onClick=qnt('${element._id},${
          element.qnt
        },-') style="margin-left:5px"><h1>-</h1></button>
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

function qnt(filterAndValue) {
  const seperator = filterAndValue.indexOf(",");
  const secondSeperator = filterAndValue.lastIndexOf(",");
  const id = filterAndValue.substring(0, seperator);
  let qnt = Number(filterAndValue.substring(seperator + 1, secondSeperator));
  const operator = filterAndValue.substring(secondSeperator + 1);
  switch (operator) {
    case "+":
      qnt += 1;
      break;
    case "-":
      qnt -= 1;
      break;
    default:
      return;
  }
  if (qnt == 0 && operator == "-") {
    axios
      .patch(`/carts/delete/${id}`, { qnt })
      .then((data) => {
        buildCart();
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }
  axios
    .patch(`/carts/changeQnt/${id}`, { qnt })
    .then((data) => {
      buildCart();
    })
    .catch((err) => {
      console.log(err);
    });
  return;
}
