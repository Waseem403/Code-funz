import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "capitalize"
  },
  footer: {
    paddingTop: theme.spacing(8)
  },
  links: {
    textDecoration: "none"
  }
}));

function Login(props) {
  const classes = useStyles();
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [errors, SetErrors] = useState({});
  const [values, setValues] = React.useState({
    showPassword: false
  });
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  });

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }

    if (props.errors) {
      SetErrors(props.errors);
    }
  });

  const SetInputsPass = e => {
    SetPassword(e.target.value);
  };

  //setting hide n visible functionality
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const SetInputsEmail = e => {
    SetEmail(e.target.value);
  };

  const OnSubmit = e => {
    e.preventDefault();
    const userData = {
      email: Email,
      password: Password
    };
    props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };



  //loader for waiting for the response
  let Loader;
  //loading when fetching or sending the request to the server.
  Loader = errors.loading ? (
    <CircularProgress disableShrink style={{ color: "white" }} size={15} />
  ) : (
      ""
    );
  //loading test when fecthing or sending the data,
  let profileContent = errors.loading ? "Signing..." : "Sign in";


  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={OnSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            onChange={SetInputsEmail}
            value={Email}
            error={errors.loginemail === undefined ? false : true}
            helperText={errors.loginemail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            onChange={SetInputsPass}
            value={Password}
            type={values.showPassword ? "text" : "password"}
            error={errors.loginpassword === undefined ? false : true}
            helperText={errors.loginpassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="small"
            color="primary"
            className={classes.submit}
          >
            {Loader}{""} {profileContent}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot" className={classes.links} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              Don't have an account?{" "}
              <Link to="/Register" className={classes.links} variant="body2">
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
