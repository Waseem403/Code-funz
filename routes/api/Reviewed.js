const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("../../config/keys");

const validateFeedbackInput = require("../../validation/feedback");
const validateEditFeedbackInput = require("../../validation/EditFeedback")


const Feedback = require("../../model/feedback");
const User = require("../../model/users");
const Profile = require("../../model/Profile");




// @route   GET feedback/rateus
// @desc    Get All Feedbacks
// @access  Public
router.get("/getfeeds", (req, res) => {
  Feedback.find()
    .populate("profile", ["handle", "avatar", "company", "status", "location"])
    .sort({
      date: -1
    })
    .then(items => res.json(items));
});

// @route   GET feedback/rateus
// @desc    Add a feedback
// @access  Public

router.post(
  "/rateus",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateFeedbackInput(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        Feedback.findOne({
          name: req.body.name
        }).then(feeds => {
          if (feeds) {
            errors.message = "You have already given feedback";
            return res.status(400).json(errors);
          } else {
            if (req.body.stars == 0) {
              errors.stars0 = "Please select atleast one star";
              return res.status(400).json(errors);
            }
            const newFeedback = new Feedback({
              message: req.body.message,
              stars: req.body.stars,
              name: req.body.name,
              user: req.user.id,
              profile: profile,
              edited: false
            });

            newFeedback.save().then(Feedback => res.status(200).json(Feedback));
          }
        });
      })
      .catch(err => {
        res.status(400).json({
          err_msg: "Profile not found"
        });
      });
  }
);

// @route   DELETE feedback/rate:id
// @desc    Delete post
// @access  Private

router.put("/UpdateFeed/:handler", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validateEditFeedbackInput(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  Feedback
    .find()
    .populate('profile', ["handle", "avatar", "company", "status", "location"])
    .sort({
      date: -1
    })
    .then(feeds => {
      feeds.map(feed => {
        if (feed.user.toString() === req.params.handler) {
          const CDate = new Date()
          feed.stars = req.body.Stars,
            feed.message = req.body.Edit_Message,
            feed.editedDate = CDate
          feed.edited = true
          feed.save().then(editedfeed => {
            res.status(200).json(feeds)
          })
        }
      })
    })
})

// @route   DELETE feedback/rate:id
// @desc    Delete post
// @access  Private
router.delete("/rate::id", (req, res) => {
  Feedback.findOne({
      user: req.params.id
    })
    .then(user => {
      if (req.params.id !== user.user) {
        user.remove().then(() => res.json({
          success: true
        }));
      } else {
        return res.status(401).json({
          notauthorized: "User not authorized"
        });
      }
    })
    .catch(err => res.status(404).json({
      postnotfound: "No post found"
    }));
});

module.exports = router;