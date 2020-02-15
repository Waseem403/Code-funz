const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const uuid = require("uuid");
parseString = require("xml2js").parseString;
const xml2js = require('xml2js');
const fs = require("fs")
const path = require("path");

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
router.post("/FollowPeople/:Follow_Handler", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        }).then(profile => {
            const follower = {
                user: req.user.id,
                avatarURL: profile.avatar,
                handler: profile.handle,
                company: profile.company,
                status: profile.status,
                location: profile.location
            }
            Profile.find().populate('user').then(profiles => {
                profiles.map(followerprofile => {
                    if (followerprofile.user._id.toString() === req.params.Follow_Handler) {
                        //starting follower functionality
                        if (followerprofile.Followers.filter(follower => follower.user._id.toString() === req.user.id).length > 0) {
                            return res.status(400).json({
                                alreadysent: "you have already following this person"
                            });
                        }
                        followerprofile.Followers.unshift(follower)
                        //completed of follower functionality.
                        //starting of following functionality
                        const following = {
                            user: followerprofile.user._id,
                            avatarURL: followerprofile.avatar,
                            handler: followerprofile.handle,
                            company: followerprofile.company,
                            status: followerprofile.status,
                            location: followerprofile.location
                        }

                        if (profile.Following.filter(following => following.user.toString() === req.params.Follow_Handler).length > 0) {
                            return res.status(400).json({
                                alreadysent: "you have already following this person"
                            });
                        }
                        profile.Following.unshift(following)
                        profile.save()
                        followerprofile.save().then(savedprofiles => {
                            res.status(200).json(profiles)
                        })

                    }
                })
            })

        })
        .catch(err => {
            res.status.json({
                ErrorMessage: "error in accepting request."
            })
        })
})



// @route   GET /AcceptedRequest/:Accepting_handler
// @desc    Tests profile feeds route
// @access  private
router.post("/UnFollowPeople/:unFollow_Handler", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Profile.find().populate('user').then(profiles => {
        profiles.map(profile => {
            if (profile.user._id.toString() === req.user.id) {
                if (profile.Following.filter(following => following.user._id.toString() === req.params.unFollow_Handler).length === 0) {
                    return res.status(400).json({
                        notexists: "no user with that name is exists"
                    });
                }
                // Get remove index
                const removeIndex = profile.Following.map(item => item.user._id.toString()).indexOf(req.params.unFollow_Handler);
                // Splice out of array
                profile.Following.splice(removeIndex, 1);
                profile.save()
            } else if (profile.user._id.toString() === req.params.unFollow_Handler) {
                if (profile.Followers.filter(follower => follower.user._id.toString() === req.user.id).length === 0) {
                    return res.status(400).json({
                        notexists: "no user with that name is exists"
                    });
                }
                // Get remove index
                const removeIndex = profile.Followers.map(item => item.user._id.toString()).indexOf(req.user.id);
                // Splice out of array
                profile.Followers.splice(removeIndex, 1);
                profile.save().then(updateprofile => {
                    res.status(200).json(profiles)
                })
            }
        })


    })

})


router.get('/searchpeople', (req, res) => {
    // fs.readFile(path.resolve(__dirname, 'edited-test.xml'), "utf-8", function (err, data) {
    //     if (err) console.log(err);
    //     // we log out the readFile results
    //     // we then pass the data to our method here
    //     parseString(data, function (err, result) {
    //         if (err) console.log(err);
    //         // here we log the results of our xml string conversion
    //         // var json = JSON.parse(result.bookstore.book)
    //         let json = result
    //         json = JSON.parse(JSON.stringify(json).split('p').join('alt'));
    //         // create a new builder object and then convert
    //         // our json back to xml.
    //         var builder = new xml2js.Builder();
    //         var xml = builder.buildObject(json);

    //         fs.writeFile("edited-test.xml", xml, function (err, data) {
    //             if (err) console.log(err);
    //         });
    //         res.send('updated the xml...')
    //     });
    // });

    client.messages
        .create({
            body: 'hello world this is a text',
            from: '+19282242298',
            to: '+919966599303'
        })
        .then(message => console.log(message.sid));
    res.send("hi")
})


module.exports = router;