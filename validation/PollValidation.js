const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePollInput(data) {
    let errors = {};

    data.Question = !isEmpty(data.Question) ? data.Question : '';
    data.Option1 = !isEmpty(data.Option1) ? data.Option1 : '';
    data.Option2 = !isEmpty(data.Option2) ? data.Option2 : '';
    data.Option3 = !isEmpty(data.Option3) ? data.Option3 : '';
    data.Option4 = !isEmpty(data.Option4) ? data.Option4 : '';

    //validation of question
    if (!Validator.isLength(data.Question, {
            min: 10,
            max: 1000
        })) {
        errors.Question = 'Poll question must be between 10 and 1000 characters';
    }

    if (Validator.isEmpty(data.Question)) {
        errors.Question = 'Poll field is required';
    }


    //validation of option1

    if (!Validator.isLength(data.Option1, {
            min: 2,
            max: 100
        })) {
        errors.Option1 = 'Option1 must be between 2 and 100 characters';
    }

    if (Validator.isEmpty(data.Option1)) {
        errors.Option1 = 'Option1 field is required';
    }


    //validation of option2
    if (!Validator.isLength(data.Option2, {
            min: 2,
            max: 100
        })) {
        errors.Option2 = 'Option2 must be between 2 and 100 characters';
    }

    if (Validator.isEmpty(data.Option2)) {
        errors.Option2 = 'Option2 field is required';
    }

    //validation of option3
    if (!Validator.isLength(data.Option3, {
            min: 2,
            max: 100
        })) {
        errors.Option3 = 'Option3 must be between 2 and 100 characters';
    }

    if (Validator.isEmpty(data.Option3)) {
        errors.Option3 = 'Option3 field is required';
    }

    //validation of option4
    if (!Validator.isLength(data.Option4, {
            min: 2,
            max: 100
        })) {
        errors.Option4 = 'Option4 must be between 2 and 100 characters';
    }

    if (Validator.isEmpty(data.Option4)) {
        errors.Option4 = 'Option4 field is required';
    }



    return {
        errors,
        isValid: isEmpty(errors)
    };
};