import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, post, AuthPostUser } = this.props;

    return comments.slice(0).reverse().map(comment => (
      <CommentItem
        key={comment._id}
        post={post}
        comment={comment}
        AuthPostUser={AuthPostUser}
      />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentFeed;
