const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../model/Profile");


router.get('/test', (req, res) => {
    res.json({
        msg: "ettt"
    })
})

router.post("/addtodos/:Todo_Handler", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Profile.findOne({
        user: req.user.id
    }).then(profile => {
        const TodosList = {
            TodoText: req.params.Todo_Handler,
            IsComplete: false
        }
        // Add to Todos array
        profile.TodosList.unshift(TodosList);

        profile.save().then(profile => res.json(profile));
    })
})



// @route   DELETE Widget/Todos/:deleteid
// @desc    Delete todos from profile
// @access  Private
router.delete("/Todosdelete/:id",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        Profile.findOne({
                user: req.user.id
            })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.TodosList.map(item => item.id).indexOf(
                    req.params.id
                );
                // Splice out of array
                profile.TodosList.splice(removeIndex, 1);
                // Save
                profile.save().then(profile => res.status(200).json(profile));
            })
            .catch(err =>
                res.status(404).json({
                    err: err
                })
            );
    }
);

// @route   DELETE Widget/Todos/:Updateid
// @desc    Update todos from profile
// @access  Private

router.put("/TodosUpdate/:Update_Handler", passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        Profile.findOne({
            user: req.user.id
        }).then(profile => {
            profile.TodosList.map(todos => {
                if (todos._id.toString() === req.params.Update_Handler) {
                    todos.IsComplete = !todos.IsComplete
                }
            })
            profile.save().then(profile => {
                res.status(200).json(profile)
            })
        }).catch(err => {
            res.status(400).json({
                msg: "error in "
            })
        })
    })

module.exports = router;