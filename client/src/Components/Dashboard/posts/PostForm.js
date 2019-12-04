import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../../actions/postActions";
import TextField from '@material-ui/core/TextField';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(5),
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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(7)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "capitalize"
  },

}));

function PostForm(props) {
  const classes = useStyles();
  const [Message, SetMessage] = useState("")
  const [CharacterCount, SetCharacterCount] = useState(0)
  const [state, setState] = React.useState(false);
  const [errors, seterrors] = useState({})
  //creating the toggle function for drawer
  const OpenDrawer = () => {
    setState(true)
  }
  const CloseDrawer = () => {
    setState(false)
  }
  //creating the onchange function
  const GetMessage = e => {
    SetMessage(e.target.value)
    SetCharacterCount(e.target.value.length)
    seterrors({})
  }

  //submiting the form with the below function
  const onSubmit = e => {
    e.preventDefault();
    const { user } = props.auth;
    const newPost = {
      text: Message,
      name: user.name
    };
    props.addPost(newPost);
  }

  //catching the server response with the useeffect function.
  useEffect(() => {
    if (props.errors) {
      seterrors(props.errors);
    }
    let error_len = Object.keys(props.errors).length;
    let zero = 0;
    if (error_len === zero) {
      SetMessage("")
      setState(false)
      SetCharacterCount(0)
    }

  }, [props])


  //loader for waiting for the response
  let profileContent;
  //loading when fetching or sending the request to the server.
  profileContent = errors.loading ? (
    <CircularProgress disableShrink style={{ color: "white" }} size={15} />
  ) : (
      ""
    );
  //loading test when fecthing or sending the data,
  let ProfileData = errors.loading ? "Posting..." : "add a post";


  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="bottom"
        height="500"
        open={state}
        onClose={CloseDrawer}
        onOpen={OpenDrawer}
      >
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LiveHelpIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Post forum
        </Typography>

            <form className={classes.form} onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-Message"
                    label="Add Query or post"
                    autoComplete='off'
                    fullWidth
                    multiline
                    rowsMax="10"
                    value={Message}
                    onChange={GetMessage}
                    margin="normal"
                    name="Message"
                    error={errors.text === undefined ? false : true}
                    helperText={errors.text === undefined ? `${CharacterCount}/1000` : errors.text}
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
                {profileContent}{"  "} {ProfileData}

              </Button>
              <Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </SwipeableDrawer>


      <Fab color="primary" aria-label="add" style={{
        right: '1%',
        bottom: '20%',
        position: 'fixed',
      }} onClick={OpenDrawer} >
        <AddIcon />
      </Fab>
    </React.Fragment>
  )

}




PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);