const shop=document.getElementsByClassName('add-to-cart')
const amount=document.getElementById("amount")
let quant
let sale
let sum
function bought(ID) {
    
    axios
    .get("/singleCart")
    .then((data)=>{
        for (const iterator of data.data.products) {
            if(iterator._id=ID){
                quant=Number(amount.value)+Number(iterator.qnt)
                sum=Number(iterator.price)*Number(amount.value)+Number(data.data.sum)
                sale=Number(data.data.sale)+Number(iterator.price-(iterator.sale/100*iterator.price))
               changeQuantity(ID)
            return
            }
        }
        firstUnit(ID)
        })
    }

function changeQuantity(ID) {
    axios
    .patch(`/carts/changeQnt/${ID}`, { qnt:quant,sale:sale,sum:sum })
    .then((data) => {
        alert(`${amount.value} more units added to cart`)
        quant=null;
    })
    .catch((err) => {
        console.log(err);
      alert('product is in cart and an error accured pleas try again later');
    });
  return;
}


function firstUnit(ID) {
    axios
.get((`/singleProudct/${ID}`))
.then((data)=>{
    product=data.data
    product.qnt=Number(amount.value)
    patch(product)
})
.catch((err)=>{
    console.log(err);
})
}


function patch(data) {    
axios
.patch("/carts",data)
.then((data)=>{
alert("added")
})
.catch((err)=>{
    console.log(err);
})
}



