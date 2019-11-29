const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PoolSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: "profile"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    UserName: {
        type: String,
        required: true
    },
    Question: {
        type: String,
        required: true
    },
    Option1: {
        type: String,
        required: true
    },

    Option1PollInfo: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    }],
    Option2: {
        type: String,
        required: true
    },

    Option2PollInfo: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    }],
    Option3: {
        type: String,
        required: true
    },
    Option3PollInfo: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    }],

    Option4: {
        type: String,
        required: true
    },

    Option4PollInfo: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    }],

    date: {
        type: Date,
        default: Date.now
    },
    PollRemainderDate: {
        type: Date,
    },
    IsPollEnds: {
        type: Boolean
    }
})

module.exports = Poll = mongoose.model("poll", PoolSchema);