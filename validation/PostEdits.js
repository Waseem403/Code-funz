const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEditPostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.Edit_Message) ? data.Edit_Message : '';

    if (!Validator.isLength(data.Edit_Message, {
            min: 10,
            max: 1000
        })) {
        errors.Edit_Message = 'Post must be between 10 and 1000 characters';
    }

    if (Validator.isEmpty(data.Edit_Message)) {
        errors.Edit_Message = 'text field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};