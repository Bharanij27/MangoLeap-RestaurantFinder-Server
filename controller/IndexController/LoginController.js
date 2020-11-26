const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectToDB, closeConnection } = require("../../modals/db");
const { ErrorMessage, successMessage } = require("../../helpers/message");
const { loginValidator } = require("../../Validators/indexValidators");

/* login using email, password, userType */
const LoginController = async (req, res) => {
  try {
    const validation = loginValidator({ ...req.body, res });
    if (validation) return;

    const { email, pass, type } = req.body;
    const { client, db } = await connectToDB();
    const existing = await db
      .collection("restaurant-users")
      .findOne({ email: email, type: type });

    if (!existing) {
      ErrorMessage(404, "No such exists", res);
    } else {
      const comparedResult = await bcryptjs.compare(pass, existing.pass);
      if (!comparedResult) ErrorMessage(401, "Password did not match", res);
      else {
        const token = jwt.sign({ id: email }, "secret key");
        successMessage({ token, type: existing.type }, res);
      }
    }
    closeConnection(client);
  } catch (error) {
    ErrorMessage(500, "Something went wrong in server", res);
  }
};

module.exports = { LoginController };
