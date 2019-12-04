import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTodos } from "../../../../../../../actions/profileActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";



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

class Todos extends Component {
  state = {
    Priority: "",
    TodoTitle: "",
    TodoDesc: "",
    TodoDays: "",
    TodoTime: "",
    errors: {}
  };

  componentWillReceiveProps(NewProps) {
    this.setState({ errors: NewProps.errors });

  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  setGender(event) {
    this.setState({ Priority: event.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    const TodoData = {
      TodoTitle: this.state.TodoTitle,
      TodoDesc: this.state.TodoDesc
    };
    this.props.addTodos(TodoData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  render() {
    const { errors } = this.state;
    const { classes } = this.props

    return (
      <React.Fragment>
        <Container component="main" maxWidth="md" className={classes.modalcontainer}>
          <CssBaseline />
          <form onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="TodoTitle"
                  fullWidth
                  id="TodoTitle"
                  label="TodoTitle"
                  required
                  value={this.state.TodoTitle}
                  onChange={this.onChange}
                  error={errors.TodoTitle === undefined ? false : true}
                  helperText={errors.TodoTitle}

                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  multiline
                  row="6"
                  id="TodoDesc"
                  label="TodoDesc"
                  name="TodoDesc"
                  value={this.state.TodoDesc}
                  onChange={this.onChange}
                  error={errors.TodoDesc === undefined ? false : true}
                  helperText={errors.TodoDesc}
                />
              </Grid>
              <Grid item xs={12} align="center">
                <Button size="small" fullWidth color="primary" type="submit" variant="contained" className={classes.submitbtn}>Submit</Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}

Todos.propTypes = {
  addTodos: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTodos }
)(withStyles(styles)(Todos));
