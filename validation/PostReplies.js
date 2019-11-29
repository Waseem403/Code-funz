const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRepliesInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, {
            min: 10,
            max: 1000
        })) {
        errors.Replies = 'Post must be between 10 and 1000 characters';
    }

    if (Validator.isEmpty(data.text)) {
        errors.Replies = 'Text field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};