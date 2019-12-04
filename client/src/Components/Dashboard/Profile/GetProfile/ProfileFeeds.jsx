import React, { Component } from "react";


class ProfileFeeds extends Component {
  state = {};



  render() {
    const { profile } = this.props;
    return (
      <React.Fragment>
        {profile.user.name}
      </React.Fragment>
    );
  }
}

export default ProfileFeeds;
