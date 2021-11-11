// aknowloging the product's exsitence and deciding if to create it or
// changing the quantity
function bought(ID) {
  axios.get(`/singleCart`).then((data) => {
    console.log(data);
    for (const iterator of data.data.products) {
      if ((iterator._id = ID)) {
        quant = Number(amount.value) + Number(iterator.qnt);
        sum =
          Number(iterator.price) * Number(amount.value) + Number(data.data.sum);
        sale =
          Number(data.data.sale) +
          Number((iterator.sale / 100) * iterator.price);
        changeQuantity(ID);
        return;
      }
    }

    firstUnit(ID);
  });
}
// // -----------------------------------------------------------------------

//  request with the purpose of getting the product in the products collection to
// envoke a pacth Method that would push it to the cart
function firstUnit(ID) {
  axios
    .get(`/singleProudct/${ID}`)
    .then((data) => {
      product = data.data;
      product.qnt = Number(amount.value);
      addToCart(product);
    })
    .catch((err) => {
      console.log(err);
    });
}
// adding the prodct to the cart with usage of firstUnit result

function addToCart(data) {
  axios
    .patch("/carts", data)
    .then((data) => {
      alert("added");
    })
    .catch((err) => {
      console.log(err);
    });
}

// // -----------------------------------------------------------------------

// if the product already exists the function would be activated
// and a request with PATCH METHOD would be sent
// with the purpose of changing the product quantity
function changeQuantity(ID) {
  axios
    .patch(`/carts/changeQnt/${ID}`, { qnt: quant, sale: sale, sum: sum })
    .then((data) => {
      alert(`${amount.value} more units added to cart`);
    })
    .catch((err) => {
      console.log(err);
      alert("product is in cart and an error accured pleas try again later");
    });
  return;
}
// -----------------------------------------------------
