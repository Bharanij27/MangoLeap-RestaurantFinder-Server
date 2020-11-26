const Validator = require("validatorjs");
const { validationCheck } = require("./validationCheck");

const loginValidator = ({ email, pass, type, res }) => {
  const validation = new Validator(
    {
      email,
      pass,
      type,
    },
    {
      email: "required|email",
      pass: "required|min: 4",
      type: ["required", { in: ["User", "Admin"] }],
    }
  );
  return validationCheck(validation, res);
};



const signupValidator = ({ uname, email, pass, type, res }) => {
  const validation = new Validator(
    {
      uname,
      email,
      pass,
      type,
    },
    {
      email: "required|email",
      pass: "required|min: 4",
      uname: "required|min: 1",
      type: ["required", { in: ["User", "Admin"] }],
    }
  );
  return validationCheck(validation, res);
};

module.exports = { loginValidator, signupValidator };
