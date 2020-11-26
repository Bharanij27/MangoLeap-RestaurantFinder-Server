var express = require("express");
var router = express.Router();
const { LoginController } = require("../controller/IndexController/LoginController");
const { SignUpController } = require("../controller/IndexController/SignUpController");

router.post("/", LoginController); //login to account
router.post("/newUser", SignUpController); //SignUp as a new user
module.exports = router;