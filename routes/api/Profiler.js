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


// @route   GET /profilevisiters/handler
// @desc    handler profile feeds route
// @access  private

router.get("/ProfileHandler/:handler", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    ProfileFeeds.find({
            feedhandler: req.params.handler
        }).populate("profile", ['avatar', 'handle'])
        .populate("comments.profile", ['avatar', 'handle']).sort({
            date: -1
        }).then(feeds => res.status(200).json(feeds))
})








// @route   POST /profilevisiters/OtherUserReactlove
// @desc   other user can react love to the profile post of user
// @access  Private
router.post(
    "/OtherUserReactlove/:lovehandler",
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



// @route   POST /profilevisiters/OtherUserUnReactlove
// @desc  other user can react un love to the profile post of user
// @access  Private
router.post(
    "/OtherUserUnReactlove/:Unlovehandler",
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



// @route   POST /profilevisiters/OtherUserReactlike
// @desc   other user can react like to the profile post of user
// @access  Private
router.post(
    "/OtherUserReactlike/:Likehandler",
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

// @route   POST /profilevisiters/OtherUserReactDislike
// @desc   other user can react dislike to the profile post of user
// @access  Private
router.post(
    "/OtherUserReactDislike/:Dislikehandler",
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



// @route   POST profilevisiters/OtherUserProfilePostReplies
// @desc    add other user comment/reply to the profile
// @access  Private
router.post(
    "/OtherUserProfilePostReplies/:feedhandler",
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





// @route   POST /profilevisiters/OtherUserReactloveToFeedReply/:Lovehandler
// @desc   other user can react love to the profile post of user
// @access  Private
router.post(
    "/OtherUserReactloveToFeedReply/:Lovehandler",
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



// @route   POST /profilevisiters/OtherUserReactloveToFeedReply/:Lovehandler
// @desc   other user can react love to the profile post of user
// @access  Private
router.post(
    "/OtherUserReactUnloveToFeedReply/:UnLovehandler",
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
                    if (feed._id.toString() === req.params.UnLovehandler) {
                        feed.comments.map(comment => {
                            if (comment._id.toString() === req.body.Reply_id) {
                                if (comment.love.filter(love => love.user.toString() === req.user.id).length === 0) {
                                    return res.status(400).json({
                                        notloved: "You have not yet liked this comment"
                                    });
                                }

                                // Get remove index
                                const removeIndex = comment.love.map(item => item.user.toString()).indexOf(req.user.id);
                                // Splice out of array
                                comment.love.splice(removeIndex, 1);
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


// @route   POST /profilevisiters/OtherUserReactlikeToFeedReply/:likehandler
// @desc   other user can react like to the profile post of user
// @access  Private
router.post(
    "/OtherUserReactlikeToFeedReply/:likehandler",
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
                    if (feed._id.toString() === req.params.likehandler) {
                        feed.comments.map(comment => {
                            if (comment._id.toString() === req.body.Reply_id) {
                                if (
                                    comment.likes.filter(like => like.user.toString() === req.user.id)
                                    .length > 0
                                ) {
                                    return res
                                        .status(400)
                                        .json({
                                            alreadyliked: "User already liked this post"
                                        });
                                }
                                // Add user id to likes array
                                comment.likes.unshift({
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



// @route   POST /profilevisiters/OtherUserReactDislikeToFeedReply/:Dislikehandler
// @desc   other user can react love to the profile post of user
// @access  Private
router.post(
    "/OtherUserReactDislikeToFeedReply/:Dislikehandler",
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
                    if (feed._id.toString() === req.params.Dislikehandler) {

                        feed.comments.map(comment => {
                            if (comment._id.toString() === req.body.Reply_id) {

                                if (comment.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                                    return res.status(400).json({
                                        notliked: "You have not yet liked this comment"
                                    });
                                }

                                // Get remove index
                                const removeIndex = comment.likes.map(item => item.user.toString()).indexOf(req.user.id);
                                // Splice out of array
                                comment.likes.splice(removeIndex, 1);
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