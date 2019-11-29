const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTodoLabelInput(data) {
  let errors = {};
  data.LabelName = !isEmpty(data.LabelName) ? data.LabelName : "";

  if (!Validator.isLength(data.LabelName, {
      min: 2,
      max: 10
    })) {
    errors.LabelName = "field should be btw 2-10 chars";
  }

  if (Validator.isEmpty(data.LabelName)) {
    errors.LabelName = "field required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};