const { connectToDB, closeConnection } = require("../../modals/db");
const { ErrorMessage, successMessage } = require("../../helpers/message");
const mongodb = require("mongodb");
const { fetchByIdValidator } = require("../../Validators/restaurantValidator");

/* retrive a restaurants by restaurantId */
const fetchRestaurant = async (req, res) => {
  try {
    const validation = fetchByIdValidator(req.body.restaurantId, res);
    if (validation) return;

    const { restaurantId } = req.body;
    const { client, db } = await connectToDB();
    const restaurantDetail = await db
      .collection("restaurants")
      .findOne({ _id: mongodb.ObjectId(restaurantId) });
    successMessage({ restaurantDetail }, res);
    closeConnection(client);
  } catch (error) {
    ErrorMessage(500, "Something went wrong in server", res);
  }
};

module.exports = { fetchRestaurant };
