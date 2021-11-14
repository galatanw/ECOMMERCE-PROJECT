require("dotenv").config();
const mongo = require("mongodb"),
  url = process.env.MONGO_URL,
  client = mongo.MongoClient.connect(url),
  dbName = "ecommerce",
  collection = "carts";
ObjectId = mongo.ObjectId;

// get carts data
function fullData(req, res) {
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection("carts")
        .find({})
        .toArray()
        .then((data) => {
          if ((response.value == null) || (response.value == undefined))return res.status(400)
          return res.send(data);
        });
    })
    .catch((err) => {
      console.log("CART FULL DATA ERROR");
      console.log(err);
      return res.status(400);
    });
}
// --------------
// get a single cart from cart 
// only one cart requird due to lack of tokens knowlege
function getSingleCart(req,res) {
  client
  .then((db) => {
    const dbo = db.db(dbName);
    dbo
      .collection("carts")
      .findOne({_id:ObjectId("618d8abc6952a1b331f2bf2f")})
      .then((data) => {
        console.log(data);
        if(data.value=="")return res.sendStatus(404)
        return res.send(data);
      });
  })
  .catch((err) => {
    console.log("CARRT getSingleCart ERROR");

    console.log(err);
    return res.status(400);
  });
}
// ------------------------------------

// POST one product to carts document using pacth when body represent the product
function insertOneProduct(req, res) {
  const body = req.body;
  const price=body.price;
  const sale=body.sale
  body.qnt = Number(body.qnt);
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection("carts")
        .findOneAndUpdate({_id:ObjectId("618d8abc6952a1b331f2bf2f")},{ $push: { products: body },$inc:{sum:price , sale:((sale/100*price))}})
        .then((data) => {
          if ((data.value == null) || (data.value == undefined))return res.status(400)
          return res.send(data);
        });
    })
    .catch((err) => {
      console.log("CARRT insertOneProduct ERROR");
      console.log(err);
      return res.status(400).send(`CART'S PRODUCT ISSUE`);
    });
}

// deleting a product from carts's document
function deleteOneProduct(req, res) {
  const ID = req.params.id;
  const SALE = req.body.sale;
  const PRICE = req.body.price;
  const pull = { $pull: { products: { _id: ID } },$inc:{sale:-(SALE/100*PRICE),sum:-PRICE}};
  const myCart = { _id: ObjectId("618d8abc6952a1b331f2bf2f") };
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection("carts")
        .findOneAndUpdate(myCart, pull)
        .then((response) => {
          if ((response.value == null) || (response.value == undefined))return res.status(404)
          res.send(response);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
}
// -----------------------------------------------------------------------------

// changing the quntatiy of a product and handeling sum,price and sale using patch
function changeQnt(req, res) {
  const QNT = req.body.qnt;
  const SALE = req.body.sale;
  const SUM = req.body.sum;
  const ID = req.params.id;
  let  updatedQnt = {$set: { "products.$.qnt": QNT,sale:SALE,sum:SUM,shipping:25 }}
  if(SUM>=20000){
    updatedQnt =  {$set: { "products.$.qnt": QNT,sale:SALE,sum:SUM,shipping:0}}
  }
  const myCart = {_id:ObjectId("618d8abc6952a1b331f2bf2f"), "products._id": ID};
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection("carts")
        .updateOne(myCart, updatedQnt)
        .then((response) => {
          if (response.matchedCount!= 1) {
            console.log(response);
            res.status(404).send(response);
            return;
          }
          res.send(response);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
}
// ------------------------------------------------
module.exports = {
  fullData,
  insertOneProduct,
  deleteOneProduct,
  changeQnt,
  getSingleCart
};
