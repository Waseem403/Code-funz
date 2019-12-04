import React from "react";
import { connect } from "react-redux";
import { ToggleLabels } from "../../../../../../../actions/profileActions";
import Chip from "@material-ui/core/Chip";


function TagLabels(props) {
  const ToggleLabel = (Labelid, Todoid) => () => {
    const Toggledata = {
      Labelid: Labelid,
      Todoid: Todoid
    };
    console.log("event trigger");
    props.ToggleLabels(Toggledata);
  };

  let labellist = props.labels.TodoLabels.map((items, index) => (
    <React.Fragment key={items._id}>
      <Chip
        variant="outlined"
        style={{
          display: items.isVisible ? "" : "none",
          color: "black",
          borderColor: "black"
        }}
        label={items.label}
        onDelete={ToggleLabel(items._id, props.labels._id)}
      />
    </React.Fragment>
  ));

  return <React.Fragment>{labellist}</React.Fragment>;
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { ToggleLabels }
)(TagLabels);
