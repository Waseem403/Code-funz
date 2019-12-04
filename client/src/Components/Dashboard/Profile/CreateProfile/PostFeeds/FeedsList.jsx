import React from "react";
import PostLists from "./PostLists";

export default function FeedsList(props) {
  const { Feeds, profile,user } = props;

  return Feeds.map(feeds => (
    <PostLists key={feeds._id} feeds={feeds} profile={profile} user={user}/>
  ));
}
