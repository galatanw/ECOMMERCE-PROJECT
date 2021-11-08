require("dotenv").config();
const mongo = require("mongodb"),
  url = process.env.MONGO_DEV_URL,
  client = mongo.MongoClient.connect(url),
  ObjectId = mongo.ObjectId;
(dbName = "ecommerce"), (collection = "carts");

function fullData(req, res) {
    client
      .then((db) => {
        const dbo = db.db(dbName);
        dbo
          .collection(collection)
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


function insertOneProduct(req,res) {
  const body=req.body
  client
  .then((db) => {
    const dbo = db.db(dbName);
    dbo
      .collection(collection)
      .findOneAndUpdate({},{$push:{products:{body}}})
      .then((data) => {
        return res.send(data);
      });
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).send(`site on construction`);
  });
}

function deleteOneProduct(req,res) {
  const body=req.body
  client
  .then((db) => {
  } 
}

module.exports={fullData,insertOneProduct}
