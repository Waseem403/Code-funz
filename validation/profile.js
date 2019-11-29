const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.frontendskills = !isEmpty(data.frontendskills) ?
    data.frontendskills :
    "";
  data.bussinessskills = !isEmpty(data.bussinessskills) ?
    data.bussinessskills :
    "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.backendskills = !isEmpty(data.backendskills) ? data.backendskills : "";
  data.work_exp = !isEmpty(data.work_exp) ? data.work_exp : "";
  data.DOB = !isEmpty(data.DOB) ? data.DOB : "";

  data.location = !isEmpty(data.location) ? data.location : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";

  if (!Validator.isLength(data.handle, {
      min: 2,
      max: 40
    })) {
    errors.handle = "Handle needs to between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  if (Validator.isEmpty(data.frontendskills)) {
    errors.frontendskills = "Skills field is required";
  }
  if (Validator.isEmpty(data.bussinessskills)) {
    errors.bussinessskills = "Skills field is required";
  }
  if (Validator.isEmpty(data.backendskills)) {
    errors.backendskills = "Skills field is required";
  }
  if (Validator.isEmpty(data.work_exp)) {
    errors.work_exp = "Work Experience field is required";
  }

  if (isNaN(data.work_exp)) {
    errors.work_exp = "Work experience Should be in number";
  }
  if (Validator.isEmpty(data.DOB)) {
    errors.DOB = "Date of birth is required";
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = "location is required";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "company/school name is required";
  }

  if (Validator.isEmpty(data.bio)) {
    errors.bio = "bio is required";
  }
  if (!Validator.isLength(data.bio, {
      min: 50,
      max: 2000
    })) {
    errors.bio = "Bio needs to between 50 and 500 characters";
  }
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};