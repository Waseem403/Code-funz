import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Footer from "../Layouts/Footer";
import Courses from "./Courses";
import Headers from "./Header";
import LearningTrack from "./LearningTrack";
import ProfileDialog from "./ProfileDialog";
import Feature from "./Feature";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
    return (
      <React.Fragment>
        <Headers />
        <Courses />
        <LearningTrack />
        <Feature />
        <ProfileDialog />
        <Footer />
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
