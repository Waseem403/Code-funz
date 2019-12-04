import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFeedback } from "../../../actions/feedbackaction";
import { getCurrentProfile } from "../../../actions/profileActions";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import StarRatings from "react-star-ratings";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(5)
  },
  submit: {
    margin: theme.spacing(3, 0, 7),
    textTransform: "capitalize"
  }
}));

function Feedback(props) {
  const classes = useStyles();
  const [Message, SetMessage] = useState("");
  const [Stars, SetStars] = useState(0);
  const [CharacterCount, SetCharacterCount] = useState(0)
  const [errors, Seterrors] = useState({});
  const { user } = props.auth;

  const GetInputMessage = e => {
    SetMessage(e.target.value);
    SetCharacterCount(e.target.value.length)
    Seterrors({})
  };

  const changeRating = newRating => {
    SetStars(Stars + newRating);
  };

  const SendFeedback = e => {
    e.preventDefault();
    const NewFeedback = {
      message: Message,
      stars: Stars.toString(),
      name: user.name
    };
    props.addFeedback(NewFeedback);
  };

  useEffect(() => {
    props.getCurrentProfile();
  }, []);

  useEffect(() => {
    if (props.errors) {
      Seterrors(props.errors);
    }
    let error_len = Object.keys(props.errors).length;
    if (error_len === 0) {
      SetStars(0);
      SetMessage("");
    }
  }, [props.errors]);


  //loader for waiting for the response
  let loader;
  //loading when fetching or sending the request to the server.
  loader = errors.loading ? (
    <CircularProgress disableShrink style={{ color: "white" }} size={15} />
  ) : (
      ""
    );
  //loading test when fecthing or sending the data,
  let loaderContent = errors.loading ? "sending..." : "send feedback";


  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Send Us a Feedback
        </Typography>

        <form className={classes.form} onSubmit={SendFeedback}>
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12}>
              <StarRatings
                rating={Stars}
                starRatedColor="orange"
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"
                required
              />
              <br />
              <Typography
                variant="caption"
                color="secondary"
                display="block"
                align="center"
                gutterBottom
              >
                {errors.stars0}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                multiline
                rowsMax="20"
                id="Message"
                label="enter your Message"
                name="Message"
                onChange={GetInputMessage}
                value={Message}
                error={errors.message === undefined ? false : true}
                helperText={errors.message === undefined ? `${CharacterCount}/1500` : errors.message}
              />
            </Grid>
            <Grid
              container
              spacing={2}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {loader}{"  "}{loaderContent}
              </Button>{" "}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

Feedback.propTypes = {
  addFeedback: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addFeedback, getCurrentProfile }
)(Feedback);
