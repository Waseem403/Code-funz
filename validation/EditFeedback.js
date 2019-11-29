const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEditFeedbackInput(data) {
    let errors = {};

    data.Edit_Message = !isEmpty(data.Edit_Message) ? data.Edit_Message : "";
    data.Stars = !isEmpty(data.Stars) ? data.Stars : "";

    if (Validator.isEmpty(data.Edit_Message)) {
        errors.Edit_Message = "message field is required";
    }
    if (!Validator.isLength(data.Edit_Message, {
            min: 10,
            max: 1500
        })) {
        errors.Edit_Message =
            "Message must be more than 10 letters and less than 1500 letters ";
    }
    if (Validator.isEmpty(data.Stars)) {
        errors.Stars = "Stars field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};