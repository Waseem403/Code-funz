const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const uuid = require("uuid");


// //adding pushers
// const Pusher = require('pusher');

// var channels_client = new Pusher({
//     appId: '886901',
//     key: '266cfc373d0a8bab3be6',
//     secret: 'fdacf3598f9fe6272a1f',
//     cluster: 'ap2',
//     encrypted: true
// });


// Load Profile Model
const Profile = require("../../model/Profile");
// Load User Model
const User = require("../../model/users");


// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.post("/test", (req, res) => {

    Profile.find().then(profiles => {
        channels_client.trigger('my-channel', 'my-event', {
            msg: "testomg"
        });
        res.json({
            msg: "testomg"
        })
    })

});

// @route   GET Friends/RequestSent
// @desc    Sent friend request to other users.
// @access  Private

router.post("/RequestSent/:Profile_Handler", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Profile
        .findOne({
            user: req.user.id
        }).then(profile => {
            const RequestedData = {
                user: req.user.id,
                avatarURL: profile.avatar,
                handler: profile.handle,
                company: profile.company,
                status: profile.status,
                location: profile.location,
                requestedStatus: 'sender'
            }

            Profile.find().populate('user').then(Updateprofiles => {
                Updateprofiles.map(Updateprofile => {
                    if (Updateprofile._id.toString() === req.params.Profile_Handler) {
                        const AccepterData = {
                            user: Updateprofile.user.id,
                            avatarURL: Updateprofile.avatar,
                            handler: Updateprofile.handle,
                            company: Updateprofile.company,
                            status: Updateprofile.status,
                            location: profile.location,
                            requestedStatus: 'accepter'
                        }
                        if (Updateprofile.RequestedFriendList.filter(requested => requested.user.toString() === req.user.id).length > 0) {
                            return res.status(400).json({
                                alreadysent: "you have already sent friend request"
                            });
                        }
                        profile.RequestedFriendList.unshift(AccepterData)
                        profile.save()
                        // Add user id to RequestedFriendList array
                        Updateprofile.RequestedFriendList.unshift(RequestedData);
                        Updateprofile.save().then(data => {
                            res.status(200).json(Updateprofiles)
                        })
                    }
                })
            })
        }).catch(err => {
            res.status(200).json({
                err: "error in rejecting request"
            })
        })
})



// @route   GET /AcceptedRequest/:Accepting_handler
// @desc    Tests profile feeds route
// @access  private
router.post("/AcceptedRequest/:Accepting_Handler", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Profile.findOne({
        user: req.user.id
    }).populate("RequestedFriendList.user", ['name']).then(profile => {
        profile.RequestedFriendList.map(RequestedList => {
            if (RequestedList._id.toString() === req.params.Accepting_Handler) {
                let Current_UserData = {
                    user: req.user.id,
                    avatarURL: profile.avatar,
                    handler: profile.handle,
                    company: profile.company,
                    status: profile.status,
                    location: profile.location
                }
                //adding the user object into the friendslist
                if (profile.FriendsList.filter(requested => requested._id.toString() === req.params.Accepting_Handler).length > 0) {
                    return res.status(400).json({
                        alreadysent: "that friend is already exists"
                    });
                }
                // Add user id to RequestedFriendList array
                const AcceptedFriend = JSON.parse(JSON.stringify(RequestedList));
                profile.FriendsList.unshift(AcceptedFriend);

                if (profile.RequestedFriendList.filter(pendingreq => pendingreq._id.toString() === req.params.Accepting_Handler).length === 0) {
                    return res.status(400).json({
                        notexists: "no request is pending on auth end"
                    });
                }

                // Get remove index
                const removeIndex = profile.RequestedFriendList.map(item => item._id.toString()).indexOf(req.params.Accepting_Handler);

                // Splice out of array
                profile.RequestedFriendList.splice(removeIndex, 1);

                Profile.findOne({
                    user: AcceptedFriend.user._id
                }).then(RequestedProfile => {
                    if (RequestedProfile.FriendsList.filter(requested => requested.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            alreadysent: "you have already a friend"
                        });
                    }
                    RequestedProfile.FriendsList.unshift(Current_UserData);
                    if (RequestedProfile.RequestedFriendList.filter(pendingreq => pendingreq.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({
                            notliked: "no request is pending on request list"
                        });
                    }
                    // Get remove index
                    const removeIndex = RequestedProfile.RequestedFriendList.map(item => item.user.toString()).indexOf(req.user.id);

                    // Splice out of array
                    RequestedProfile.RequestedFriendList.splice(removeIndex, 1);

                    RequestedProfile.save()
                })

            }
        })
        //saving the profile here..
        profile.save().then(updatedprofile => res.status(200).json(updatedprofile))
    }).catch(err => {
        res.status.json({
            ErrorMessage: "error in accepting request."
        })
    })

})


router.post("/RejectRequest/:Reject_Handler", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Profile.findOne({
        user: req.user.id
    }).populate("RequestedFriendList.user", ['name']).then(profile => {
        profile.RequestedFriendList.map(requestedlist => {
            if (requestedlist._id.toString() === req.params.Reject_Handler) {
                if (profile.RequestedFriendList.filter(friend => friend._id.toString() === req.params.Reject_Handler).length === 0) {
                    return res.status(400).json({
                        notliked: "You have dont have friend to reject"
                    });
                }
                // Get remove index
                const removeIndex = profile.RequestedFriendList.map(item => item._id.toString()).indexOf(req.params.Reject_Handler);
                // Splice out of array
                profile.RequestedFriendList.splice(removeIndex, 1);

                Profile.findOne({
                        user: requestedlist.user._id
                    })
                    .populate("RequestedFriendList.user", ['name']).then(reqprofile => {
                        if (reqprofile.RequestedFriendList.filter(friend => friend.user._id.toString() === req.user.id).length === 0) {
                            return res.status(400).json({
                                notliked: "You have dont have friend to reject"
                            });
                        }
                        // Get remove index
                        const removeIndex = reqprofile.RequestedFriendList.map(item => item.user._id.toString()).indexOf(req.user.id);
                        // Splice out of array
                        reqprofile.RequestedFriendList.splice(removeIndex, 1);
                        reqprofile.save()
                    })
            }
        })

        profile.save().then(Updateprofile => res.status(200).json(Updateprofile))
    }).catch(err => {
        res.status(200).json({
            rejected_msg: "there is an error while rejecting request."
        })
    })
})


router.post("/AcceptRequestInfo/:Accepting_handler", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    console.log(req.params.Accepting_handler)
    Profile.find().populate('user').then(profiles => {
        profiles.map(profile => {
            if (profile.user._id.toString() === req.user.id) {
                profile.RequestedFriendList.map(reqlist => {
                    if (reqlist.user.toString() === req.params.Accepting_handler) {

                        //adding the user object into the friendslist
                        if (profile.FriendsList.filter(requested => requested.user.toString() === req.params.Accepting_handler).length > 0) {
                            return res.status(400).json({
                                alreadysent: "that friend is already exists"
                            });
                        }
                        // Add user id to RequestedFriendList array
                        const AcceptedFriend = JSON.parse(JSON.stringify(reqlist));
                        profile.FriendsList.unshift(AcceptedFriend);

                        if (profile.RequestedFriendList.filter(pendingreq => pendingreq.user.toString() === req.params.Accepting_handler).length === 0) {
                            return res.status(400).json({
                                notexists: "no request is pending on auth end"
                            });
                        }
                        // Get remove index
                        const removeIndex = profile.RequestedFriendList.map(item => item._id.toString()).indexOf(req.params.Accepting_Handler);
                        // Splice out of array
                        profile.RequestedFriendList.splice(removeIndex, 1);
                    } else if (profile.user._id.toString() === req.params.Accepting_handler) {

                    }
                })
            }
        })
    })
})









module.exports = router;