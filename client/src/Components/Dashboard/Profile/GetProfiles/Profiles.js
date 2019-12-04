
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../../../actions/profileActions";
import Footer from "../../../Layouts/Footer";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Pusher from 'pusher-js';
import store from "../../../../store"
import { GET_PROFILES } from "../../../../actions/types"


const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(14),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  margin: {
    marginTop: theme.spacing(0.4),
    marginBottom: theme.spacing(3)
  },
}));


function Profiles(props) {

  const [SearchPeople, SetPeople] = useState('')

  //use effect to call the get profiles function.


  var test;
  useEffect(() => {
    props.getProfiles()
    var pusher = new Pusher('266cfc373d0a8bab3be6', {
      cluster: 'ap2',
      forceTLS: true
    });
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function (data) {
      store.dispatch({
        type: GET_PROFILES,
        payload: data
      })
    });
  }, [])



  const { profiles, profile, loading } = props.profilesdata;
  const classes = useStyles()
  let profileItems;
  var testingadd;
  var Testing
  function SearchProfile(e) {
    SetPeople(e.target.value)
    Testing = profiles.map(profile => {
      if (profile.user.name == e.target.value) {
        return profile
      }
    })
    console.log(Testing)
  }



  if (profiles === null || loading) {
    profileItems = (
      <Grid item xs={12} >
        <div align="center" style={{ marginTop: "100px", marginBottom: "100px" }}
        >
          {" "}
          <CircularProgress disableShrink size={130} />
        </div>
      </Grid>
    );
  } else {
    if (profiles.length > 0) {
      profileItems = profiles.map(Profiles => (
        <Grid item xs={12} sm={12} lg={4} md={4}>
          <ProfileItem key={Profiles._id} profile={Profiles} />
        </Grid>
      ));
    } else {
      profileItems = <h4>No profiles found...</h4>;
    }
  }

  return (
    <React.Fragment>
      <Container component="main" maxWidth="md" >
        <CssBaseline />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <GroupAddIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                developers profile
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Browse and connect with developers
               </Typography>
              <FormControl className={clsx(classes.margin)}>
                <InputLabel htmlFor="standard-adornment-profile">search profile</InputLabel>
                <Input
                  id="standard-adornment-profile"
                  type="text"
                  fullWidth
                  onChange={SearchProfile}
                  value={SearchPeople}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle profile visibility"
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          {profileItems}
          {testingadd}
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  );

}


Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profilesdata: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);





