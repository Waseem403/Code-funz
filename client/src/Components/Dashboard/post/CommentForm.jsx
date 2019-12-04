import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { addComment } from "../../../actions/postActions";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SendIcon from '@material-ui/icons/Send';
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";


const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      CharacterCount: 0,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
    let error_len = Object.keys(newProps.errors).length;
    if (error_len === 0) {
      this.setState({
        text: "",
        CharacterCount: 0
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    const newComment = {
      text: this.state.text,
      name: user.name
    };
    this.props.addComment(postId, newComment);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, CharacterCount: e.target.value.length, errors: {} });
  }



  render() {
    const { errors, CharacterCount } = this.state;
    const { classes } = this.props
    //loader for waiting for the response
    let profileContent;
    //loading when fetching or sending the request to the server.
    profileContent = errors.loading ? (
      <CircularProgress disableShrink style={{ color: "white" }} size={15} />
    ) : (
        ""
      );
    //loading test when fecthing or sending the data,
    let ProfileData = errors.loading ? <i class="fas fa-paper-plane fa-2x"></i> : <SendIcon />;


    return (
      <React.Fragment>
        <List className={classes.root}>
          <ListItem>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <form onSubmit={this.onSubmit}>
                <Grid container >
                  <Grid item xs={10}>
                    <TextField
                      id="outlined-dense-multiline"
                      label="Reply..."
                      fullWidth
                      name="text"
                      onChange={this.onChange}
                      value={this.state.text}
                      multiline
                      rowsMax="10"
                      error={errors.Replies === undefined ? false : true}
                      helperText={errors.Replies === undefined ? `${CharacterCount}/1000` : errors.Replies}
                    />
                  </Grid>
                  <Grid item xs={2} >
                    <Button variant="contained" size="small" type="submit" color="primary">
                      {profileContent}{"  "} {ProfileData}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </ListItem>
        </List>
      </React.Fragment>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(withStyles(styles)(CommentForm));
