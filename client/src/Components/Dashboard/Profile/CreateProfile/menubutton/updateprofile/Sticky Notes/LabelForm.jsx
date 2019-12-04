import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddLabels } from "../../../../../../../actions/profileActions";
import TextField from '@material-ui/core/TextField';

class LabelForm extends Component {
  constructor() {
    super();
    this.state = {
      LabelName: "",
      errors: {}
    };
    this.onBlur = this.onBlur.bind(this);
  }

  componentWillReceiveProps(Newprops) {
    if (Newprops.errors) {
      this.setState({
        errors: Newprops.errors
      });
    }
    let error_len = Object.keys(Newprops.errors).length;
    let zero = 0;
    if (error_len === zero) {
      this.setState({
        LabelName: ""
      });
    }
  }

  onChange = e => {
    this.setState({
      LabelName: e.target.value
    });
  };

  onBlur = e => {
    const AddLabels = {
      LabelName: e.target.value,
      id: e.target.id
    };
    this.props.AddLabels(AddLabels);
  };

  render() {
    const { labels } = this.props;
    const { errors } = this.state;

    return (
      <React.Fragment>
        <form>
          <TextField
            name="LabelName"
            onBlur={this.onBlur}
            id={labels._id}
            value={this.state.LabelName}
            onChange={this.onChange.bind(this)}
            type="text"
            label="Add New Label"
            margin="dense"
            variant="outlined"
            error={errors.LabelName === undefined ? false : true}
            helperText={errors.LabelName}
          />
        </form>
      </React.Fragment>
    );
  }
}

LabelForm.propTypes = {
  AddLabels: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { AddLabels }
)(LabelForm);
