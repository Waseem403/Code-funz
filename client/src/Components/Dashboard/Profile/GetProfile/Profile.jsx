import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfileByHandle, getCurrentProfile } from "../../../../actions/profileActions";
import { getProfileFeedsByHandle } from "../../../../actions/profilevisitoraction"
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Footer from "../../../Layouts/Footer";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Bio from "./Bio";
import FeedsList from "./ProfileFeeds/FeedsList"
import ProfileFeeds from "./ProfileFeeds/ProfileFeeds"


const styles = theme => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(5)
  }

});


class Profile extends Component {
  state = {}

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
      this.props.getProfileFeedsByHandle(this.props.match.params.handle)
    }
  }


  componentWillReceiveProps() {
    if (this.props.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
      this.props.getCurrentProfile()
    }
  }

  render() {

    const { profile, loading } = this.props.profile;
    const { profilefeeds, auth, classes } = this.props

    console.log(this.props)
    let profileContent;
    if (profile === null || loading) {
      profileContent = (
        <div
          align="center"
          style={{ marginTop: "250px", marginBottom: "150px" }}
        >
          <CircularProgress disableShrink size={155} />
        </div>
      );
    } else {
      profileContent = (
        <React.Fragment>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ProfileHeader profile={profile} />
            </Grid>
            <Grid item xs={12} lg={5} md={5}>
              <Bio profile={profile} /><br />
              <ProfileAbout profile={profile} />
              <br />
              {profile.githubusername ? (
                <ProfileGithub username={profile.githubusername} />
              ) : null}
              <br />
              <ProfileCreds
                education={profile.education}
                experience={profile.experience}
              />
            </Grid>
            <Grid item xs={12} lg={7} md={7}>
              {auth.user.id === profile.user._id ? <ProfileFeeds profile={profile} /> : null}
              <br />
              <FeedsList profile={profile} Feeds={profilefeeds.feeds} feedloader={profilefeeds.loading} />
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }



    return (
      <React.Fragment>
        <Container component="main" maxWidth="lg" className={classes.root} >
          <CssBaseline />
          {profileContent}
        </Container>
        <Fab color="primary" size="small" component={Link} to="/Getprofiles" aria-label="add" style={{
          right: '1%',
          bottom: '20%',
          position: 'fixed',
        }}  >
          <ArrowBackIcon />
        </Fab>
        <Footer />
      </React.Fragment>
    );
  }
}


Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  profilefeeds: state.profileFeeds
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, getProfileFeedsByHandle, getCurrentProfile },
)(withStyles(styles)(Profile))