const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateFeedbackInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.message = !isEmpty(data.message) ? data.message : "";
  data.stars = !isEmpty(data.stars) ? data.stars : "";

  if (Validator.isEmpty(data.message)) {
    errors.message = "message field is required";
  }
  if (!Validator.isLength(data.message, { min: 10, max: 1500 })) {
    errors.message =
      "Message must be more than 10 letters and less than 1500 letters ";
  }
  if (Validator.isEmpty(data.stars)) {
    errors.stars = "stars field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
