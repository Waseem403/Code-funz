const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateForgetInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";

  if (!Validator.isEmail(data.email)) {
    errors.Forgotemail = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.Forgotemail = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
