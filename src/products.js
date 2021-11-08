require("dotenv").config();
const mongo = require("mongodb"),
  url = process.env.MONGO_DEV_URL,
  client = mongo.MongoClient.connect(url),
  ObjectId = mongo.ObjectId;
(dbName = "ecommerce"), (collection = "products");

// -------------------
function addingProduct(req, res) {
  let body = req.body;
  console.log(body);
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
          two: body.two
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
function fullCategoryData(req, res, filter) {
  console.log(1);
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection(collection)
        .find({category: filter})
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

// ------------------------------------------------

function fullProductsData(req, res) {
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
function UpdateProduct(req,res){
  let body=req.body;
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
              WEIGHT: body.weight,
              color: body.color,
              description: body.description,
              images: body.images,
              INSURANCE: body.insurance,
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



// ----------------------------------------


function SingleproductHbs(req, res) {
  const ID = req.params.id;
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection(collection)
        .findOne({ _id: ObjectId(ID) })
        .then((data) => {
          res.render("index", {
            description: data.description,
            price: data.price,
            color: data.color,
            weight: data.WEIGHT,
            one: data.one,
            two: data.two,
            firstImage: data.images[0],
            secondImage: data.images[1],
            thirdImage: data.images[2],
            fourImage: data.images[3],
            product: true,
            ID:ID,
            logo: "https://i.ibb.co/JqRWZS8/77fb4fdce8db4ce58087c6792dd09418.png",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).send(`this ID does not match with any product`);
    });
}






// ------------------------------------------


function updateSingleProduct(req, res) {
  const ID = req.params.id;
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection(collection)
        .findOne({ _id: ObjectId(ID) })
        .then((data) => {
          res.render("index", {
            sale: data.sale,
            brand: data.brand,
            category: data.category,
            insurance: data.INSURANCE,
            qnt: data.qnt,
            description: data.description,
            price: data.price,
            color: data.color,
            weight: data.WEIGHT,
            one: data.one,
            two: data.two,
            Image: data.images[0],
            update: true,
            ID: ID,
            image1:data.images[0],
            image2:data.images[1],
            image3:data.images[2],
            image4:data.images[3]
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).send(`this ID does not match with any product`);
    });
}


// ----------------------------------------------------
function Singleproduct(req, res) {
  const ID = req.params.id;
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection(collection)
        .findOne({ _id: ObjectId(ID) })
        .then((data) => {
          res.send(data)
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).send(`this ID does not match with any product`);
    });
})
}


module.exports = {
  fullCategoryData,
  addingProduct,
  UpdateProduct,
  deleteProduct,
  fullProductsData,
  SingleproductHbs,
  Singleproduct,
  updateSingleProduct,
};
