require("dotenv").config();
const mongo = require("mongodb"),
  url = process.env.MONGO_URL,
  client = mongo.MongoClient.connect(url),
  ObjectId = mongo.ObjectId;
(dbName = "ecommerce"), (collection = "products");

function validateProduct(req, res, product) {
  if (Object.keys(product).length != 12) return res.sendStatus(400);
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
      if (
        element[0] == "" ||
        element == null ||
        element == undefined ||
        element[0] == " "
      ) {
        return res.status(400).send(`${key} is unqualified`);
      }
    }
    if (key == "category") {
      console.log(key);
      switch (element) {
        case "laptop":
          break;
        default:
          return res.status(400).send(`${key} is unqualified`);
      }
    }
  }
  if (!Number(body.sale) && !Number(body.price)) {
    return res.status(400).send("PRICE AND SALE MUST BE NUMERIC");
  }
}

function assingingProduct(body) {
  const product = {
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
  };
  return product
}

// POST to DB's products collection a product if validates
function addingProduct(req,res) {
  const body=req.body
  validateProduct(req, res, body);
  client
    .then((db) => {
      const product=assingingProduct(body)
      const dbo = db.db(dbName);
      dbo
        .collection(collection)
        .insertOne({product})
        .then((data) => {
          return res.send(data);
        });
    })

    .catch((err) => {
      console.log("ERROR AT PRODUCTS:addingProduct ");
      return res.status(400).send(err);
    });
}

// GET all products that match the category 
// filter using filter that been planted id the server
function fullCategoryData(req, res, filter) {
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection(collection)
        .find({ category: filter })
        .toArray()
        .then((data) => {

          return res.send(data);
        });
    })
    .catch((err) => {
      console.log("ERROR AT PRODUCTS:fullCategoryData ");
          console.log(err);
      return res.status(500).send(`site on construction`);
    });
}


// GET all the products from the products collection
function fullProductsData(req, res) {
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection(collection)
        .find({})
        .toArray()
        .then((data) => {
            if(data.length==0)return res.sendStatus
            (400)
          return res.send(data);
        });
    })
    .catch((err) => {
      console.log("ERROR AT PRODUCTS:fullProductsData ");
      console.log(err);
      return res.status(500).send(`site on construction`);
    });
}

// ---------------------------

      // GET the updated productuct via axios from
      // CLIENT and using the atomic operator
      // $set to update the current data


function UpdateProduct(req, res) {
  let body = req.body;
  validateProduct(req, res, body);
  const ID = req.params.id;
  client
    .then((db) => {
      const product=assingingProduct(body)
      const dbo = db.db(dbName);
      dbo
        .collection(collection)
        .findOneAndUpdate(
          { _id: mongo.ObjectId(ID) },
          {
            $set: {
              product
            },
          }
        )
        .then((data) => {
          if (data.value == null) {
            return res.status(404).send("product not found :/");
          }
          return res.send(data);
        });
    })
    .catch((err) => {
      console.log("ERROR AT PRODUCTS:UpdateProduct ");
      return res.status(400).send(err);
    });
}

// ------------------------------------

        // DELTE the entire document from the collection
        // using the ID as  param for identification

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
      console.log("ERROR AT PRODUCTS:deleteProduct ");
      console.log(err);
      return res.status(400).send(err);
    });
}

// ----------------------------------------
//GET the product and render it  to the "product.hbs" page 
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
            ID: ID,
            logo: "https://i.ibb.co/JqRWZS8/77fb4fdce8db4ce58087c6792dd09418.png",
          });
        });
    })
    .catch((err) => {
      console.log("ERROR AT PRODUCTS:singlProductHbs");
         console.log(err);
      return res.status(404).send(`this ID does not match with any product`);
    });
}

// ------------------------------------------

//GET the product and render it  to the "update.hbs" page 

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
            image1: data.images[0],
            image2: data.images[1],
            image3: data.images[2],
            image4: data.images[3],
          });
        });
    })
    .catch((err) => {
      console.log("ERROR AT PRODUCTS:updateSingleProduct" );
      console.log(err);
      return res.status(404).send(`this ID does not match with any product`);
    });
}

// ----------------------------------------------------

// GET the product and return it using the id as a param
// to filter it out
function Singleproduct(req, res) {
  const ID = req.params.id;
  client.then((db) => {
    const dbo = db.db(dbName);
    dbo
      .collection(collection)
      .findOne({ _id: ObjectId(ID) })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log("ERROR AT PRODUCTS: SINGLE PRODUCT ");
        console.log(err);
        return res.status(404).send(`this ID does not match with any product`);
      });
  });
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
