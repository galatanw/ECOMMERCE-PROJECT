require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates", "views");
const PartialsPath = path.join(__dirname, "..", "templates", "partials");
const carts = require("./carts");
const contacts = require("./contacts");
const products = require("./products");

// SETTING HBS AND EXPRESS
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(PartialsPath);
app.use(express.static(publicPath));
app.use(express.json());

// --------------------------------------------------------------------------
  // PRODUCT
// GET all the products in products collection

// app.get("/products", (req, res) => {
//   products.fullProductsData(req, res);
// });

// POST one product to products collection
app.post("/addProduct", (req, res) => {
  products.addingProduct(req, res);
});

// GET product by tehir category 
//query string is in the params
app.get("/products/:category", (req, res) => {
  filter = req.params.category;
  products.fullCategoryData(req, res, filter);
});

// GET a single product from the products collection
app.get("/singleProudct/:id", (req, res) => {
  products.Singleproduct(req, res);
});

// GET a specific Product to render
app.get("/singleProudctHbs/:id", (req, res) => {
  products.SingleproductHbs(req, res);
});
// GET a specific Product to render
app.get("/singleProductUpdate/:id", (req, res) => {
  products.updateSingleProduct(req, res);
});

// PATCH a product and change his fields value
app.patch("/updateProducts/:id", (req, res) => {
  products.UpdateProduct(req, res);
});

// DELETE product bo ID that is planted in the params
app.delete("/products/:id", (req, res) => {
  products.deleteProduct(req, res);
});


// --------------------------------------------------------------------------
// CART

// GET all the DATA from carts collection;
app.get("/carts", (req, res) => {
  carts.fullData(req, res);
});

// GET mycart frorm carts collection
app.get("/singleCart", (req, res) => {
  carts.getSingleCart(req, res);
});

// PATCH One product to myCart products array
app.patch("/carts", (req, res) => {
  carts.insertOneProduct(req, res);
});

// PATCH the cart's sum fields and change the products quantity
app.patch("/carts/changeQnt/:id", (req, res) => {
  carts.changeQnt(req, res);
});
// PATCH the cart so one specific product is deleted
app.patch("/carts/deleteOneProduct/:id", (req, res) => {
  carts.deleteOneProduct(req, res);
});

// --------------------------------------------------------------------------
  // CONTACTS
// GET all the contacts for the client
app.get("/getContacts", (req, res) => {
  contacts.fullData(req, res);
});
// POST one message from the client
app.post("/contacts", (req, res) => {
  contacts.insertMessage(req, res);
});
console.log(process.env.MONGO_URL);
// --------------------------------------------------------------------------
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
