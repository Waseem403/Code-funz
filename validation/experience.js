const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to = !isEmpty(data.to) ? data.to : '';
  data.description = !isEmpty(data.description) ? data.description : '';


  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }
  if (!Validator.isLength(data.title, {
      min: 2,
      max: 20
    })) {
    errors.title = "title name needs to between 2 and 20 characters";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (!Validator.isLength(data.company, {
      min: 2,
      max: 20
    })) {
    errors.company = "company name needs to between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'location field is required';
  }
  if (!Validator.isLength(data.location, {
      min: 2,
      max: 15
    })) {
    errors.location = "location needs to between 2 and 15 characters";
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
    errors.jobdescription = "description needs to between 10 and 800 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};