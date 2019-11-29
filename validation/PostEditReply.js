const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEditRepliesInput(data) {
    let errors = {};

    data.Edit_Reply = !isEmpty(data.Edit_Reply) ? data.Edit_Reply : '';

    if (!Validator.isLength(data.Edit_Reply, {
            min: 10,
            max: 1000
        })) {
        errors.Edit_Reply = 'Post must be between 10 and 1000 characters';
    }

    if (Validator.isEmpty(data.Edit_Reply)) {
        errors.Edit_Reply = 'Text field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};