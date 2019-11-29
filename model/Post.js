const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profile"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  }],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },

    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    edited: {
      type: Boolean,
      required: false
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "profile"
    },
    likes: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }]
  }],
  edited: {
    type: Boolean,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  editedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);