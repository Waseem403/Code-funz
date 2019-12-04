import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { forgotPass } from "../../actions/authActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alerts from "../Auth/AlertMessages";




function Copyright() {
  return (
    <Typography variant="h6" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Code funz
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(8)
  },
  submit: {
    margin: theme.spacing(3, 0, 7),
    textTransform: "capitalize"
  },
  footer: {
    paddingTop: theme.spacing(8)
  },
  links: {
    textDecoration: "none"
  }
}));

function Forgot(props) {
  const classes = useStyles();

  const [Email, SetEmail] = useState("");
  const [errors, Seterrors] = useState({});
  const [ServerResponse, SetResponse] = useState(false);
  const [ResponseMessage, SetMessage] = useState("");
  const [ResponseVariant, SetVariant] = useState("");




  const GetInputEmail = e => {
    SetEmail(e.target.value);
  };

  const OnSubmit = e => {
    e.preventDefault();
    const userData = {
      email: Email
    };
    props.forgotPass(userData);
  };

  let loader;
  if (props.errors.loading === true)
    loader = (
      <CircularProgress disableShrink style={{ color: "white" }} size={20} />
    );
  //useeffect function used to get new props(response from the server)

  useEffect(() => {
    if (props.errors) {
      Seterrors(props.errors);
    }
    var error_len = Object.keys(props.errors).length;
    if (error_len === 0) {
      SetEmail("");
    }
  });



  useEffect(() => {
    const response = Object.keys(props.success).length
    if (response !== 0) {
      SetResponse(true);
      SetMessage(
        props.success
      );
      SetVariant("info");
    }
  }, [props.success])


  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Alerts
        ServerResponse={ServerResponse}
        ResponseMessage={ResponseMessage}
        ResponseVariant={ResponseVariant}
      />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>

        <form className={classes.form} onSubmit={OnSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="Email Address"
            label="Email Address"
            name="Email Address"
            autoComplete="email"
            type="email"
            onChange={GetInputEmail}
            value={Email}
            error={errors.Forgotemail === undefined ? false : true}
            helperText={errors.Forgotemail}
          />{" "}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            {loader} {"  "}Reset password
          </Button>{" "}
        </form>
      </div>
      <Grid container justify="center">
        {" "}
        <Grid item>
          Already have an account?{" "}
          <Link to="/login" variant="body2" style={{ textDecoration: "none" }}>
            Sign in
          </Link>{" "}
          |{" "}
          <Link
            to="/Register"
            variant="body2"
            style={{ textDecoration: "none" }}
          >
            Register
          </Link>
        </Grid>
      </Grid>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

Forgot.propTypes = {
  forgotPass: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  success: state.success_msg
});

export default connect(
  mapStateToProps,
  { forgotPass }
)(withRouter(Forgot));
