const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));
const products=require("./products");
app.get('/products',(req,res)=>{
    products.fullProdcuctsData(req,res)
})
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
    