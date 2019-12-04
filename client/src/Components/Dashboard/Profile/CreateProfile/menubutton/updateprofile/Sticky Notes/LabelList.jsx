import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteLabels } from "../../../../../../../actions/profileActions";
import Tooltip from "@material-ui/core/Tooltip";
import { ToggleLabels } from "../../../../../../../actions/profileActions";


function CheckboxList(props) {

  const handleToggle = (Labelid, Todoid) => () => {
    const Toggledata = {
      Labelid: Labelid,
      Todoid: Todoid
    };
    props.ToggleLabels(Toggledata);
  };

  const LabelDelete = (labelid, TodoId) => () => {
    const labeldata = {
      labelid,
      TodoId
    };
    props.deleteLabels(labeldata);
  };

  return (
    <List>
      {props.labelitems.TodoLabels.map(value => {
        const labelId = `checkbox-list-label-${value._id}`;
        return (
          <ListItem
            key={value._id}
            role={undefined}
            dense
            button
            onClick={handleToggle(value._id, props.labelitems._id)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={value.isVisible ? true : false}
                tabIndex={-1}
                disableRipple
                color="primary"
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value.label} />
            <ListItemSecondaryAction>
              <Tooltip title="delete permantly" aria-label="Add">
                <IconButton
                  edge="end"
                  size="small"
                  id={labelId}
                  aria-label="comments"
                  onClick={LabelDelete(value._id, props.labelitems._id)}
                >
                  <DeleteIcon color="secondary" />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteLabels, ToggleLabels }
)(CheckboxList);
