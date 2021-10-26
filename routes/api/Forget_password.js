const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("../../config/keys");
const waterfall = require("async-waterfall");
const async = require("async");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const bcrypt = require("bcryptjs");

const validateForgetInput = require("../../validation/Forget_pass");

router.get("/testing", (req, res) => {
  res.json({
    test: "working fine...."
  });
});

// @route   POST api/forget_password/forget
// @desc    forget password api
// @access  Public
router.post("/forgot", function (req, res, next) {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString("hex");
        done(err, token);
      });
    },

    function (token, done) {
      const {
        errors,
        isValid
      } = validateForgetInput(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      User.findOne({
        email: req.body.email
      }, function (err, user) {
        if (!user) {
          errors.Forgotemail = "No account with that email address exists !";
          return res.status(400).json(errors);
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function (err) {
          done(err, token, user);
        });
      });
    },

    function (token, user, done) {
      var transporter = nodemailer.createTransport(
        smtpTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "codefunzz@gmail.com",
            pass: "Wsm403$410"
          }
        })
      );
      var mailOptions = {
        to: user.email,
        from: "codefunzz@gmail.com",
        subject: "School Management Password Reset",
        text: "Hi " +
          user.name +
          "\n \n" +
          "You are receiving this mail because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
          "http://" +
          req.headers.host +
          "/password/reset/" +
          token +
          "\n\n" +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n \n" +
          "Regards,\n" +
          "School Management"
      };
      transporter.sendMail(mailOptions, function (err) {

        res.status(200).send(
          "An e-mail has been sent to " +
          user.email +
          " with further instructions."
        );
        done(err, "done");
      });
    }
  ]);
});

// @route   GET api/reset/toke
// @desc    getting pages from mail
// @access  Public

router.get("/reset/:token", function (req, res) {
  User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: Date.now()
      }
    },
    function (err, user) {
      if (!user) {
        return res.render("forgot");
      }
      let token = req.params.token;

      res.render("reset", {
        token: token,
        user: user
      });
    }
  );
});

// @route   Post password/forget/home
// @desc   displaying the success message
// @access  Public

router.get("/home", (req, res) => {
  res.render("home");
});

// @route   Post api/forget/rest/token
// @desc    forget password api
// @access  Public
router.post("/reset/:token", function (req, res, next) {
  async.waterfall([
    function (done) {
      User.findOne({
          resetPasswordToken: req.params.token,
          resetPasswordExpires: {
            $gt: Date.now()
          }
        },
        function (err, user) {
          if (!user) {
            req.flash(
              "error",
              "Password reset token is invalid or has expired."
            );
            return res.render("forgot");
          }

          const {
            password,
            password2
          } = req.body;
          const token = req.params.token;
          let errors = [];
          //check required fields
          if (!password || !password2) {
            errors.push({
              msg: "All Fields Are Mandatory"
            });
          }
          //password match check
          if (password !== password2) {
            errors.push({
              msg: "password do not match"
            });
          }
          //password length check
          if (password.length < 6) {
            errors.push({
              msg: "Password Must Be Atlease 6 Characters"
            });
          }
          if (errors.length > 0) {
            res.render("reset", {
              errors,
              password,
              password2,
              token
            });
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                let password = hash;
                user.password = password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                user.save(function (err) {
                  done(err, user);
                });
              });
            });
          }
        }
      );
    },
    function (user, done) {
      var transporter = nodemailer.createTransport(
        smtpTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "schoolmanagement410@gmail.com",
            pass: "9966599303"
          }
        })
      );
      var mailOptions = {
        to: user.email,
        from: "schoolmanagement410@gmail.com",
        subject: "School Management Password Reset",
        text: "Hi " +
          user.name +
          "\n \n" +
          "This is a confirmation that the password for your account " +
          user.email +
          " has just been changed.\n \n" +
          "Regards,\n" +
          "School Management"
      };
      transporter.sendMail(mailOptions, function (err) {
        res.render("home", {
          success_msg: "Success! Your password has been changed."
        });
        done(err, "done");
      });
    }
  ]);
});

module.exports = router;
