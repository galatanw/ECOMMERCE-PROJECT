const mongo = require("mongodb"),
  url = "mongodb://localhost:27017/",
  client = mongo.MongoClient.connect(url),
  dbName = "ecommerce",
  collection = "products";







  // -------------------
function addingProduct(req, res) {
  let body = req.body;
  for (const key in body) {
    const element = body[key];
    if (key == "images") {
      if (
        element[0].indexOf(" ") >= 0 ||
        element[1].indexOf(" ") >= 0 ||
        element[2].indexOf(" ") >= 0 ||
        element[3].indexOf(" ") >= 0
      ) {
        return res.status(400).send(`src can not contain spaces`);
      }
    } else {
      if (element[0] == "" || element == null || element == undefined) {
        return res.status(400).send(`${key} is unqualified`);
      }
    }
  }
  if (!Number(body.sale) && !Number(body.price)) {
    return res.status(400).send("PRICE AND SALE MUST BE NUMERIC");
  }
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection(collection)
        .insertOne({
          WEIGHT: body.WEIGHT,
          color: body.color,
          description: body.description,
          images: body.images,
          INSURANCE: body.INSURANCE,
          price: body.price,
          brand: body.brand,
          qnt: body.qnt,
          sale: body.sale,
          category: body.category,
          one: body.one,
          two: body.two,
        })
        .then((data) => {
          return res.send(data);
        });
    })

    .catch((err) => {
      return res.status(400).send(err);
    });
}







// -----------------------------------------
function fullProdcuctsData(req, res) {
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






// ---------------------------
function UpdateProduct(req, res) {
  let body = req.body;
  for (const key in body) {
    const element = body[key];
    if (key == "images") {
      if (
        element[0].indexOf(" ") >= 0 ||
        element[1].indexOf(" ") >= 0 ||
        element[2].indexOf(" ") >= 0 ||
        element[3].indexOf(" ") >= 0
      ) {
        return res.status(400).send(`src can not contain spaces`);
      }
    } else {
      if (element[0] == "" || element == null || element == undefined) {
        return res.status(400).send(`${key} is unqualified`);
      }
    }
  }
  if (!Number(body.sale) && !Number(body.price)) {
    return res.status(400).send("PRICE AND SALE MUST BE NUMERIC");
  }
  const ID = req.params.id;
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection(collection)
        .findOneAndUpdate(
          { _id: mongo.ObjectId(ID) },
          {
            $set: {
              WEIGHT: body.WEIGHT,
              color: body.color,
              description: body.description,
              images: body.images,
              INSURANCE: body.INSURANCE,
              price: body.price,
              brand: body.brand,
              qnt: body.qnt,
              sale: body.sale,
              category: body.category,
              one: body.one,
              two: body.two,
            },
          }
        )
        .then((data) => {
          // adding modifire change
          if (data.value == null) {
            return res.status(404).send("product not found :/");
          }
          return res.send(data);
        });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
}




// ------------------------------------
function deleteProduct(req, res) {
  const ID = req.params.id;
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection(collection)
        .findOneAndDelete({ _id: mongo.ObjectId(ID) })
        .then((data) => {
          if (data.value == null) {
            res.status(404).send("product not found :/");
            return;
          }
          res.send(data);
        });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
}

module.exports = {
  fullProdcuctsData,
  addingProduct,
  UpdateProduct,
  deleteProduct,
};
