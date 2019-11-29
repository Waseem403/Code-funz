const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Post = require("../../model/Post");
// Profile model
const Profile = require("../../model/Profile");

// Validation
const validatePostInput = require("../../validation/post");
const validateRepliesInput = require("../../validation/PostReplies")
const validateEditPostInput = require("../../validation/PostEdits")
const validateEditRepliesInput = require("../../validation/PostEditReply")
// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Posts Works"
  })
);

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .populate("profile", ['avatar', 'handle'])
    .populate("comments.profile", ['avatar', 'handle'])
    .sort({
      date: -1
    })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({
        nopostsfound: "No posts found"
      })
    );
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate("profile", 'avatar')
    .populate("comments.profile", ['avatar', 'handle'])
    .sort({
      date: -1
    })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err =>
      res.status(404).json({
        nopostsfound: "No posts found"
      })
    );
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findOne({
      user: req.user.id
    }).then(post => {
      Profile.findOne({
        user: req.user.id
      }).then(profile => {
        const newPost = new Post({
          text: req.body.text,
          name: req.body.name,
          user: req.user.id,
          profile: profile,
          edited: false
        });
        newPost.save().then(post => res.json(post));
      });
    });
  }
);

// @route   PUT api/posts/:id
// @desc    update post
// @access  Private
router.put(
  "/UpdatePost",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateEditPostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.find().populate('profile', ['avatar', 'handle']).sort({
      date: -1
    }).then(posts => {
      posts.map(post => {
        if (post._id.toString() === req.body.id) {
          const CDate = new Date()
          post.text = req.body.Edit_Message
          post.edited = true
          post.editedDate = CDate
          post.save().then(editpost => {
            res.status(200).json(posts)
          })
        }
      })
    })
  })

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.find().populate('profile', ['avatar', 'handle']).sort({
          date: -1
        }).then(posts => {
          posts.map(post => {
            if (post._id.toString() === req.params.id) {
              if (
                post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
              ) {
                return res
                  .status(400)
                  .json({
                    alreadyliked: "User already liked this post"
                  });
              }
              // Add user id to likes array
              post.likes.unshift({
                user: req.user.id
              });
              post.save().then(data => {
                res.json(posts)
              })
            }
          })
        })

        .catch(err => res.status(404).json({
          postnotfound: "No post found"
        }));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
        user: req.user.id
      }).then(profile => {
        Post.find().populate('profile', ['avatar', 'handle']).sort({
          date: -1
        }).then(posts => {
          posts.map(post => {
            if (post._id.toString() === req.params.id) {
              if (
                post.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0
              ) {
                return res.status(400).json({
                  notliked: "You have not yet liked this post"
                });
              }

              // Get remove index
              const removeIndex = post.likes
                .map(item => item.user.toString())
                .indexOf(req.user.id);

              // Splice out of array
              post.likes.splice(removeIndex, 1);
              post.save().then(data => {
                res.status(200).json(posts)
              })
            }
          })
        })

      })
      .catch(err =>
        res.status(404).json({
          postnotfound: "No post found"
        })
      );
  });

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              notauthorized: "User not authorized"
            });
          }

          // Delete
          post.remove().then(() =>
            res.json({
              success: true
            })
          );
        })
        .catch(err =>
          res.status(404).json({
            postnotfound: "No post found"
          })
        );
    });
  }
);




// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateRepliesInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .populate("profile", ['avatar', 'handle'])
      .populate("comments.profile", ['avatar', 'handle'])
      .then(post => {
        Profile.findOne({
          user: req.user.id
        }).then(profile => {
          const newComment = {
            text: req.body.text,
            name: req.body.name,
            user: req.user.id,
            profile: profile,
            edited: false
          };
          // Add to comments array
          post.comments.unshift(newComment);

          // Save
          post.save().then(post => res.json(post));
        });
      })
      .catch(err =>
        res.status(404).json({
          postnotfound: "No post found"
        })
      );
  }
);




// @route   PUT api/posts/comment/:id
// @desc    update comment to post
// @access  Private
router.put(
  "/EditReply/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {

    const {
      errors,
      isValid
    } = validateEditRepliesInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .populate("profile", ['avatar', 'handle'])
      .populate("comments.profile", ['avatar', 'handle']).then(post => {
        post.comments.map(posts => {
          if (posts._id.toString() === req.body.id) {
            const CDate = new Date()
            posts.text = req.body.Edit_Reply,
              posts.edited = true,
              posts.date = CDate
          }
        })
        post.save().then(editedpost => {
          res.status(200).json(editedpost)
        })
      })

  }
);


// @route   POST api/posts/replies/like/:id
// @desc    Like post
// @access  Private
router.post(
  "/replies/like",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.body.PostId)
        .populate("profile")
        .populate("comments.profile", ['avatar', 'handle'])
        .then(post => {
          post.comments.map(comment => {
            if (comment._id.toString() === req.body.ReplyId) {
              if (
                comment.likes.filter(
                  like => like.user.toString() === req.user.id
                ).length > 0
              ) {
                return res.status(400).json({
                  alreadyliked: "User already liked this post"
                });
              }
              // Add user id to likes array
              comment.likes.unshift({
                user: req.user.id
              });
            }
          });
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({
            postnotfound: "No post found"
          })
        );
    });
  }
);

// @route   POST api/posts/replies/unlike/:id
// @desc    Like post
// @access  Private
router.post(
  "/replies/unlike",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.body.PostId)
        .populate("profile")
        .populate("comments.profile", ['avatar', 'handle'])
        .then(post => {
          post.comments.map(comment => {
            if (comment._id.toString() === req.body.ReplyId) {
              if (
                comment.likes.filter(
                  like => like.user.toString() === req.user.id
                ).length === 0
              ) {
                return res.status(400).json({
                  notliked: "You have not yet liked this comment"
                });
              }

              // Get remove index
              const removeIndex = comment.likes
                .map(item => item.user.toString())
                .indexOf(req.user.id);

              // Splice out of array
              comment.likes.splice(removeIndex, 1);
            }
          });

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({
            postnotfound: "No post found"
          })
        );
    });
  }
);


// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Post.findById(req.params.id)
      .populate("profile")
      .populate("comments.profile", ['avatar', 'handle'])
      .then(post => {
        // Check to see if comment exists
        if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
          return res.status(404).json({
            commentnotexists: "Comment does not exist"
          });
        }

        // Get remove index
        const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({
          postnotfound: "No post found"
        })
      );
  }
);

module.exports = router;