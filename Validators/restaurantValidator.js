const Validator = require("validatorjs");
const { ErrorMessage } = require("../helpers/message");
const { validationCheck } = require("./validationCheck");
const ObjectID = require("mongodb").ObjectID;

const fetchByCityValidator = (restaurantId, res) => {
  const validation = new Validator(
    {
      restaurantId,
    },
    {
      restaurantId: [
        "required",
        { in: ["Chennai", "Mumbai", "NewDelhi", "Bangalore"] },
      ],
    }
  );
  return validationCheck(validation, res);
};



const fetchByIdValidator = (id, res) => {
  const validation = ObjectID.isValid(id);
  if (!validation) {
    ErrorMessage(412, "Validation error", res);
    return true;
  }
};



const additionValidator = (data) => {
  try {
    const { name, street, locality, city, state, cuisine, menu, res } = {
      ...data,
    };
    const validation = new Validator(
      {
        name,
        street,
        locality,
        city,
        state,
        cuisine,
        menu,
      },
      {
        name: "required|min: 4",
        street: "required|min: 4",
        locality: "required|min: 3",
        city: [
          "required",
          { in: ["Chennai", "Mumbai", "NewDelhi", "Bangalore"] },
        ],
        state: [
          "required",
          { in: ["TamilNadu", "Maharastra", "Delhi", "Karnataka"] },
        ],
        cuisine: "size:1",
        "menu.*.name": "required|min: 3",
        "menu.*.price": "required",
      }
    );
    return validationCheck(validation, res);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  fetchByCityValidator,
  fetchByIdValidator,
  additionValidator,
};
