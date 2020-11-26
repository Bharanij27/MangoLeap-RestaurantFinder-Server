var express = require("express");
const { AddRestaurant } = require("../controller/RestaurantControllers/AddRestaurant");
const { fetchAllResturants } = require("../controller/RestaurantControllers/fetchAllRestaurant");
const { fetchRestaurant } = require("../controller/RestaurantControllers/Restaurant");
var router = express.Router();
const { authenticate } = require("../middleware/AuthToken");

router.post("/", authenticate, fetchAllResturants);
router.post("/:restaurantId", authenticate, fetchRestaurant);
router.put("/add", authenticate, AddRestaurant);

module.exports = router;
