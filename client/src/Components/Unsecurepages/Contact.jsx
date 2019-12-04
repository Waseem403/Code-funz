import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { contactus } from "../../actions/contactAction";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import lightBlue from "@material-ui/core/colors/lightBlue";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import Footer from "../Layouts/Footer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Alerts from "../Auth/AlertMessages"
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  },
  main: {
    margin: theme.spacing(15)
  },
  card: {
    width: "100%",
    margin: theme.spacing(1),
    backgroundColor: lightBlue[600],
    color: "white"
  },
  card1: {
    width: "100%",
    margin: theme.spacing(1)
  },
  title: {
    fontSize: 14
  },
  submit: {
    justifyContent: "center",
    marginTop: theme.spacing(3)
  },
  btn: {
    textTransform: "capitalize"
  }
}));

function Contact(props) {
  const classes = useStyles();
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [phone, SetPhone] = useState("");
  const [message, SetMessage] = useState("");
  const [errors, SetErorrs] = useState({});
  const [ServerResponse, SetResponse] = useState(false);
  const [ResponseMessage, SetMessageResponse] = useState("");
  const [ResponseVariant, SetVariant] = useState("");
  //getting the updated props using the below lifecyclemethod

  useEffect(() => {
    if (props.errors) {
      SetErorrs(props.errors);
    }
    let error_len = Object.keys(props.errors).length;
    if (error_len === 0) {
      SetName("");
      SetEmail("");
      SetPhone("");
      SetMessage("");
    }
    const response = Object.keys(props.success).length
    if (response !== 0) {
      SetResponse(true);
      SetMessageResponse(
        props.success
      );
      SetVariant("success");
    }
    if (response === 0) {
      SetResponse(false)
    }
  }, [props]);
  console.log(errors)
  //getting all input values onchange event

  const GetName = e => {
    SetName(e.target.value);
  };

  const GetEmail = e => {
    SetEmail(e.target.value);
  };
  const GetPhone = e => {
    SetPhone(e.target.value);
  };
  const GetMessage = e => {
    SetMessage(e.target.value);
  };

  // sending the form with the SubmitContactForm function

  const SubmitContactForm = e => {
    e.preventDefault();
    const contact = {
      name: name,
      email: email,
      phone: phone,
      message: message
    };
    props.contactus(contact);
  };

  //loader for waiting for the response
  let profileContent;
  //loading when fetching or sending the request to the server.
  profileContent = errors.loading ? (
    <CircularProgress disableShrink style={{ color: "white" }} size={15} />
  ) : (
      ""
    );
  //loading test when fecthing or sending the data,
  let ProfileData = errors.loading ? "submiting..." : "submit";

  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Alerts
          ServerResponse={ServerResponse}
          ResponseMessage={ResponseMessage}
          ResponseVariant={ResponseVariant}
        />
        <div className={classes.main} align="center">
          <Hidden xsDown>
            <Typography variant="h2" component="h2">
              contact us
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography variant="h3" component="h2">
              contact us
            </Typography>
          </Hidden>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Card className={classes.card} align="center">
              <CardContent>
                <i className="fas fa-envelope fa-4x" />{" "}
                <Typography variant="h4" component="h2">
                  Contact Us For Admission
                </Typography>
                <br />
                <Typography variant="body2" component="p">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Repellendus sed praesentium delectus. Sit, mollitia quo.
                  Veniam repellat voluptas ipsum doloremque? Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Repellendus sed
                  praesentium delectus. Sit, mollitia quo. Veniam repellat
                  voluptas ipsum doloremque?
                </Typography>
              </CardContent>
            </Card>
            <List
              component="nav"
              className={classes.root}
              aria-label="mailbox folders"
            >
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="h4" align="center" component="h2">
                      <i className="fas fa-map-marker-alt" /> location{" "}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider />
              <ListItem divider>
                <ListItemText

                  primary="B-6 Cama Industrial Estate,Nirlon Knowledge Park,"
                />
              </ListItem>
              <ListItem>
                <ListItemText

                  primary="Goregaon, Mumbai, Maharashtra 400063"
                />
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText

                  primary="email : b.waseem.403@gmail.com"
                  secondary="Phone no : +91 9966599303,+91 8919175455"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} smmd={6}>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              component="h2"
            >
              <i className="far fa-address-card fa-2x" />
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              component="h2"
            >
              please fill out the below form{" "}
            </Typography>

            <Container maxWidth="sm">
              <form onSubmit={SubmitContactForm}>
                <TextField
                  id="standard-name"
                  label="enter name"
                  fullWidth
                  margin="normal"
                  onChange={GetName}
                  value={name}
                  required
                  error={errors.name === undefined ? false : true}
                  helperText={errors.name}
                />
                <TextField
                  id="standard-name"
                  label="enter email"
                  type="email"
                  fullWidth
                  margin="normal"
                  onChange={GetEmail}
                  value={email}
                  required
                  error={errors.email === undefined ? false : true}
                  helperText={errors.email}
                />
                <TextField
                  id="standard-name"
                  label="enter phone"
                  type="num"
                  fullWidth
                  margin="normal"
                  onChange={GetPhone}
                  value={phone}
                  required
                  error={errors.phone === undefined ? false : true}
                  helperText={errors.phone}
                />
                <TextField
                  id="standard-name"
                  label="Enter message"
                  fullWidth
                  margin="normal"
                  multiline={true}
                  rows={2}
                  rowsMax={16}
                  onChange={GetMessage}
                  value={message}
                  required
                  error={errors.message === undefined ? false : true}
                  helperText={errors.message}
                />
                <div className={classes.submit}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    className={classes.btn}
                  >
                    {profileContent} {ProfileData}
                  </Button>
                </div>
              </form>
            </Container>
          </Grid>
        </Grid>
      </Container>
      <br />
      <br />
      <Footer className={classes.main} />
    </React.Fragment>
  );
}

Contact.propTypes = {
  contactus: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  success: state.success_msg
});

export default connect(
  mapStateToProps,
  { contactus }
)(Contact);
