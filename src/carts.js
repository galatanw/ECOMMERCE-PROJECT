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
      return res.status(500).send(`site on construction`);
    });
}

function insertOneProduct(req, res) {
  console.log("here");
  const body = req.body;
  body.qnt = Number(body.qnt);
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection("carts")
        .findOneAndUpdate({user_id: 123},{ $push: { products: body } },{upsert:true})
        .then((data) => {
          return res.send(data);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(`site on construction`);
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
  const QNT = req.body.qnt;
  const ID = req.params.id;
  const updatedQnt = {$set: { "products.$.qnt": QNT}};
  const myCart = {user_id: 123, "products._id": ID};
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection("carts")
        .updateOne(myCart, updatedQnt)
        .then((response) => {
          if ( response.matchedCount!= 1) {
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

module.exports = {
  fullData,
  insertOneProduct,
  deleteOneProduct,
  changeQnt,
};
