let productsImages = [];
category = document.getElementById('titleName').innerText;
console.log(category);
const div = document.getElementById("products");
let i = 0;
function getCategory() {
  axios 
  .get(`/products/${category}`)
  .then((res) => {
    for (const iterator of res.data) {
      productsImages.push([iterator.images[0], iterator.images[1]]);
      div.innerHTML += `
          <div id="${iterator.description}" class="productsPreview">
          <img class="images" onmouseleave="hoverOut(${i})" onmouseenter="hoverImage(${i})" src="${
        iterator.images[0]
      }">
          <br>
          <h2>${iterator.description}</h2>
          <hr>
          <h3>final Price:${
            iterator.price - (iterator.price * iterator.sale) / 100
          } $</h3>
          <a href="/singleProudct/${iterator._id}"><input type="button" value="Details"></a>
           </div>
          `;
      i++;
    }
  });
}
getCategory(category);
const pics = document.getElementsByClassName("images");
function hoverImage(x) {
  pics[x].src = `${productsImages[x][1]}`;
}
function hoverOut(x) {
  pics[x].src = `${productsImages[x][0]}`;
}

const filter = document.getElementById("filter");
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

function sortBySelect(kind) {
  productsImages = [];
  i = 0;
  switch (kind) {
    case "lowest":
      axios.get(`/products/${category}`).then((res) => {
        const sortedData = res.data.sort(
          (a, b) =>
            a.price -
            (a.price * a.sale) / 100 -
            b.price -
            (b.price * b.sale) / 100
        );
        for (const iterator of sortedData) {
          productsImages.push([iterator.images[0], iterator.images[1]]);
          div.innerHTML += `
          <div id="${iterator.description}" class="productsPreview">
          <img class="images" onmouseleave="hoverOut(${i})" onmouseenter="hoverImage(${i})" src="${
            iterator.images[0]
          }">
          <br>
          <h2>${iterator.description}</h2>
          <hr>
          <h3>final Price:${
            iterator.price - (iterator.price * iterator.sale) / 100
          } $</h3>
           </div>
              `;
          i++;
        }
      });
      break;
    case "highest":
      axios.get(`/products/${category}`).then((res) => {
        const sortedData = res.data.sort(
          (a, b) =>
            b.price -
            (b.price * b.sale) / 100 -
            a.price -
            (a.price * a.sale) / 100
        );
        for (const iterator of sortedData) {
          productsImages.push([iterator.images[0], iterator.images[1]]);
          div.innerHTML += `
          <div id="${iterator.description}" class="productsPreview">
          <img class="images" onmouseleave="hoverOut(${i})" onmouseenter="hoverImage(${i})" src="${
            iterator.images[0]
          }">
          <br>
          <h2>${iterator.description}</h2>
          <hr>
          <h3>final Price:${
            iterator.price - (iterator.price * iterator.sale) / 100
          } $</h3>
           </div>
            `;
          i++;
        }
      });
      break;
    default:
      axios.get(`/products/${category}`).then((res) => {
        const sortedData = res.data.sort((a, b) => b.sale - a.sale);
        for (const iterator of sortedData) {
          if (iterator.sale == 0) {
          } else {
            productsImages.push([iterator.images[0], iterator.images[1]]);
            div.innerHTML += `
            <div id="${iterator.description}" class="productsPreview">
            <img class="images" onmouseleave="hoverOut(${i})" onmouseenter="hoverImage(${i})" src="${
              iterator.images[0]
            }">
            <br>
            <h2>${iterator.description}</h2>
            <hr>
            <h3>final Price:${
              iterator.price - (iterator.price * iterator.sale) / 100
            } $</h3>
            <h2><span style="color:red">SALE:</sapn><span style="color:gold">${iterator.sale}%</span></h2>
             </div>
              `;
            i++;
          }
        }
      });
      break;
  }
}

document.getElementById("resetFilter").onclick=()=>{
  productsImages = [];
  div.innerHTML = "";
  i = 0;
  getCategory(category)
}