require("dotenv").config();
const mongo = require("mongodb"),
  url = process.env.MONGO_DEV_URL,
  client = mongo.MongoClient.connect(url),
  dbName = "ecommerce",
  collection = "carts";
ObjectId = mongo.ObjectId;

function fullData(req, res) {
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection("carts")
        .find({})
        .toArray()
        .then((data) => {
          return res.send(data);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send(`CART'S PRODUCT ISSUE`);
    });
}
function getSingleProduct(req,res) {
  client
  .then((db) => {
    const dbo = db.db(dbName);
    dbo
      .collection("carts")
      .findOne({_id:ObjectId("618a6c6ee07aebb574e1d29b")})
      .then((data) => {
        return res.send(data);
      });
  })
  .catch((err) => {
    console.log(err);
    return res.status(400).send(`CART'S PRODUCT ISSUE`);
  });
}

function insertOneProduct(req, res) {
  console.log("here");
  const body = req.body;
  const price=body.price;
  const sale=body.sale
  console.log(body);
  body.qnt = Number(body.qnt);
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection("carts")
        .findOneAndUpdate({_id:ObjectId("618a6c6ee07aebb574e1d29b")},{ $push: { products: body },$inc:{sum:price , sale:(price-(sale/100*price))}})
        .then((data) => {
          return res.send(data);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send(`CART'S PRODUCT ISSUE`);
    });
}

function deleteOneProduct(req, res) {
  const ID = req.params.id;
  const pull = { $pull: { products: { _id: ID } } };
  const myCart = { _id: ObjectId("618a6c6ee07aebb574e1d29b") };
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection("carts")
        .findOneAndUpdate(myCart, pull)
        .then((response) => {
          if ((response.value == null) | (response.value == undefined)) {
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
function changeQnt(req, res) {
  console.log(1)
  const QNT = req.body.qnt;
  const SALE = req.body.sale;
  const SUM = req.body.sum;
  const ID = req.params.id;

    let updatedQnt
  if(SUM>=20000){
    updatedQnt =  {$set: { "products.$.qnt": QNT,sale:SALE,sum:SUM,shipping:0}}
  }
  else{
    updatedQnt = {$set: { "products.$.qnt": QNT,sale:SALE,sum:SUM,shipping:25 }}
  }
  const myCart = {_id:ObjectId("618a6c6ee07aebb574e1d29b"), "products._id": ID};
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

// function sum(req,res) {
//   client
//   .then( )
// }

module.exports = {
  fullData,
  insertOneProduct,
  deleteOneProduct,
  changeQnt,
  getSingleProduct
};
