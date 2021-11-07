require('dotenv').config()
const express = require("express");
const path = require("path");
const app = express();
const PORT=process.env.PORT;
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));
const products=require("./products");
app.get('/products',(req,res)=>{
    products.fullProdcuctsData(req,res)
})
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
    