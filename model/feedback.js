const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Feedbackschema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profile"
  },
  message: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  stars: {
    type: Number,
    required: true
  },
  edited: {
    type: Boolean,
    required: true
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

module.exports = Feedback = mongoose.model("feedback", Feedbackschema);