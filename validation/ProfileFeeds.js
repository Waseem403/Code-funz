const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileFeedsInput(data) {
    let errors = {};
    data.StatusComment = !isEmpty(data.StatusComment) ? data.StatusComment : '';
    if (!Validator.isLength(data.StatusComment, {
            min: 2,
            max: 1500
        })) {
        errors.StatusComment = 'Post must be between 2 and 1500 characters';
    }

    if (Validator.isEmpty(data.StatusComment)) {
        errors.StatusComment = 'status Comment field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};