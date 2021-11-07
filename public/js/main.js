let products;
const div=document.getElementById("pictures")
let i=0
axios
.get('/products')
.then((res)=>{
    // product=res.data
    for (const iterator of res.data) {
        console.log(res);
        console.log(iterator);
        div.innerHTML+=
        `
        <div class="productContainer" id="${iterator.description}">
        <h3 class="productTitle">${iterator.description}</h3 >
        <button><p class="infoBtnText" style="text-decoration: underline; color: grey;  ">read more</p></button>
        <button style="background-color:blueviolet; border-radius: 10%;"><p class="Cart" style="font-weight: 500; color: orange;  ">Cart+</p></button>
        <button style="background-color:blueviolet; border-radius: 10%;"><p class="Cart" style="font-weight: 500; color: orange;  ">WISH+</p></button>
        <img src="${iterator.images[0]}" class="productImgMain" id="mainImg">
        <p class="productInfo">
              <span> COLOR-</span>${iterator.color}<br><br>
                <span>WEIGHT-</span>${iterator.WEIGHT}<br><br>
                <span>$-</span>${iterator.one}<br><br>
                <span>$-</span> ${iterator.two}<br><br>
                <span>INSURANCE-</span>${iterator.INSURANCE}<br><br>
                <span>PRICE-</span><span class="price">${iterator.price} </span><span class="salePres">${iterator.sale}%OFF  <span class="saledPriced">${iterator.sale}</span<br><br>
             </p>
             <img src="${iterator.images[0]}"    class="smallProductImg ">
             <img src="${iterator.images[1]}"    class="smallProductImg ">
             <img src="${iterator.images[2]}"    class="smallProductImg ">
             <img src="${iterator.images[3]}"   class="smallProductImg">
             </div>
        `
        i++
        
    }
console.log(document.getElementById('mainImg').getAttribute('src') );

})
