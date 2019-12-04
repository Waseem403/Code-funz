import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CircularProgress from "@material-ui/core/CircularProgress";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import RoomIcon from '@material-ui/icons/Room';
import IconButton from '@material-ui/core/IconButton';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { AddStatus } from "../../../../../actions/profilefeedsaction"
import firebase from "firebase/app";
import 'firebase/storage';  // If using Firebase storage
import FileUploader from "react-firebase-file-uploader";







function TabPanel(props) {
  const { children, profile, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    width: "100%"
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  submit: {
    textTransform: "capitalize"
  },
  fabGreen: {
    color: 'black',
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: blue[900],
      textTransform: "capitalize",
      color: theme.palette.common.white,
    }
  },
  bigAvatar: {
    marginTop: "3%",
    marginLeft: "-15%",
    width: 50,
    height: 50,
  },
}));

function ProfileFeeds(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [statusonly, setstatusonly] = useState("");
  const [CharacterCount, SetCharacterCount] = useState(0)
  const [progress, Setprogress] = useState(0)
  const [avatarURL, SetavatarURL] = useState("")
  const [disabled, Setdisabled] = useState(true)
  const [errors, seterrors] = useState({})



  const handleUploadStart = () => {
    Setprogress(0)
  }

  const handleProgress = progress => {
    Setprogress(progress)
    if (progress === 100) {
      Setdisabled(false)
    }
  }

  const handleUploadError = error => {
    console.error(error);
  };

  const handleUploadSuccess = filename => {
    Setprogress(100)
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => SetavatarURL(url));
  };


  //useeffect which check for errors and updates
  useEffect(() => {
    if (props.errors) {
      seterrors(props.errors)
    }
    let error_len = Object.keys(props.errors).length;
    let zero = 0;
    if (error_len === zero) {
      setstatusonly("")
      SetCharacterCount(0)
    }
  }, [props])
  //handling the tab changes 
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  //handliing the tab changes
  function handleChangeIndex(index) {
    setValue(index);
  }

  // handling the status only tab inputs and submission
  function HandleInputs(e) {
    setstatusonly(e.target.value);
    SetCharacterCount(e.target.value.length)
    seterrors({})
  }


  const HandleStatusOnlySubmit = e => {
    e.preventDefault();
    const StatusData = {
      StatusComment: statusonly
    };
    props.AddStatus(StatusData);
  };

  const HandleStatusWithMediaSubmit = e => {
    e.preventDefault();
    const StatusData = {
      StatusComment: statusonly,
      PostImgURL: avatarURL
    };
    props.AddStatus(StatusData);
  };

  //loader for waiting for the response
  let StatusLoader;
  //loading when fetching or sending the request to the server.
  StatusLoader = errors.loading ? <CircularProgress disableShrink style={{ color: "white" }} size={15} /> : null


  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="nav tabs example"
        >
          <Tab className={classes.fabGreen}
            label="update status" {...a11yProps(0)} />
          <Tab className={classes.fabGreen}
            label="add photos" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Typography component="h2" variant="h6" align="center">update your status</Typography>
          <form onSubmit={HandleStatusOnlySubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="NormalPost"
                  label="update status"
                  margin="normal"
                  name="update status"
                  multiline
                  row="6"
                  value={statusonly}
                  onChange={HandleInputs}
                  fullWidth
                  error={errors.StatusComment === undefined ? false : true}
                  helperText={errors.StatusComment === undefined ? `${CharacterCount}/1500` : errors.StatusComment}
                />
              </Grid>
              <Grid item xs={12} >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  type="submit"
                  className={classes.submit}
                >
                  {StatusLoader} {" "}   Post status
                    </Button>
              </Grid>
            </Grid>
          </form>
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          className={classes.root}
          dir={theme.direction}
        >
          <Typography component="h2" variant="h6" align="center">Share your post</Typography>
          <form onSubmit={HandleStatusWithMediaSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  id="NormalPost"
                  label="update status"
                  margin="normal"
                  name="update status"
                  multiline
                  row="6"
                  value={statusonly}
                  onChange={HandleInputs}
                  fullWidth
                  error={errors.StatusComment === undefined ? false : true}
                  helperText={errors.StatusComment === undefined ? `${CharacterCount}/1500` : errors.StatusComment}
                />
              </Grid>
              <Grid item xs={12} >
                {progress !== 0 && progress !== 100 ?
                  <CircularProgress disableShrink size={15} /> :
                  <IconButton
                    size="medium"
                    component="label"
                  >
                    <PhotoCameraIcon fontSize="small" />{" "}
                    <FileUploader
                      accept="image/*"
                      name="avatar"
                      randomizeFilename
                      storageRef={firebase.storage().ref("images")}
                      onUploadStart={handleUploadStart}
                      onUploadError={handleUploadError}
                      onUploadSuccess={handleUploadSuccess}
                      onProgress={handleProgress}
                      required
                      style={{ display: "none" }}
                    />
                  </IconButton>
                }
                <IconButton size="medium" aria-label="delete">
                  <RoomIcon fontSize="small" />
                </IconButton>
                <IconButton size="medium" aria-label="delete">
                  <SentimentVerySatisfiedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item xs={12} >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  type="submit"
                  disabled={disabled}
                  className={classes.submit}
                >
                  {StatusLoader} {" "}   Post status
                    </Button>
              </Grid>
            </Grid>
          </form>
        </TabPanel>

      </SwipeableViews>
    </div>
  );
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { AddStatus }
)(ProfileFeeds);
