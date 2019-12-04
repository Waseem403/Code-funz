import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { setTimeout } from "timers";
class ProfileDialog extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  handleClickOpen() {
    this.setState({
      open: true
    });
  }
  componentDidMount() {
    this.props.getCurrentProfile();
    setTimeout(() => {
      this.handleDialog();
    }, 5000);
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleDialog() {
    const { profile, loading } = this.props.profile;
    if (profile === null || loading) {
      console.log("loading....");
    } else {
      if (Object.keys(profile).length === 0) {
        this.setState({
          open: true
        });
      }
    }
  }
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          fullWidth={true}
          maxWidth="md"
          aria-labelledby="draggable-dialog-title"
        >
          <DialogContent>
            <DialogContentText align="center" variant="h5" gutterBottom>
              <i class="far fa-frown fa-6x" />
            </DialogContentText>

            <DialogContentText align="center" variant="h3" gutterBottom>
              Welcome {user.name}
            </DialogContentText>
            <DialogContentText align="center" variant="h6" gutterBottom>
              <b> You have not yet setup a profile, please add some info </b>
            </DialogContentText>
            <DialogContentText align="center" variant="h6" gutterBottom>
              <b> Please click the below button to add your details</b>
            </DialogContentText>
            <DialogContentText align="center" variant="body1" color="error" gutterBottom>
              <b >
                {" "}
                Note: Before moving to anything please make sure to set your
                profile it will take hardly 5 mins to set your profile
              </b>
            </DialogContentText>
            <DialogContentText align="center" variant="h3" gutterBottom>
              <Button
                component={Link}
                to="/create-profile"
                style={{ textTransform: "capitalize" }}
                variant="contained"
                color="primary"
              >
                Create Profile
              </Button>{" "}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

ProfileDialog.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(ProfileDialog);
