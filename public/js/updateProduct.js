// the page been rendered using hbs
// in the backend the server gets the AJAX request after pressing the
// details button in the product card
// the request is kind GET and contains the product's ID as a param
// then thers a mongoDB find function that get the specific product
// rendering the all the values of the product
// taking the objectID of the product and render it
// as an argument to updateProduct function
// which then  patch(when the button clicked)
// and updates the product who carries this id

const body = document.getElementsByClassName("insertInput");
function validateProduct(ID) {
  const imagesCounter = 4;
  const inputs = {
    description: body[0].value,
    price: Number(body[1].value),
    sale: Number(body[2].value),
    category: body[3].value,
    brand: body[4].value,
    weight: body[5].value,
    insurance: body[6].value,
    color: body[7].value,
    one: body[8].value,
    two: body[9].value,
    qnt: body[10].value,
    images: [body[11].value, body[12].value, body[13].value, body[14].value],
  };
  axios
    .get(`/singleProudct/${ID}`)
    .then((data) => {
      const product = data.data;
      for (const key in inputs) {
        const element = inputs[key];
        if (
          (element != "") &
          (element != undefined) &
          (element[0] != " ") &
          (element != null) &
          key!="category"&
          (key != "images")
        ) {
          product[`${key}`] = element;
        }
        if (key == "images") {
          for (let index = 0; index < imagesCounter; index++) {
            if (
              (element[index] != "") &
              (element[index] != undefined) &
              (element[index][0] != " ") &
              (element[index] != null)
            ) {
              product.images[index] = element;
            }
          }
        }
    }
        console.log(product);
        updateProduct(ID, product);
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateProduct(ID, newProduct) {
  axios
    .patch(`/updateProducts/${ID}`, newProduct)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .then();
}

// -----------------------------------------------------------------------------------------
