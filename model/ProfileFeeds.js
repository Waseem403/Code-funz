const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Profilefeedschema = new Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: "profile"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    StatusComment: {
        type: String,
        required: true
    },
    PostImgURL: {
        type: String
    },
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    }],
    comments: [{
        profile: {
            type: Schema.Types.ObjectId,
            ref: "profile"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        ReplyFeed: {
            type: String
        },
        Username: {
            type: String
        },
        likes: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }],
        love: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
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
    }],
    love: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    }],
    feedhandler: {
        type: String
    },
    edited: {
        type: Boolean,
        required: false
    },
    hide: {
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

module.exports = ProfileFeeds = mongoose.model("ProfileFeeds", Profilefeedschema);