import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
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
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import Alerts from "../Auth/AlertMessages";

function Copyright() {
  return (
    <Typography variant="h6" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        style={{ color: "textSecondary", textDecoration: "none" }}
        to="/"
      >
        code funz{" "}
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
    marginTop: theme.spacing(15),
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "capitalize"
  },
  errors: {
    paddingTop: "0.5%",
    paddingLeft: "1%",
    color: red[900],
    fontWeight: "bold"
  },
  dense: {
    fontSize: "12px"
  }
}));

function Register(props) {
  const classes = useStyles();
  const [UserName, SetUserName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password1, SetPassword1] = useState("");
  const [Password2, SetPassword2] = useState("");
  const [PhoneNum, SetPhoneNum] = useState("");
  const [errors, SetErorrs] = useState({});
  const [values, setValues] = React.useState({
    showPassword: false
  });
  const [ServerResponse, SetResponse] = useState(false);
  const [ResponseMessage, SetMessage] = useState("");
  const [ResponseVariant, SetVariant] = useState("");


  const GetUserName = e => {
    SetUserName(e.target.value);
  };

  const GetEmail = e => {


    SetEmail(e.target.value);
  };

  const GetPassword1 = e => {
    SetPassword1(e.target.value);
  };
  //setting hide n visible functionality
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const GetPassword2 = e => {
    SetPassword2(e.target.value);
  };

  // onchange handler for the phone input
  const GetPhone = e => {
    SetPhoneNum(e.target.value);
  };

  //submiting the form with the below function
  const OnRegister = e => {
    e.preventDefault();

    const newUser = {
      name: UserName,
      email: Email,
      password: Password1,
      password2: Password2,
      phone: PhoneNum
    };
    const status = navigator.onLine;
    if (status) {
      props.registerUser(newUser, props.history);
    } else {

      SetResponse(true);
      SetMessage("Please check your internet connection.");
      SetVariant("error");
    }
  };

  //handling the input error and other stuffs using the useeffect funtion.
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (props.errors) {
      SetErorrs(props.errors);
    }
    let error_len = Object.keys(props.errors).length;
    if (error_len === 0) {
      SetUserName("");
      SetEmail("");
      SetPassword1("");
      SetPassword2("");
      SetPhoneNum("");

    }
    // loading the success message if the below condition match

    const response = Object.keys(props.success).length
    if (response !== 0) {
      SetResponse(true);
      SetMessage(
        props.success
      );
      SetVariant("success");
    }
    return () => {
      if (response === 0) {
        SetResponse(false)
      }
    };

  }, [props]);



  //loader for waiting for the response
  let profileContent;
  //loading when fetching or sending the request to the server.
  profileContent = errors.loading ? (
    <CircularProgress disableShrink style={{ color: "white" }} size={15} />
  ) : (
      ""
    );
  //loading test when fecthing or sending the data,
  let ProfileData = errors.loading ? "Registering..." : "Register now";

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
          Register
        </Typography>

        <form className={classes.form} onSubmit={OnRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="UserName"
                name="UserName"
                variant="outlined"
                required
                fullWidth
                multiline
                rowsMax="10"
                margin="dense"
                id="UserName"
                label="UserName"
                onChange={GetUserName}
                value={UserName}
                error={errors.name === undefined ? false : true}
                helperText={errors.name}
                className={classes.dense}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="dense"
                id="email"
                label="Email Address"
                name="email"
                type="email"
                onChange={GetEmail}
                value={Email}
                error={errors.Registeremail === undefined ? false : true}
                helperText={errors.Registeremail}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="dense"
                name="password1"
                label="Password"
                id="password"
                type={values.showPassword ? "text" : "password"}
                onChange={GetPassword1}
                value={Password1}
                error={errors.Registerpassword === undefined ? false : true}
                helperText={errors.Registerpassword}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="dense"
                name="password2"
                type={values.showPassword ? "text" : "password"}
                label="confirm password"
                id="conf"
                onChange={GetPassword2}
                value={Password2}
                error={errors.Registerpassword2 === undefined ? false : true}
                helperText={errors.Registerpassword2}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                            <Visibility />
                          )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                variant="outlined"
                required
                type="num"
                fullWidth
                margin="dense"
                id="phone"
                label="phone"
                onChange={GetPhone}
                value={PhoneNum}
                error={errors.Registerphone === undefined ? false : true}
                helperText={errors.Registerphone}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {profileContent} {ProfileData}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              Already have an account?{" "}
              <Link
                to="/login"
                variant="body2"
                style={{ textDecoration: "none" }}
              >
                Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8} mb={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success: state.success_msg
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
