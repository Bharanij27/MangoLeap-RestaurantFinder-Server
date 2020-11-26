const { connectToDB, closeConnection } = require("../../modals/db");
const { ErrorMessage, successMessage } = require("../../helpers/message");
const {
  fetchByCityValidator,
} = require("../../Validators/restaurantValidator");

/* retrive all restaurants by city */
const fetchAllResturants = async (req, res) => {
  try {
    const validation = fetchByCityValidator(req.body.city, res);
    if (validation) return;

    const { city } = req.body;
    const { client, db } = await connectToDB();
    const restaurants = await db
      .collection("restaurants")
      .find({ "address.city": city })
      .toArray();
    successMessage({ restaurants }, res);
    closeConnection(client);
  } catch (error) {
    ErrorMessage(500, "Something went wrong in server", res);
  }
};

module.exports = { fetchAllResturants };
