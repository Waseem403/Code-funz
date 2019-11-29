const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTodosInput(data) {
  let errors = {};
  data.TodoTitle = !isEmpty(data.TodoTitle) ? data.TodoTitle : "";
  data.TodoDesc = !isEmpty(data.TodoDesc) ? data.TodoDesc : "";

  if (Validator.isEmpty(data.TodoTitle)) {
    errors.TodoTitle = "TodoTitle field is required";
  }
  if (!Validator.isLength(data.TodoTitle, {
      min: 5,
      max: 20
    })) {
    errors.TodoTitle =
      "TodoTitle must be more than 5 letters and less than 20 letters ";
  }
  if (Validator.isEmpty(data.TodoDesc)) {
    errors.TodoDesc = "TodoDesc field is required";
  }

  if (!Validator.isLength(data.TodoDesc, {
      min: 10,
      max: 500
    })) {
    errors.TodoDesc =
      "TodoDesc must be more than 10 letters and less than 500 letters ";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};