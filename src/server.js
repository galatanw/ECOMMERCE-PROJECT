require('dotenv').config()
const express = require("express");
const hbs=require("hbs");
const path = require("path");
const app = express();
const PORT=process.env.PORT;
const publicPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates","views");
const PartialsPath = path.join(__dirname, "..", "templates","partials");
const carts=require("./carts");
const products=require("./products");

app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(PartialsPath)
app.use(express.static(publicPath));
app.use(express.json())
app.patch("/carts/cart/:id",(req,res)=>{
  carts.insertOneProduct(req,res)
})
app.get("/carts",(req,res)=>{
carts.fullData(req,res)
})
app.patch("/carts",(req,res)=>{
  carts.insertOneProduct(req,res)
})
app.delete("/carts/:id",(req,res)=>{
  carts.deleteOneProduct(req,res)
})

app.get('/products',(req,res)=>{
    products.fullProductsData(req,res)
})


app.get('/singleProudctHbs/:id',(req,res)=>{
products.SingleproductHbs(req,res)
})
app.get('/singleProudct/:id',(req,res)=>{
  products.Singleproduct(req,res)
  })


app.get('/products/:category',(req,res)=>{
  filter=req.params.category
    products.fullCategoryData(req,res,filter)
})


app.get("/singleProductUpdate/:id",(req,res)=>{
products.updateSingleProduct(req,res)  
})

app.patch("/updateProducts/:id",(req,res)=>{
  products.UpdateProduct(req,res)
})

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
    