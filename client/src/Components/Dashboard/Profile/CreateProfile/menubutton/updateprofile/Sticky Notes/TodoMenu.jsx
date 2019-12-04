import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Todoclone,
  AddLabels,
  TodoEdit, PingTodos
} from "../../../../../../../actions/profileActions";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";
import AddLabel from "./AddLabel";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  modalcontainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  submitbtn:
    {
      marginTop: theme.spacing(3),
      textTransform: 'capitalize'
    }
});

class TodoMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      anchorEl: null,
      Id: "",
      TodoId: this.props.items._id,
      TodoTitle: this.props.items.TodoTitle,
      TodoDesc: this.props.items.TodoDesc,
      errors: {}
    };
  }

  componentWillReceiveProps(NewProps) {
    this.setState({ errors: NewProps.errors });
    let error_len = Object.keys(NewProps.errors).length;
    let zero = 0;
    if (error_len === zero) {
      this.setState({
        open: false
      });
    }
  }

  handleClick(event, popoverId) {
    event.preventDefault();
    this.setState({
      pop_open: !this.state.pop_open,
      anchorEl: event.currentTarget,
      openedPopoverId: popoverId
    });
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  // submit function which submit the edited data
  onSubmit = e => {
    e.preventDefault();

    const TodoData = {
      TodoTitle: this.state.TodoTitle,
      TodoDesc: this.state.TodoDesc,
      TodoId: this.state.TodoId
    };
    this.props.TodoEdit(TodoData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  handleClose() {
    this.setState({
      pop_open: false,
      anchorEl: null,
      openedPopoverId: null
    });
  }

  // calling the cloning api with the below function

  Clonetodos(id) {
    this.props.Todoclone(id);
  }

  //calling the edit api with the below function

  handleEdit(id) {
    this.setState({ open: true });
  }

  handleeditclose() {
    this.setState({ open: false });
  }

  //ping the high priority task
  onPingClick(id) {
    this.props.PingTodos(id);
  }

  render() {
    const { items, classes } = this.props;
    const { anchorEl, errors } = this.state;
    return (
      <React.Fragment>
        <div>
          <Tooltip title="more" placement="top" >
            <IconButton
              size="small"
              aria-controls="fade-menu"
              aria-haspopup="true"
              onClick={this.handleClick.bind(this)}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={this.handleClose.bind(this)}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={this.handleEdit.bind(this, items._id)}>
              <Typography variant="caption" gutterBottom>
                <i class="fas fa-edit" /> edit note
              </Typography>
            </MenuItem>
            <MenuItem
              aria-controls="fade-menu"
              aria-haspopup="true"
              onClick={this.handleClick.bind(this)}
            >
              <AddLabel items={items} AddLabel={this.props.AddLabels} />
            </MenuItem>
            <MenuItem onClick={this.onPingClick.bind(this, items._id)}>
              <Typography variant="caption" gutterBottom>
                {" "}
                <i className="fas fa-thumbtack" /> {items.TodoPing === true ? "unping note" : "ping note"}
              </Typography>
            </MenuItem>
            <MenuItem onClick={this.Clonetodos.bind(this, items._id)}>
              <Typography variant="caption" gutterBottom>
                {" "}
                <i class="far fa-copy" /> Clone note
              </Typography>
            </MenuItem>
          </Menu>
        </div>

        {/*edit modal....*/}

        <Dialog
          open={this.state.open}
          onClose={this.handleeditclose.bind(this)}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title" className="center">
            <Grid align="right">
              <i
                class="far fa-times-circle right"
                style={{ cursor: "pointer" }}
                onClick={this.handleeditclose.bind(this)}
              />
            </Grid>
            <Typography component="h2" variant="h5" align="center"> Edit sticky note</Typography>{" "}

          </DialogTitle>

          <DialogContent>
            <Container component="main" maxWidth="md" className={classes.modalcontainer}>
              <CssBaseline />
              <form onSubmit={this.onSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="TodoTitle"
                      label="Todo Title"
                      name="TodoTitle"
                      type="text"
                      value={this.state.TodoTitle}
                      onChange={this.onChange}
                      margin="normal"
                      error={errors.TodoDesc === undefined ? false : true}
                      helperText={errors.TodoDesc}
                    />

                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="TodoDesc"
                      name="TodoDesc"
                      label="Todo Description"
                      multiline
                      row="6"
                      value={this.state.TodoDesc}
                      onChange={this.onChange}
                      margin="normal"
                      error={errors.TodoDesc === undefined ? false : true}
                      helperText={errors.TodoDesc}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button size="small" fullWidth color="primary" type="submit" variant="contained" className={classes.submitbtn}>Submit</Button>
                  </Grid>
                </Grid>

              </form>
            </Container>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

TodoMenu.propTypes = {
  Todoclone: PropTypes.func.isRequired,
  TodoEdit: PropTypes.func.isRequired,
  AddLabels: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { Todoclone, AddLabels, TodoEdit, PingTodos }
)(withStyles(styles)(TodoMenu));

// export default withStyles(styles)(TodoMenu);
