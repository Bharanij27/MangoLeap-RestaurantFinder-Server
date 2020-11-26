const jwt = require("jsonwebtoken");
const { ErrorMessage } = require("../helpers/message");

const authenticate = (req, res, next) => {
  try {
    const { token } = req.body;
    const decrypted = jwt.verify(token, "secret key");
    if (decrypted) next();
    else throw "error";
  } catch (error) {
    ErrorMessage(401, "Not a valid user", res);
  }
};

module.exports = { authenticate };
