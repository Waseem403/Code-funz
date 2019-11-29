const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateContactInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.message = !isEmpty(data.message) ? data.message : "";

  if (!Validator.isLength(data.name, { min: 2, max: 15 })) {
    errors.name = "Name must be between 2 and 15 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "phone field is required";
  }
  if (!Validator.isLength(data.phone, { min: 10, max: 10 })) {
    errors.phone = "Please enter a valid mobile number";
  }

  if (Validator.isEmpty(data.message)) {
    errors.message = "message field is required";
  }

  if (!Validator.isLength(data.message, { min: 10, max: 300 })) {
    errors.message = "message must be between 10 and 300 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
