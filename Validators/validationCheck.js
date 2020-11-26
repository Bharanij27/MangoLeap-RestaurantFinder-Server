const { ErrorMessage } = require("../helpers/message");

const validationCheck = (validation, res) => {
  if (validation.fails()) {
    ErrorMessage(412, "Validation error", res);
    return true;
  }
  return false;
};

module.exports = { validationCheck }