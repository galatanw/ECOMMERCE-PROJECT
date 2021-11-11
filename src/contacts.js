require("dotenv").config();
const mongo = require("mongodb"),
  dbName = "ecommerce",
  url = process.env.MONGO_URL,
  client = mongo.MongoClient.connect(url),
  ObjectId = mongo.ObjectId;




// POST the message that came in the request's body and validate that they are not empty 
function insertMessage(req, res) {
  const body = req.body;
  console.log(body);
  for (const key in body) {
    const element = body[key];
    if (element[0] == " ") {
      res.status(400).send(`empty ${key}`);
      return;
    }
    if (body["email"].match(/@/gi).length > 1) {
      res.status(400).send("email must contain one @ ");
      return;
    }
  }
  const message={email:body.email,name:body.name,message:body.message}
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection("contacts")
        .insertOne(message)
        .then((result) => {
          res.send(result);
          console.log(result);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
}


// GET all the documents in the cotntacts collection 
function fullData(req, res) {
  client
    .then((db) => {
      const dbo = db.db(dbName);
      dbo
        .collection("contacts")
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


module.exports={
    insertMessage,
    fullData
}