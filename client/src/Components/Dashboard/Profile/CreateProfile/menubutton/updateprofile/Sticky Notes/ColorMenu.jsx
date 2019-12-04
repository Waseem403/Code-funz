import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Changecolor } from "../../../../../../../actions/profileActions";
import Popover from "@material-ui/core/Popover";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PaletteIcon from '@material-ui/icons/Palette';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';

class ColorMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pop_open: false,
      anchorEl: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, popoverId) {
    event.preventDefault();
    this.setState({
      pop_open: !this.state.pop_open,
      anchorEl: event.currentTarget,
      openedPopoverId: popoverId
    });
  }

  handleClose() {
    this.setState({
      pop_open: false,
      anchorEl: null,
      openedPopoverId: null
    });
  }

  ColorChange(obj) {
    this.props.Changecolor(obj);
  }

  render() {
    const { items } = this.props;
    const { openedPopoverId } = this.state;
    return (
      <React.Fragment>
        <Tooltip title="change color" placement="top" >
          <IconButton
            aria-describedby={items._id}
            variant="contained"
            key={items._id}
            size="small"
            onClick={event => this.handleClick(event, items._id)}>
            <PaletteIcon />
          </IconButton>
        </Tooltip>
        {" "}
        <Popover
          id={items._id}
          open={openedPopoverId === items._id}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose.bind(this)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Card>
            <CardContent>
              <Tooltip title="white" placement="bottom">
                <Fab
                  size="small"
                  style={{
                    width: "35px",
                    height: "30px",
                    margin: "3px",
                    border: "1px solid #808080"
                  }}
                  id={items._id}
                  onClick={this.ColorChange.bind(this, { color: "white", id: items._id })}
                >
                  <CheckIcon
                    style={{
                      display: items.color === "white" ? "block" : "none"
                    }}
                  />
                </Fab>
              </Tooltip>
              <Tooltip title="red" placement="bottom">
                <Fab
                  size="small"
                  style={{
                    width: "35px",
                    height: "30px",
                    margin: "3px",
                    backgroundColor: "#f28b82",
                    border: "1px solid #808080"
                  }}

                  id={items._id}
                  onClick={this.ColorChange.bind(this, { color: "#f28b82", id: items._id })}
                >
                  {" "}
                  <CheckIcon
                    style={{
                      display: items.color === "#f28b82" ? "block" : "none"
                    }}
                  />
                </Fab>
              </Tooltip>
              <Tooltip title="orange" placement="bottom">
                <Fab
                  size="small"
                  style={{
                    width: "35px",
                    height: "30px",
                    margin: "3px",
                    backgroundColor: "#fbbc04",
                    border: "1px solid #808080"
                  }}
                  id={items._id}
                  onClick={this.ColorChange.bind(this, { color: "#fbbc04", id: items._id })}
                >
                  {" "}
                  <CheckIcon
                    style={{
                      display: items.color === "#fbbc04" ? "block" : "none"
                    }}
                  />
                </Fab>
              </Tooltip>
              <Tooltip title="yellow" placement="bottom">
                <Fab
                  size="small"
                  style={{
                    width: "35px",
                    height: "30px",
                    margin: "3px",
                    backgroundColor: "#fff475",
                    border: "1px solid #808080"
                  }}
                  id={items._id}
                  onClick={this.ColorChange.bind(this, { color: "#fff475", id: items._id })}
                >

                  <CheckIcon
                    style={{
                      display: items.color === "#fff475" ? "block" : "none"
                    }} />
                </Fab>
              </Tooltip>
              <br />
              <Tooltip title="green" placement="bottom">
                <Fab
                  size="small"
                  style={{
                    width: "35px",
                    height: "30px",
                    margin: "3px",
                    backgroundColor: "#ccff90",
                    border: "1px solid #808080"
                  }}
                  id={items._id}
                  onClick={this.ColorChange.bind(this, { color: "#ccff90", id: items._id })}
                >
                  <CheckIcon
                    style={{
                      display: items.color === "#ccff90" ? "block" : "none"
                    }}
                  />
                </Fab>
              </Tooltip>
              <Tooltip title="teal" placement="bottom">
                <Fab
                  size="small"
                  style={{
                    width: "35px",
                    height: "30px",
                    margin: "3px",
                    backgroundColor: "#a7ffeb",
                    border: "1px solid #808080"
                  }}
                  id={items._id}
                  onClick={this.ColorChange.bind(this, { color: "#a7ffeb", id: items._id })}
                >

                  <CheckIcon
                    style={{
                      display: items.color === "#a7ffeb" ? "block" : "none"
                    }}
                  />
                </Fab>
              </Tooltip>
              <Tooltip title="blue" placement="bottom">
                <Fab
                  size="small"
                  style={{
                    width: "35px",
                    height: "30px",
                    margin: "3px",
                    backgroundColor: "#cbf0f8",
                    border: "1px solid #808080"
                  }}
                  id={items._id}
                  onClick={this.ColorChange.bind(this, { color: "#cbf0f8", id: items._id })}
                >

                  <CheckIcon
                    style={{
                      display: items.color === "#cbf0f8" ? "block" : "none"
                    }}
                  />
                </Fab>
              </Tooltip>
              <Tooltip title="dark blue" placement="bottom">
                <Fab
                  size="small"
                  style={{
                    width: "35px",
                    height: "30px",
                    margin: "3px",
                    backgroundColor: "#aecbfa",
                    border: "1px solid #808080"
                  }}
                  id={items._id}
                  onClick={this.ColorChange.bind(this, { color: "#aecbfa", id: items._id })}
                >
                  <CheckIcon
                    style={{
                      display: items.color === "#aecbfa" ? "block" : "none"
                    }}
                  />
                </Fab>
              </Tooltip>
              <br />
              <Tooltip title="purple" placement="bottom">
                <Fab
                  size="small"
                  style={{
                    width: "35px",
                    height: "30px",
                    margin: "3px",
                    backgroundColor: "#d7aefb",
                    border: "1px solid #808080"
                  }}
                  id={items._id}
                  onClick={this.ColorChange.bind(this, { color: "#d7aefb", id: items._id })}
                >
                  <CheckIcon
                    style={{
                      display: items.color === "#d7aefb" ? "block" : "none"
                    }}
                  />
                </Fab>
              </Tooltip>
              <Tooltip title="pink" placement="bottom">
                <Fab
                  size="small"
                  style={{
                    width: "35px",
                    height: "30px",
                    margin: "3px",
                    backgroundColor: "#fdcfe8",
                    border: "1px solid #808080"
                  }}
                  id={items._id}
                  onClick={this.ColorChange.bind(this, { color: "#fdcfe8", id: items._id })}
                >

                  <CheckIcon
                    style={{
                      display: items.color === "#fdcfe8" ? "block" : "none"
                    }}
                  />
                </Fab>
              </Tooltip>
              <Tooltip title="brown" placement="bottom">
                <Fab
                  size="small"
                  style={{
                    width: "35px",
                    height: "30px",
                    margin: "3px",
                    backgroundColor: "#e6c9a8",
                    border: "1px solid #808080"
                  }}
                  id={items._id}
                  onClick={this.ColorChange.bind(this, { color: "#e6c9a8", id: items._id })}
                >

                  <CheckIcon
                    style={{
                      display: items.color === "#e6c9a8" ? "block" : "none"
                    }}
                  />

                </Fab>
              </Tooltip>
              <Tooltip title="gray" placement="bottom">
                <Fab
                  size="small"
                  style={{
                    width: "35px",
                    height: "30px",
                    margin: "3px",
                    backgroundColor: "#e8eaed",
                    border: "1px solid #808080"
                  }}
                  id={items._id}
                  onClick={this.ColorChange.bind(this, { color: "#e8eaed", id: items._id })}
                >
                  <CheckIcon
                    style={{
                      display: items.color === "#e8eaed" ? "block" : "none"
                    }}
                  />
                </Fab>
              </Tooltip>
            </CardContent>
          </Card>
        </Popover>
      </React.Fragment>
    );
  }
}

ColorMenu.propTypes = {
  Changecolor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { Changecolor }
)(ColorMenu);
