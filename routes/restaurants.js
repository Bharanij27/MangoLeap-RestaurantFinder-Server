var express = require('express');
var router = express.Router();
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const url = process.env.mongodbURL || "mongodb://localhost:27017/";
const jwt = require("jsonwebtoken");

/* retrive all restaurants by city */
router.post('/', async function(req, res, next) {
  
  let client;
  let {token, city} = req.body;

  try {
      client = await mongoClient.connect(url);
      let db = client.db("zenClass");
      let decrypted = jwt.verify(token, "secret key");
      if(decrypted){
        let restaurants = await db.collection("restaurants").find({'address.city' : city}).toArray();
        res.json({
          status : 200,
          restaurants
        })
      }
      else{
        res.json({
          status : 401,
          message : 'Not a Valid User'
        })
      }
      client.close();
    } catch (error) {
      console.log(error);
      res.json({
        status: 500,
        message: "Something went wrong in server",
      });
    }  
});


/* retrive a restaurants by restaurantId */
router.post('/:restaurantId', async function(req, res, next) {
  
  let client;
  let {token, restaurantId} = req.body;

  try {
      client = await mongoClient.connect(url);
      let db = client.db("zenClass");
      let decrypted = jwt.verify(token, "secret key");
      if(decrypted){
        let restaurantDetail = await db.collection("restaurants").findOne({_id : mongodb.ObjectId(restaurantId)});
        res.json({
          status : 200,
          restaurantDetail
        })
      }
      else{
        res.json({
          status : 401,
          message : 'Not a Valid User'
        })
      }
      client.close();
    } catch (error) {
      console.log(error);
      res.json({
        status: 500,
        message: "Something went wrong in server",
      });
    }  
});

/* Add a restaurants */
router.put('/add', async function(req, res, next) {
  
  let client;
  let {token, newRestaurtant} = req.body;

  try {
      client = await mongoClient.connect(url);
      let db = client.db("zenClass");
      let decrypted = jwt.verify(token, "secret key");
      if(decrypted){
        let insertData = await db.collection("restaurants").insertOne({
          name : newRestaurtant.name,
          address : {
            street : newRestaurtant.street,
            locality : newRestaurtant.locality,
            city : newRestaurtant.city,
            state : newRestaurtant.state,
            country : "India"
          },
          cuisine : newRestaurtant.cuisine,
          menu : newRestaurtant.menu
        });
        res.json({
          status : 200,
          restaurantDetail
        })
      }
      else{
        res.json({
          status : 401,
          message : 'Not a Valid User'
        })
      }
      client.close();
    } catch (error) {
      console.log(error);
      res.json({
        status: 500,
        message: "Something went wrong in server",
      });
    }  
});

module.exports = router;
