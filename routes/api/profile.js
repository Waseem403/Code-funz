const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const uuid = require("uuid");
// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
const validateTodosInput = require("../../validation/Todos");
const validateTodoLabelInput = require("../../validation/TodoLabel");

// Load Profile Model
const Profile = require("../../model/Profile");
// Load User Model
const User = require("../../model/users");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile Works"
  })
);

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};

    Profile.findOne({
        user: req.user.id
      })
      .populate("user")
      .populate("RequestedFriendList.user", ['name'])
      .populate("FriendsList.user", ['name'])
      .populate("Followers.user", ['name'])
      .populate("Following.user", ['name'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user")
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({
        profile: "There are no profiles"
      })
    );
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({
      handle: req.params.handle
    })
    .populate("user")
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({
      user: req.params.user_id
    })
    .populate("user")
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({
        profile: "There is no profile for this user"
      })
    );
});

// @route   POST api/profile
// @desc    Create or edit user profile
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
    } = validateProfileInput(req.body);

       console.log("testing...")
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.DOB) profileFields.DOB = req.body.DOB;
    if (req.body.work_exp) profileFields.work_exp = req.body.work_exp;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.frontendskills !== "undefined") {
      profileFields.frontendskills = req.body.frontendskills.split(",");
    }
    if (typeof req.body.bussinessskills !== "undefined") {
      profileFields.bussinessskills = req.body.bussinessskills.split(",");
    }
    if (typeof req.body.backendskills !== "undefined") {
      profileFields.backendskills = req.body.backendskills.split(",");
    }
    // Social
    profileFields.social = {};
    req.body.twitter ? profileFields.social.twitter = req.body.twitter : profileFields.social.twitter = "";
    req.body.facebook ? profileFields.social.facebook = req.body.facebook : profileFields.social.facebook = "";
    req.body.linkedin ? profileFields.social.linkedin = req.body.linkedin : profileFields.social.linkedin = "";
    req.body.youtube ? profileFields.social.youtube = req.body.youtube : profileFields.social.youtube = "";
    req.body.instagram ? profileFields.social.instagram = req.body.instagram : profileFields.social.instagram = "";
    
    const Colorsarray=['#f44336','#2196f3','#ab47bc','#e91e63',
                       '#e91e63','#304ffe','#26c6da','#66bb6a',
                        '#2196f3','#d500f9'
                      ]
    let RandomPickUp=Math.floor(Math.random() * 11);      // returns a random integer from 0 to 10

    console.log(RandomPickUp)
    profileFields.color=Colorsarray[RandomPickUp]

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate({
          user: req.user.id
        }, {
          $set: profileFields
        }, {
          new: true
        }).then(profile => res.json(profile));
      } else {
        // Check if handle exists
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            return res.status(400).json(errors);
          }
          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/Uploadimg
// @desc    Add dp to profile
// @access  Private

router.post(
  "/profilepic",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      User.findOne({
        _id: req.user.id
      }).then(user => {
        user.useravatar = req.body.avatarURL
        user.save()
      })

      profile.avatar = req.body.avatarURL;
      profile.save().then(profile => res.status(200).json(profile));
    }).catch(err => {
      res.status(400).json({
        err_msg: "error in uploading profile picture."
      })
    })
  }
);

// @route   POST api/profile/profilepic
// @desc    Add background-image to profile
// @access  Private
router.post(
  "/BgImage",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      profile.BgImage = req.body.BgImage;
      profile.save().then(profile => res.status(200).json(profile));
    }).catch(err => {
      res.status(400).json({
        err_msg: "error in uploading background picture."
      })
    })
  }
);


// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to edu array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   GET api/profile/geteducationallist
// @desc    Add geteducationallist
// @access  Private

router.get("/geteducationallist/:handle", passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      profile.education.map(edu_list => {
        if (edu_list._id.toString() === req.params.handle) {
          res.status(200).json(edu_list)
        }
      })
    }).catch(err => res.status(400).json({
      educational_msg: "no educational found with the details"
    }))
  })

// @route   Update api/profile/UpdatedEducation
// @desc    Update UpdatedEducation
// @access  Private

router.put("/UpdatedEducation", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validateEducationInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  Profile.findOne({
    user: req.user.id
  }).populate("user").then(profile => {
    profile.education.map(edu_list => {
      if (edu_list._id.toString() === req.body.handler) {
        edu_list.school = req.body.school;
        edu_list.degree = req.body.degree;
        edu_list.fieldofstudy = req.body.fieldofstudy;
        edu_list.from = req.body.from;
        edu_list.to = req.body.to;
        edu_list.description = req.body.description;
        edu_list.current = req.body.current
      }
    })
    profile.save().then(profile => res.json(profile));
  }).catch(err => {
    res.status(400).json({
      err_msg: "error in updating educational details."
    })
  })
})

// @route   Delete api/profile/DeleteEducationallist
// @desc    Delte UpdatedEducation
// @access  Private

router.delete(
  "/DeleteEducationallist/:handler",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(
          req.params.handler
        );
        // Splice out of array
        profile.education.splice(removeIndex, 1);
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






// @route   GET api/profile/getexperiencelist
// @desc    Add getexperiencelist
// @access  Private

router.get("/getexperiencelist/:handle", passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      profile.experience.map(edu_list => {
        if (edu_list._id.toString() === req.params.handle) {
          res.status(200).json(edu_list)
        }
      })
    }).catch(err => res.status(400).json({
      experience_msg: "no experience found with the details"
    }))
  })



// @route   Update api/profile/UpdatedExperience
// @desc    Update UpdatedExperience
// @access  Private

router.put("/UpdatedExperience", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validateExperienceInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  Profile.findOne({
    user: req.user.id
  }).populate("user").then(profile => {
    profile.experience.map(exp_list => {
      if (exp_list._id.toString() === req.body.handler) {
        exp_list.company = req.body.company;
        exp_list.title = req.body.title;
        exp_list.location = req.body.location;
        exp_list.from = req.body.from;
        exp_list.to = req.body.to;
        exp_list.description = req.body.description;
        exp_list.current = req.body.current
      }
    })
    profile.save().then(profile => res.json(profile));
  }).catch(err => {
    res.status(400).json({
      err_msg: "error in updating educational details."
    })
  })
})


// @route   Delete api/profile/DeleteEducationallist
// @desc    Delte UpdatedEducation
// @access  Private

router.delete(
  "/DeleteExperiencelist/:handler",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(
          req.params.handler
        );
        // Splice out of array
        profile.experience.splice(removeIndex, 1);
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






// @route   POST api/profile/todolist
// @desc    Add todo's list
// @access  Private

router.post(
  "/Todos",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateTodosInput(req.body);
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      const Todos = {
        Priority: req.body.Priority,
        TodoTitle: req.body.TodoTitle,
        TodoDesc: req.body.TodoDesc,
        TodoDays: req.body.TodoDays,
        TodoTime: req.body.TodoTime,
        TodoStatus: req.body.TodoStatus,
        TodoPing: req.body.TodoPing,
        Remainder: new Date()
      };

      // Add to Todos array
      profile.Todolist.unshift(Todos);

      profile.save().then(profile => res.json(profile));
    })
  }
);

// @route   DELETE api/profile/Todos/:exp_id
// @desc    Delete todos from profile
// @access  Private
router.delete(
  "/Todos::id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.Todolist.map(item => item.id).indexOf(
          req.params.id
        );
        // Splice out of array
        profile.Todolist.splice(removeIndex, 1);
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

// @route   POST api/profile/Todoedit/:id
// @desc    Edit todos from profile
// @access  Private
router.post(
  "/Todoedit",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateTodosInput(req.body);
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        profile.Todolist.map(todos => {
          if (todos._id.toString() === req.body.TodoId) {
            (todos.TodoTitle = req.body.TodoTitle),
            (todos.TodoDesc = req.body.TodoDesc);
          }
        });
        profile.save().then(profile => res.status(200).json(profile));
      })
      .catch(err =>
        res.status(404).json({
          err: err
        })
      );
  }
);

router.post(
  "/TodoPings::id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      profile.Todolist.map((items, index) => {
        if (items._id == req.params.id) {
          items.TodoPing = !items.TodoPing;
        }
      });
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/Remainder
// @desc    Set a remainder to list
// @access  Private

router.post(
  "/Remainder",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      profile.Todolist.map((items, index) => {
        if (items._id == req.body.id) {
          items.RemainderDate = req.body.RemDate;
        }
      });
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/todolist/TodosStatus
// @desc    change the status to todo's list complete
// @access  Private

router.post(
  "/TodosStatus",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      profile.Todolist.map((items, index) => {
        if (items._id == req.body.id) {
          items.TodoStatus = req.body.TodoStatus;
          items.color = "#66bb6a",
            items.RemainderDate = undefined
        }
      });
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/todolist/Addlabel
// @desc    Add todo's list
// @access  Private
router.post(
  "/Addlabel",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    // if (req.body.LabelName == null || req.body.LabelName == "") {
    //   // Return any errors with 400 status
    //   return res.status(400).json({ label_err: " required" });
    //   console.log("this msg not to sjwo wjrm tighy enter");
    // }
    const {
      errors,
      isValid
    } = validateTodoLabelInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    try {
      Profile.findOne({
        user: req.user.id
      }).then(profile => {
        profile.Todolist.map((items, index) => {
          if (items._id == req.body.id) {
            const newLabel = {
              label: req.body.LabelName,
              isVisible: true
            };
            items.TodoLabels.unshift(newLabel);
          }
        });
        profile.save().then(profile => res.json(profile));
      });
    } catch (err) {
      err => res.status(404).json(err);
    }
  }
);

// @route   POST api/profile/todolist/Deletelabel
// @desc    Add todo's list
// @access  Private

router.post(
  "/DeleteLabels",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      profile.Todolist.map(todos => {
        if (todos._id == req.body.TodoId) {
          // const removeIndex = todos.TodoLabels.map(item => item.id).indexOf(
          //   req.body.labelid
          // );
          const removeIndex = todos.TodoLabels.map(label => label.id).indexOf(
            req.body.labelid
          );
          // Splice out of array
          todos.TodoLabels.splice(removeIndex, 1);
          // Save
        }
      });
      profile.save().then(profile => res.status(200).json(profile));
    });
  }
);

// @route   POST api/profile/todolist/Deletelabel
// @desc    Add todo's list
// @access  Private

router.post(
  "/ToggleLabels",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      profile.Todolist.map((todos, index) => {
        if (todos._id == req.body.Todoid) {
          todos.TodoLabels.map((labels, index) => {
            if (labels._id == req.body.Labelid) {
              labels.isVisible = !labels.isVisible;
            }
          });
        }
      });
      profile.save().then(profile => res.status(200).json(profile));
    });
  }
);

// @route   POST api/profile/todolist/addcolor
// @desc    Add todo's list
// @access  Private
router.post(
  "/addcolor",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    try {

      Profile.findOne({
        user: req.user.id
      }).then(profile => {
        profile.Todolist.map((items, index) => {
          if (items._id == req.body.id) {
            items.color = req.body.color;
          }
        });
        profile.save().then(profile => res.json(profile));
      });
    } catch (err) {
      err => res.status(404).json(err);
    }
  }
);

router.post(
  "/Todoclone::id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      let count = 0;
      profile.Todolist.map((items, index) => {
        if (items._id == req.params.id) {
          count++;
          if (count == 1) {
            var copiedObjectWithId = JSON.parse(JSON.stringify(items));
            copiedObjectWithId._id = mongoose.Types.ObjectId();
            profile.Todolist.unshift(copiedObjectWithId);
          }
        }
      });

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOneAndRemove({
      user: req.user.id
    }).then(() => {
      User.findOneAndRemove({
        _id: req.user.id
      }).then(() =>
        res.json({
          success: true
        })
      );
    });
  }
);

module.exports = router;