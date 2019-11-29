const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileEditFeedsInput(data) {
    let errors = {};
    data.Edit_StatusComment = !isEmpty(data.Edit_StatusComment) ? data.Edit_StatusComment : '';
    if (!Validator.isLength(data.Edit_StatusComment, {
            min: 2,
            max: 1500
        })) {
        errors.Edit_StatusComment = 'Post must be between 2 and 1500 characters';
    }

    if (Validator.isEmpty(data.Edit_StatusComment)) {
        errors.Edit_StatusComment = 'status Comment field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};