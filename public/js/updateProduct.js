const body=document.getElementsByClassName('insertInput')
function updateProduct(ID){
axios
.patch(`/updateProducts/${ID}`,{
    description:body[0].value,
    price:body[1].value,
    sale:body[2].value,
    category:body[3].value,
    brand:body[4].value,
    weight:body[5].value,
    insurance:body[6].value,
    color:body[7].value,
    one:body[8].value,
    two:body[9].value,
    qnt:body[10].value,
    images:[body[11].value,body[12].value,body[13].value,body[14].value]
})
.then((data)=>{
    console.log(data);
})
.catch((err)=>{console.log(err);})
.then()
}