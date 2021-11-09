const cartTable=document.getElementById("cartTable")
let sum=0
const priceDisplay=document.getElementById("sum")
const cartRow=document.getElementsByClassName("cartRow")
axios
.get("./carts")
.then((data)=>{
const products=data.data[0].products
for (const iterator of products) {
    sum+=Number(iterator.price)
    cartTable.innerHTML+=`
    <tr class=terraContainer >
    <td><img src="${iterator.images[0]}"><h1 style="display:inline-block">${iterator.description}</h1></td>
    <td><h5 class=qntTerra>1 pcs</h5></td> 
    <td><h1 class=priceTerra style:color:"red">${iterator.price} USD</h1>
    <td style="border: none; "><button onClick=added('${iterator._id}')>
    <h1>+</h1></button><button onClick=remove('${iterator._id}') style="margin-left:5px"><h1>-</h1></button>
    </td >
    `
}})
.catch((err)=>{
    console.log(err);
    cartTable.innerHTML+=`
        no procuts added
    `
})
let qnt=4
function added(id,) {
    console.log(id);
axios
.patch(`/carts/cart/${id}`,qnt)
.then((data)=>{
    console.log(data);
})
}


