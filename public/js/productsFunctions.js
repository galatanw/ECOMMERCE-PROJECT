// GET all the products that pass the category filter
// basiclly the title of the page contain the wanted category by that the dynamics of the function
// is simplified to simply know which category's page has entered
// there is an I var for the hover function the usage of a for of loop is from convinience purposes only  
//! THE FINAL PRICE IS A COMPONANT OF THE SUM OF ALL PROUCT PRICE MINUS THE SUM OF ALL THE PRODUCTS'S SALES
function getCategory() {
  axios.get(`/products/${category}`).then((res) => {
    let i=0
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
            <button style="color:red" onclick="deleteProduct('${ iterator._id  }',${i})">
            DELETE</button>
            <button><a href="/singleProudctHbs/${iterator._id}">More details</a></button>
            <button><a href="/singleProductUpdate/${iterator._id}">Update</a></button>      
             </div>
            `;
      i++;
    }
  });
}
// // ---------------------------------------------------------------------------

// when the page is loaded every products has two images that been save in the "productsImages" 
// array then by the I that been implated as argument at the "getCategory" 
// function procuts image can be swiched by hovering
// the usage of mouseenter and mosuehover insted of mousehover is because i've read that mousehover 
// would activate every times the mouse moves over the element unlike my way that would
// activate only when the mouse entered the element and out what would peak the performance
function hoverImage(x) {
    pics[x].src = `${productsImages[x][1]}`;
  }
  function hoverOut(x) {
    pics[x].src = `${productsImages[x][0]}`;
  }
  
// // ---------------------------------------------------------------------------
// when clicked the argumant that have been planted in  "getCategory" and contains 
// the product's ID would delete the requsted product from the collection
// THE DELETE REQUIERS CONFIRMATION AND ASK TO TYPE THE ID IN THE PROMT VAR
// THEN BEEN QUERIED IF true THE PRODUCT WOULD BE DELETED
function deleteProduct(id,index){
  const Deletedproduct=document.getElementsByClassName("productsPreview")  
  const verify=prompt(id)
    if(verify==id){
    axios
    .delete(`/products/${id}`)
    .then((res) => {
      Deletedproduct[index].style.display='none'
      alert("delted");
  })
  .catch((err)=>{
    console.log(err);
  })
  return  
  }
  alert("confirmation failed")
  
  }


// // ---------------------------------------------------------------------------



// to sort the products by diffrent parameters ive chose to create a call back 
// that would GET the products array in a new form 
// a switch case woulde be tested by the kind of parameter
// the client chose in select option (FILTER OPTION) 
// and would preview the products as the client wished for

function sortBySelect(kind) {
    productsImages = [];
   let i = 0;
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
            <button style="color:red" onclick="deleteProduct('${ iterator._id  }')">
            DELETE</button>
            <button><a href="/singleProudctHbs/${iterator._id}">More details</a></button>
            <button><a href="/singleProductUpdate/${iterator._id}">Update</a></button> </div>
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
            <button style="color:red" onclick="deleteProduct('${ iterator._id  }')">
            DELETE</button>
            <button><a href="/singleProudctHbs/${iterator._id}">More details</a></button>
            <button><a href="/singleProductUpdate/${iterator._id}">Update</a></button>  </div>
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
            <button style="color:red" onclick="deleteProduct('${ iterator._id  }')">
            DELETE</button>
            <button><a href="/singleProudctHbs/${iterator._id}">More details</a></button>
            <button><a href="/singleProductUpdate/${iterator._id}">Update</a></button>
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
  
