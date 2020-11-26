const mongodb = require("mongodb");
const { authenticate } = require('../middleware/AuthToken');
const mongoClient = mongodb.MongoClient;
const url = process.env.mongodbURL || "mongodb://localhost:27017/";

const connectToDB = async () => {
    const client = await mongoClient.connect(url);
    const db = client.db("zenClass");
    return { client, db }
}

const closeConnection = (client) => client.close();

module.exports = { connectToDB, closeConnection }