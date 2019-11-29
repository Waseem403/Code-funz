const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  avatar: {
    type: String
  },
  BgImage: {
    type: String
  },
  company: {
    type: String,
    required: true
  },
  work_exp: {
    type: String,
    required: true
  },
  DOB: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  frontendskills: {
    type: [String],
    required: true
  },
  bussinessskills: {
    type: [String],
    required: true
  },
  backendskills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [{
    title: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: {
      type: String
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],
  education: [{
    school: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    fieldofstudy: {
      type: String,
      required: true
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  Todolist: [{
    Priority: {
      type: String
    },
    TodoTitle: {
      type: String,
      required: true
    },
    TodoDesc: {
      type: String,
      required: true
    },
    TodoDays: {
      type: String
    },
    TodoTime: {
      type: String
    },
    TodoStatus: {
      type: Boolean,
      default: false
    },
    TodoLabels: [{
      label: {
        type: String
      },
      isVisible: {
        type: Boolean,
        default: true
      }
    }],
    TodoPing: {
      type: Boolean,
      default: false
    },
    RemainderDate: {
      type: Date,
    },

    color: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  RequestedFriendList: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    avatarURL: {
      type: String,
    },
    handler: {
      type: String,
    },
    company: {
      type: String,
    },
    status: {
      type: String,
    },
    location: {
      type: String,
    },
    requestedStatus: {
      type: String
    }
  }],
  FriendsList: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    avatarURL: {
      type: String,
    },
    handler: {
      type: String,
    },
    company: {
      type: String,
    },
    status: {
      type: String,
    },
    location: {
      type: String,
    }
  }],
  Followers: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    avatarURL: {
      type: String,
    },
    handler: {
      type: String,
    },
    company: {
      type: String,
    },
    status: {
      type: String,
    },
    location: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  Following: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    avatarURL: {
      type: String,
    },
    handler: {
      type: String,
    },
    company: {
      type: String,
    },
    status: {
      type: String,
    },
    location: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],

  TodosList: [{
    TodoText: {
      type: String,
      required: true
    },
    IsComplete: {
      type: Boolean
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);