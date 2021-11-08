require('dotenv').config()
const express = require("express");
const hbs=require("hbs");
const path = require("path");
const app = express();
const PORT=process.env.PORT;
const publicPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates","views");
const PartialsPath = path.join(__dirname, "..", "templates","partials");
console.log(viewsPath);
console.log(PartialsPath);
const products=require("./products");

app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(PartialsPath)
app.use(express.static(publicPath));


app.get('/products',(req,res)=>{
  filter=req.params.category
  console.log(filter);
    products.fullProductsData(req,res,filter)
})


app.get('/singleProudct/:id',(req,res)=>{
products.SingleproductHbs(req,res)
})



app.get('/products/:category',(req,res)=>{
  filter=req.params.category
    products.fullCategoryData(req,res,filter)
})


app.get("/singleProductUpdate/:id",(req,res)=>{
products.updateSingleProduct(req,res)  
})



app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
    