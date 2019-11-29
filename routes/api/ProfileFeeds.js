const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const uuid = require("uuid");

// Load Profile Model
const Profile = require("../../model/Profile");
// Load User Model
const User = require("../../model/users");

//load profile feeds Model
const ProfileFeeds = require("../../model/ProfileFeeds")

//calling the error validation function.
const validateProfileFeedsInput = require("../../validation/ProfileFeeds")
const validateProfileEditFeedsInput = require("../../validation/ProfileEditFeed")
// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile Works"
  })
);


// @route   GET /profilefeeds/
// @desc    Tests profile feeds route
// @access  private

router.get("/", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  ProfileFeeds.find({
      user: req.user.id
    }).populate("profile", ['avatar', 'handle'])
    .populate("comments.profile", ['avatar', 'handle']).sort({
      date: -1
    }).then(feeds => res.status(200).json(feeds))
})



// @route   POST /profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/UpdateStatus",
  passport.authenticate("jwt", {
    session: false
  }),

  (req, res) => {
    const {
      errors,
      isValid
    } = validateProfileFeedsInput(req.body);
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    ProfileFeeds.findOne({
      user: req.user.id
    }).then(feeds => {
      Profile.findOne({
        user: req.user.id
      }).then(profile => {
        const NewFeed = new ProfileFeeds({
          profile: profile,
          user: req.user.id,
          StatusComment: req.body.StatusComment,
          PostImgURL: req.body.PostImgURL == undefined ? null : req.body.PostImgURL,
          feedhandler: profile.handle,
          edited: false,
          hide: false
        })
        NewFeed.save().then(feeds => res.json(feeds));
      })
    })


  }
);


// @route   PUT api/posts/EditStatus/:EditHandler
// @desc    update post
// @access  Private
router.put(
  "/EditStatus/:EditHandler",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateProfileEditFeedsInput(req.body);
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    ProfileFeeds.find({
      profile: req.body.Target_Profile
    }).populate('profile', ['avatar', 'handle']).populate("comments.profile", ['avatar', 'handle']).sort({
      date: -1
    }).then(feeds => {
      feeds.map(feed => {
        if (feed._id.toString() === req.params.EditHandler) {
          const CDate = new Date()
          feed.StatusComment = req.body.Edit_StatusComment
          feed.edited = true
          feed.editedDate = CDate
          feed.save().then(editfeed => {
            res.status(200).json(feeds)
          })
        }
      })
    }).catch(err => res.status(400).json({
      err: "post not found"
    }))
  })










router.put(
  "/EditStatusComment/:EditHandler",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    ProfileFeeds.find({
        profile: req.body.Target_Profile
      }).populate('profile', ['avatar', 'handle']).populate("comments.profile", ['avatar', 'handle']).sort({
        date: -1
      }).then(feeds => {
        feeds.map(feed => {
          if (feed._id.toString() === req.params.EditHandler) {
            feed.comments.map(comment => {
              if (comment._id.toString() === req.body.Reply_id) {
                const CDate = new Date()
                comment.ReplyFeed = req.body.Edit_StatusReply
                comment.edited = true
                comment.editedDate = CDate
                feed.save().then(Updateddata => res.status(200).json(feeds))

              }
            })
          }

        })
      })
      .catch(err => res.status(404).json({
        postnotfound: "No post found"
      }));
  });




// @route   DELETE /profile/DeleteFeed/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/DeleteFeed/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    ProfileFeeds.findById(req.params.id)
      .then(feed => {
        // Check for post owner
        if (feed.user.toString() !== req.user.id) {
          return res.status(401).json({
            notauthorized: "User not authorized"
          });
        }

        // Delete
        feed.remove().then(() =>
          res.json({
            success: true
          })
        )
      }).catch(err =>
        res.status(404).json({
          feednotfound: "No feed found"
        })
      );
  })


// @route   DELETE /profile/DeleteFeedReply/:DeleteFeedReplyHandler
// @desc    Delete post
// @access  Private
router.post(
  "/DeleteFeedReply/:TargetPostHandler",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    ProfileFeeds.find({
      profile: req.body.CurrentTargetProfile
    }).populate('profile', ['avatar', 'handle']).populate("comments.profile", ['avatar', 'handle']).sort({
      date: -1
    }).then(Feeds => {
      Feeds.map(feed => {
        if (feed._id.toString() === req.params.TargetPostHandler) {

          if (feed.comments.filter(comment => comment._id.toString() === req.body.Reply_Id).length === 0) {
            return res.status(404).json({
              commentnotexists: "Comment does not exist"
            });
          }

          // Get remove index
          const removeIndex = feed.comments
            .map(item => item._id.toString())
            .indexOf(req.body.Reply_Id);

          // Splice comment out of array
          feed.comments.splice(removeIndex, 1);

          feed.save().then(Updatedpost => res.status(200).json(Feeds));

        }
      })
    })





  })




// @route   POST /profile/reactlove
// @desc   react love to the profile post of user
// @access  Private
router.post(
  "/Reactlove/:lovehandler",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {

    ProfileFeeds.find({
        profile: req.body.targetprofile
      }).populate('profile', ['avatar', 'handle']).populate("comments.profile", ['avatar', 'handle']).sort({
        date: -1
      }).then(feeds => {
        feeds.map(feed => {
          if (feed._id.toString() === req.params.lovehandler) {
            if (
              feed.love.filter(love => love.user.toString() === req.user.id)
              .length > 0
            ) {
              return res
                .status(400)
                .json({
                  alreadyloved: "User already liked this post"
                });
            }
            // Add user id to likes array
            feed.love.unshift({
              user: req.user.id
            });
            feed.save().then(data => {
              res.json(feeds)
            })
          }

        })
      })
      .catch(err => res.status(404).json({
        postnotfound: "No post found"
      }));
  });



// @route   POST /profile/unreactlove
// @desc   react un love to the profile post of user
// @access  Private
router.post(
  "/UnReactlove/:Unlovehandler",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    ProfileFeeds.find({
        profile: req.body.targetprofile
      }).populate('profile', ['avatar', 'handle']).populate("comments.profile", ['avatar', 'handle']).sort({
        date: -1
      }).then(feeds => {
        feeds.map(feed => {
          if (feed._id.toString() === req.params.Unlovehandler) {
            if (feed.love.filter(love => love.user.toString() === req.user.id).length === 0) {
              return res.status(400).json({
                notloved: "You have not yet liked this post"
              });
            }
            // Get remove index
            const removeIndex = feed.love.map(item => item.user.toString()).indexOf(req.user.id);

            // Splice out of array
            feed.love.splice(removeIndex, 1);

            feed.save().then(data => {
              res.status(200).json(feeds)
            })
          }
        })
      })
      .catch(err =>
        res.status(404).json({
          postnotfound: "No post found"
        }))
  })


// @route   POST /profile/reactlove
// @desc   react love to the profile post of user
// @access  Private
router.post(
  "/Reactlike/:Likehandler",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    ProfileFeeds.find({
        profile: req.body.targetprofile
      }).populate('profile', ['avatar', 'handle']).populate("comments.profile", ['avatar', 'handle']).sort({
        date: -1
      }).then(feeds => {
        feeds.map(feed => {
          if (feed._id.toString() === req.params.Likehandler) {
            if (
              feed.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
            ) {
              return res
                .status(400)
                .json({
                  alreadyliked: "User already liked this post"
                });
            }
            // Add user id to likes array
            feed.likes.unshift({
              user: req.user.id
            });
            feed.save().then(data => {
              res.json(feeds)
            })
          }

        })
      })
      .catch(err => res.status(404).json({
        postnotfound: "No post found"
      }));
  });

// @route   POST /profile/unreactlike
// @desc   react dislike to the profile post of user
// @access  Private
router.post(
  "/ReactDislike/:Dislikehandler",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    ProfileFeeds.find({
        profile: req.body.targetprofile
      }).populate('profile', ['avatar', 'handle']).populate("comments.profile", ['avatar', 'handle']).sort({
        date: -1
      }).then(feeds => {
        feeds.map(feed => {
          if (feed._id.toString() === req.params.Dislikehandler) {
            if (feed.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
              return res.status(400).json({
                notliked: "You have not yet liked this post"
              });
            }
            // Get remove index
            const removeIndex = feed.likes.map(item => item.user.toString()).indexOf(req.user.id);

            // Splice out of array
            feed.likes.splice(removeIndex, 1);

            feed.save().then(data => {
              res.status(200).json(feeds)
            })
          }
        })
      })
      .catch(err =>
        res.status(404).json({
          postnotfound: "No post found"
        }))
  })



// @route   POST api/ProfileFeeds/UpdateStatus
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/ProfilePostReplies/:feedhandler",
  passport.authenticate("jwt", {
    session: false
  }),

  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      ProfileFeeds.find({
          profile: req.body.Targetprofile
        }).populate("profile", ['avatar', 'handle'])
        .populate("comments.profile", ['avatar', 'handle']).sort({
          date: -1
        }).then(feeds => {
          feeds.map(feed => {
            if (feed._id.toString() === req.params.feedhandler) {
              const newComment = {
                user: req.user.id,
                profile: profile,
                Username: req.body.Username,
                ReplyFeed: req.body.ReplyFeed,
                edited: false
              };
              feed.comments.unshift(newComment);
              // Save
              feed.save().then(replydata => res.status(200).json(feeds))
            }
          })

        })
    })
  })






// @route   POST /ProfielFeeds/ReactloveToComment/:Lovehandler
// @desc   current active user can love react to the replies post
// @access  Private
router.post(
  "/ReactloveToComment/:Lovehandler",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    ProfileFeeds.find({
        profile: req.body.CurrentTargetProfile
      }).populate('profile', ['avatar', 'handle']).populate("comments.profile", ['avatar', 'handle']).sort({
        date: -1
      }).then(feeds => {
        feeds.map(feed => {
          if (feed._id.toString() === req.params.Lovehandler) {
            feed.comments.map(comment => {
              if (comment._id.toString() === req.body.Reply_id) {
                if (
                  comment.love.filter(love => love.user.toString() === req.user.id)
                  .length > 0
                ) {
                  return res
                    .status(400)
                    .json({
                      alreadyloved: "User already liked this post"
                    });
                }
                // Add user id to likes array
                comment.love.unshift({
                  user: req.user.id
                });
                feed.save().then(Updateddata => res.status(200).json(feeds))
              }
            })
          }
        })
      })
      .catch(err => res.status(404).json({
        postnotfound: "No post found"
      }));
  });







module.exports = router;