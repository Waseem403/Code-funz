import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../../../../../actions/profileActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Todos from "./Todos";
import TodoList from "./TodoList";
import Footer from "../../../../../../Layouts/Footer";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import EventIcon from '@material-ui/icons/Event';
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },


  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(5),
    width: "100%"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "capitalize"
  },

});






class TodoLists extends Component {
  state = {
    open: false
  };

  handleAddModal(id) {
    this.setState({ open: true });
  }

  handleeditclose() {
    this.setState({ open: false });
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(NewProps) {
    let error_len = Object.keys(NewProps.errors).length;

    let zero = 0;
    if (error_len === zero) {
      this.setState({
        open: false
      });
      console.log("rendering this continuesly")
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let TodosContent
    const { classes } = this.props
    if (profile === null || loading) {
      TodosContent = (
        <div
          align="center"
          style={{ marginTop: "100px", marginBottom: "100px" }}
        >
          <CircularProgress disableShrink size={130} />
        </div>
      );
    } else {
      TodosContent = <React.Fragment>
        <TodoList profile={profile} />
      </React.Fragment>
    }
    return (
      <React.Fragment>
        <Container component="main" maxWidth="lg" align="center" classname={classes.root}>
          <CssBaseline />

          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <EventIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              sticky notes
           </Typography>
            {TodosContent}
            <Dialog
              open={this.state.open}
              onClose={this.handleeditclose.bind(this)}
              aria-labelledby="form-dialog-title"
              fullWidth={true}
              maxWidth="sm"
            >
              <DialogTitle id="form-dialog-title" align="center">
                <Grid align="right">
                  <i
                    class="far fa-times-circle"
                    align="right"
                    style={{ cursor: "pointer" }}
                    onClick={this.handleeditclose.bind(this)}
                  />
                </Grid>
                Add sticky notes
              </DialogTitle>
              <DialogContent>
                <Todos state={this.state} />
              </DialogContent>
            </Dialog>
          </div>
        </Container>
        <Fab color="primary" onClick={this.handleAddModal.bind(this)}
          aria-label="add" style={{
            right: '1%',
            bottom: '20%',
            position: 'fixed',
          }}  >
          <AddCircleIcon />
        </Fab>
        <Footer />
      </React.Fragment>
    );
  }
}

TodoLists.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withStyles(styles)(TodoLists));
