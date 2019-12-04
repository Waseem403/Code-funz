import React from "react";

import PostLists from "./PostLists";

export default function RecipeReviewCard(props) {
  const { Feeds, profile, feedloader } = props;

  return Feeds.map(feeds => (
    <PostLists key={feeds._id} feeds={feeds} profile={profile} feedloader={feedloader} />
  ));
}
