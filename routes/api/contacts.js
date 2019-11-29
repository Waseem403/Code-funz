const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("../../config/keys");

const validateContactInput = require("../../validation/contact");

const Contacts = require("../../model/contact");

// @route   GET api/contacts/contactus
// @desc    contact form
// @access  Public

router.post("/contactus", (req, res) => {
  const {
    errors,
    isValid
  } = validateContactInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Contacts.findOne({
    email: req.body.email
  }).then(contact => {
    if (contact) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newContacts = new Contacts({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        phone: req.body.phone
      });

      newContacts
        .save()
        .then(user => res.status(200).send("thanks for contacting us!. We will get back to you shortly"))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;