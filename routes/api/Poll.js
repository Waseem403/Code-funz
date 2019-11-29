const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");


const Poll = require("../../model/Poll")
const Profile = require("../../model/Profile")

// Validation
const validatePollInput = require("../../validation/PollValidation")



router.get("/GetPolls", (req, res) => {
    Poll.find().populate('profile', ['handle', 'user', 'avatar']).sort({
        date: -1
    }).then(polls => {
        res.status(200).json(polls)
    })
})



router.post("/AddPoll", passport.authenticate("jwt", {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validatePollInput(req.body);

    // Check Validation
    if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    Profile.findOne({
        user: req.user.id
    }).then(profile => {
        Poll.findOne({
            user: req.user.id
        }).then(poll => {
            const NewPoll = new Poll({
                Question: req.body.Question,
                Option1: req.body.Option1,
                Option2: req.body.Option2,
                Option3: req.body.Option3,
                Option4: req.body.Option4,
                profile: profile,
                UserName: req.body.Username,
                user: req.user.id,
                PollRemainderDate: req.body.PollRemainderDate,
                IsPollEnds: false
            })
            NewPoll.save().then(polldata => res.status(200).json(polldata))
        })
    })
})

router.post("/Public_Opinion/:Poll_Handler/:Option_Handler", passport.authenticate("jwt", {
    session: false
}), (req, res) => {


    Poll.find().populate('profile', ['avatar', 'handle']).sort({
        date: -1
    }).then(Polls => {
        Polls.map(poll => {
            if (poll._id.toString() === req.params.Poll_Handler) {
                const Selected_Option = req.params.Option_Handler
                //option matching for Option1PollInfo conditions.
                if ('Option1PollInfo' === Selected_Option) {
                    if (poll.Option1PollInfo.filter(option => option.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            alreadyVoted: "User already voted this post"
                        });
                    }

                    // Get remove index
                    const removeIndex2 = poll.Option2PollInfo.map(item => item.user.toString()).indexOf(req.user.id);
                    if (removeIndex2 !== -1) {
                        poll.Option2PollInfo.splice(removeIndex2, 1);
                    }
                    // Get remove index
                    const removeIndex3 = poll.Option3PollInfo.map(item => item.user.toString()).indexOf(req.user.id);
                    if (removeIndex3 !== -1) {
                        poll.Option3PollInfo.splice(removeIndex3, 1);
                    }
                    // Get remove index
                    const removeIndex4 = poll.Option4PollInfo.map(item => item.user.toString()).indexOf(req.user.id);
                    if (removeIndex4 !== -1) {
                        poll.Option4PollInfo.splice(removeIndex4, 1);
                    }

                    //Add user id to Selected_Option array
                    poll.Option1PollInfo.unshift({
                        user: req.user.id
                    });

                }


                // option matching for Option1PollInfo conditions.
                if ('Option2PollInfo' === Selected_Option) {
                    if (poll.Option2PollInfo.filter(option => option.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            alreadyVoted: "User already voted this post"
                        });
                    }

                    const removeIndex1 = poll.Option1PollInfo.map(item => item.user.toString()).indexOf(req.user.id);

                    // Splice out of array
                    if (removeIndex1 !== -1) {
                        poll.Option1PollInfo.splice(removeIndex1, 1);
                    }

                    // Get remove index
                    const removeIndex3 = poll.Option3PollInfo.map(item => item.user.toString()).indexOf(req.user.id);
                    if (removeIndex3 !== -1) {
                        poll.Option3PollInfo.splice(removeIndex3, 1);
                    }
                    // Get remove index
                    const removeIndex4 = poll.Option4PollInfo.map(item => item.user.toString()).indexOf(req.user.id);
                    if (removeIndex4 !== -1) {
                        poll.Option4PollInfo.splice(removeIndex4, 1);
                    }


                    //Add user id to Selected_Option array
                    poll.Option2PollInfo.unshift({
                        user: req.user.id
                    });

                }



                //option matching for Option1PollInfo conditions.

                if ('Option3PollInfo' === Selected_Option) {
                    if (poll.Option3PollInfo.filter(option => option.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            alreadyVoted: "User already voted this post"
                        });
                    }

                    const removeIndex1 = poll.Option1PollInfo.map(item => item.user.toString()).indexOf(req.user.id);

                    // Splice out of array
                    if (removeIndex1 !== -1) {
                        poll.Option1PollInfo.splice(removeIndex1, 1);
                    }

                    // Get remove index
                    const removeIndex2 = poll.Option2PollInfo.map(item => item.user.toString()).indexOf(req.user.id);
                    if (removeIndex2 !== -1) {
                        poll.Option2PollInfo.splice(removeIndex2, 1);
                    }
                    // Get remove index
                    const removeIndex4 = poll.Option4PollInfo.map(item => item.user.toString()).indexOf(req.user.id);
                    if (removeIndex4 !== -1) {
                        poll.Option4PollInfo.splice(removeIndex4, 1);
                    }

                    // Add user id to Selected_Option array
                    poll.Option3PollInfo.unshift({
                        user: req.user.id
                    });
                }


                //option matching for Option1PollInfo conditions.

                if ('Option4PollInfo' === Selected_Option) {
                    if (poll.Option4PollInfo.filter(option => option.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            alreadyVoted: "User already voted this post"
                        });
                    }

                    const removeIndex1 = poll.Option1PollInfo.map(item => item.user.toString()).indexOf(req.user.id);

                    // Splice out of array
                    if (removeIndex1 !== -1) {
                        poll.Option1PollInfo.splice(removeIndex1, 1);
                    }

                    // Get remove index
                    const removeIndex2 = poll.Option2PollInfo.map(item => item.user.toString()).indexOf(req.user.id);
                    if (removeIndex2 !== -1) {
                        poll.Option2PollInfo.splice(removeIndex2, 1);
                    }
                    // Get remove index
                    const removeIndex3 = poll.Option3PollInfo.map(item => item.user.toString()).indexOf(req.user.id);
                    if (removeIndex3 !== -1) {
                        poll.Option3PollInfo.splice(removeIndex3, 1);
                    }

                    // Add user id to Selected_Option array
                    poll.Option4PollInfo.unshift({
                        user: req.user.id
                    });
                }


                poll.save().then(UpdatedData => res.status(200).json(Polls))
            }
        })
    }).catch(err => {
        res.status(200).json({
            ErrorInVoting: "no Poll with that id found"
        })
    })
})



// @route   PUT /Updatepoll/:id
// @desc    update comment to post
// @access  Private
router.put("/UpdatePoll/:Poll_Handler",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {

        Poll.find().populate('profile', ['avatar', 'handle']).sort({
            date: -1
        }).then(polls => {
            polls.map(poll => {
                if (poll._id.toString() === req.params.Poll_Handler) {
                    poll.IsPollEnds = true
                    poll.save().then(Updatedpoll => res.status(200).json(polls))
                }
            })
        }).catch(err => res.status(400).json({
            msg: "poll not found"
        }))

    }
);






// @route   DELETE api/poll/:id
// @desc    Delete post
// @access  Private
router.delete("/Delete_Poll/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Poll.findById(req.params.id).then(poll => {
        // Check for poll owner
        if (poll.user.toString() !== req.user.id) {
            return res.status(401).json({
                notauthorized: "User not authorized"
            });
        }
        // Delete
        poll.remove().then(() => res.json({
            success: true
        }))

    }).catch(err => res.status(404).json({
        pollnotfound: "No poll found"
    }))
});



module.exports = router;