const { connectToDB, closeConnection } = require("../../modals/db");
const { ErrorMessage, successMessage } = require("../../helpers/message");
const { additionValidator } = require("../../Validators/restaurantValidator");

/* Add a restaurants */
const AddRestaurant = async (req, res) => {
  try {
    const validation = additionValidator({ ...req.body.newRestaurtant, res });
    if (validation) return;

    const { newRestaurtant } = req.body;
    const { client, db } = await connectToDB();
    const insertData = await db.collection("restaurants").insertOne({
      name: newRestaurtant.name,
      address: {
        street: newRestaurtant.street,
        locality: newRestaurtant.locality,
        city: newRestaurtant.city,
        state: newRestaurtant.state,
        country: "India",
      },
      cuisine: newRestaurtant.cuisine,
      menu: newRestaurtant.menu,
    });
    successMessage({ insertData }, res);
    closeConnection(client);
  } catch (error) {
    ErrorMessage(500, "Something went wrong in server", res);
  }
};

module.exports = { AddRestaurant };
