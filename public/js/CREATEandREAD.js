// would get all the documents from the contacs collection and assembale them
// to a scrollable(if nedded) section of the page
const contacts = document.getElementById("contacts");
axios.get("/getContacts").then((contactsData) => {
  for (const iterator of contactsData.data) {
    contacts.innerHTML += `
    <article class="message">
    <h4>${iterator.email}</h4>
    <h2>${iterator.name}</h2>
    <p>${iterator.message}</p>
</article>`;
  }
});

// ------------------------------------------------------------------------


// when submitted the function would prevent the from to target and by that prevent
// its default event 
// then post a document in the products Collection 
document.getElementById("postProduct").addEventListener("submit", (e) => {
  e.preventDefault();
  const body = document.getElementsByClassName("insertInput");
  axios
    .post(`/addProduct`, {
      description: body[0].value,
      price: body[1].value,
      sale: body[2].value,
      category: body[3].value,
      brand: body[4].value,
      weight: body[5].value,
      insurance: body[6].value,
      color: body[7].value,
      one: body[8].value,
      two: body[9].value,
      qnt: body[10].value,
      images: [body[11].value, body[12].value, body[13].value, body[14].value],
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .then();
});

// ------------------------------------------------------------------------
