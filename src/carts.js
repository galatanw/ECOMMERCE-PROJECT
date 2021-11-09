const { ObjectID } = require("bson");

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
  const body = req.body;
  body.qnt = Number(body.qnt);
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection("carts")
        .findOneAndUpdate({}, { $push: { products: body } })
        .then((data) => {
          return res.send(data);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(`site on construction`);
    });
}

function cartProductQnt(req, res) {
  const body = req.body;
  const qnt = body.qnt;
  const ID = params.id;
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection("carts")
        .findOneAndUpdate(
          { "products._id": { _id: ObjectID(ID) } },
          { $set: { qnt: qnt } }
        )
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
  client.then((db) => {
    const dbo = db.db(dbName);
    dbo
      .collection("carts")
      .findOneAndUpdate({products: { id: ObjectID(ID)}}, { $pull: { products: { id: ObjectID(ID) } } })
      .then((result) => {
        res.send(result);
      });
  });
}
module.exports = {
  fullData,
  insertOneProduct,
  deleteOneProduct,
  cartProductQnt,
};
