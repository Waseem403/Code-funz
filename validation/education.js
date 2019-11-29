const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to = !isEmpty(data.to) ? data.to : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  if (Validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }
  if (!Validator.isLength(data.school, {
      min: 4,
      max: 40
    })) {
    errors.school = "school name needs to between 4 and 40 characters";
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }


  if (!Validator.isLength(data.degree, {
      min: 2,
      max: 20
    })) {
    errors.degree = "degree name needs to between 2 and 20 characters";
  }


  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required';
  }

  if (!Validator.isLength(data.fieldofstudy, {
      min: 2,
      max: 40
    })) {
    errors.fieldofstudy = "fieldofstudy name needs to between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  if (data.current === false) {
    if (Validator.isEmpty(data.to)) {
      errors.to = 'to date field is required';
    }
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = 'description field is required';
  }


  if (!Validator.isLength(data.description, {
      min: 10,
      max: 800
    })) {
    errors.description = "description needs to between 10 and 800 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};