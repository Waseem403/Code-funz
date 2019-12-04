import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../Layouts/Footer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../../actions/profileActions";
import { GetFeeds } from "../../../../actions/profilefeedsaction"
import CircularProgress from "@material-ui/core/CircularProgress";
import ProfileHeader from './ProfileHeader'
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import ProfileFeeds from "./PostFeeds/ProfileFeeds";
import Bio from "./Bio";
import Todo from "./Todo";
import FeedsList from "./PostFeeds/FeedsList";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(15),
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(10),
  },
  avatar: {
    margin: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    textTransform: 'capitalize'
  }
}));

function Profileind(props) {

  const classes = useStyles();


  useEffect(() => {
    props.getCurrentProfile();
    props.GetFeeds()
  }, [])


  const { user } = props.auth;
  const { profile, loading } = props.profile;
  const { profilefeeds } = props

  let dashboardContent;

  if (profile === null || loading) {
    dashboardContent = (
      <div
        align="center"
        style={{ marginTop: "250px", marginBottom: "100px" }}
      >
        <CircularProgress disableShrink size={130} />
      </div>
    );
  } else {
    // Check if logged in user has profile data
    if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <React.Fragment>
          <Container component="main" maxWidth="lg" className={classes.main}>
            <CssBaseline />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ProfileHeader profile={profile} />
              </Grid>
              <Grid item lg={5} md={5} sm={12}>
                <Bio profile={profile} />
                <br />
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
                <br />
                <Todo />
              </Grid>

              <Grid item lg={7} md={7} sm={12}>
                <ProfileFeeds profile={profile} />
                <br />
                <FeedsList profile={profile} Feeds={profilefeeds.feeds} user={user} />
              </Grid>
            </Grid>
          </Container>

        </React.Fragment>
      );
    } else {
      // User is logged in but has no profile
      dashboardContent = (
        <div className={classes.paper}>
          <Avatar className={classes.avatar} >
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h4" align="center">
            Welcome {user.name}
          </Typography><br />
          <Typography variant="body1" align="center">
            You have not yet setup a profile, please add some info
         </Typography><br />
          <Typography variant="body1" align="center">
            Please click the below button to add your details
         </Typography>
          <br /><br />
          <Button variant="contained" color="primary" className={classes.button} component={Link} to="/create-profile">
            create profile
          </Button>
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg" >
        <CssBaseline />
        {dashboardContent}
      </Container>
      <Footer />
    </React.Fragment>
  )
}


Profileind.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  profilefeeds: state.profileFeeds
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, GetFeeds }
)(Profileind);