require('dotenv').config()
const express = require("express");
const path = require("path");
const app = express();
const PORT=process.env.PORT;
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));
const products=require("./products");
app.get('/products',(req,res)=>{
  filter=req.params.category
  console.log(filter);
    products.fullProductsData(req,res,filter)
})




app.get('/products/:category',(req,res)=>{
  filter=req.params.category
    products.fullCategoryData(req,res,filter)
})






app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
    