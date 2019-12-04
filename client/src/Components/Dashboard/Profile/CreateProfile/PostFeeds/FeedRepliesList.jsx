import React from "react";
import PostReplies from "./PostReplies"


export default function FeedRepliesList(props) {
    const { Replies, Post_Id, CurrentTargetProfile, PostFeedAuthUser } = props;
    return Replies.slice(0).reverse().map(Reply => (
        <PostReplies key={Reply._id} FeedReply={Reply} Post_Id={Post_Id} CurrentTargetProfile={CurrentTargetProfile} PostFeedAuthUser={PostFeedAuthUser} />
    ));
}
