const bcryptjs = require("bcryptjs");
const { connectToDB, closeConnection } = require("../../modals/db");
const { ErrorMessage, successMessage } = require("../../helpers/message");
const { signupValidator } = require("../../Validators/indexValidators");

//Sign with necessary details
const SignUpController = async (req, res) => {
  try {
    const validation = signupValidator({ ...req.body, res });
    if (validation) return;

    const user = { ...req.body };
    const { client, db } = await connectToDB();
    const existingUser = await db.collection("restaurant-users").findOne({
      $or: [{ email: user.email }, { name: user.uname }],
    });

    if (existingUser) {
      const exisitingData =
        existingUser.email === user.email ? "Email Id" : "User Name";
      ErrorMessage(409, `${exisitingData} already exists`, res);
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(user.pass, salt);
      user.pass = hashedPassword;

      await db.collection("restaurant-users").insertOne({
        name: user.uname,
        email: user.email,
        pass: user.pass,
        type: user.type,
      });

      successMessage(
        {
          message: "New User Account Created",
        },
        res
      );
    }
    closeConnection(client);
  } catch (error) {
    console.log(error);
    ErrorMessage(500, "Something went wrong in server", res);
  }
};

module.exports = { SignUpController };
