const shop=document.getElementsByClassName('add-to-cart')
const amount=document.getElementById("amount")
let data
function bought(ID) {
axios
.get((`/singleProudct/${ID}`))
.then((data)=>{
    product=data.data
    product.qnt=amount.value
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
    console.log(1,data);
})
.catch((err)=>{
    console.log(err);
})
}





