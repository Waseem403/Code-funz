import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import LabelList from "./LabelList";
import LabelForm from "./LabelForm";

export default function AddLabel(props) {
  const [anchorEl, setAnchorEl] = React.useState("");

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;



  return (
    <div>
      <Typography variant="caption" component="h5" aria-describedby={id} onClick={handleClick}>
        <i class="fas fa-tag" /> Add label
      </Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "center ",
          horizontal: "left"
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="caption" display="block" gutterBottom align="center">
              <i class="fas fa-tag" /> label note
            </Typography>
            <LabelForm labels={props.items} />
            <LabelList labelitems={props.items} />
          </CardContent>
        </Card>{" "}
      </Popover>
    </div>
  );
}
