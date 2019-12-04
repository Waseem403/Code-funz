import React from "react";
import PostReplies from "./PostReplies"


export default function FeedRepliesList(props) {
    const { Replies, user, Post_Id, CurrentTargetProfile, PostFeedAuthUser } = props;
    return Replies.slice(0).reverse().map(Reply => (
        <PostReplies key={Reply._id} FeedReply={Reply} user={user} Post_Id={Post_Id} PostFeedAuthUser={PostFeedAuthUser} CurrentTargetProfile={CurrentTargetProfile} />
    ));
}
