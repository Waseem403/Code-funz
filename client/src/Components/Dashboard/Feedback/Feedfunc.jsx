import React, { Component } from "react";
import PropTypes from "prop-types";
import GetFeeds from "./GetFeeds";

class Feedfunc extends Component {
  render() {
    const { feedbacks } = this.props;
    return feedbacks.map(feedback => (
      <GetFeeds key={feedback._id} feedback={feedback} />
    ));
  }
}

Feedfunc.propTypes = {
  feedbacks: PropTypes.array.isRequired
};

export default Feedfunc;
