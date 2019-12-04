import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Tooltip from "@material-ui/core/Tooltip";
import Rating from "@material-ui/lab/Rating";
import blue from "@material-ui/core/colors/blue";
import Moment from 'react-moment';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import EditFeedMenu from "./EditFeedMenu"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  stars: {
    marginLeft: theme.spacing(6)
  },
  link: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: blue[500]
    }
  }
}));

function GetFeeds(props) {
  const classes = useStyles();
  const { feedback, auth } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  //opening the menu section with the below function
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  //closing the menu section with the below function
  function handleClose() {
    setAnchorEl(null);
  }

  //calling the this function for the errors and if not then setting the anchor to null
  useEffect(() => {
    let error_len = Object.keys(props.errors).length;
    if (error_len === 0) {
      setAnchorEl(null);
    }
  }, [props])

  let stars = parseInt(feedback.stars);
  let profilepath = `/Getprofile/${feedback.profile.handle}`;

  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="not found" src={feedback.profile.avatar} />
            </ListItemAvatar>

            <ListItemText
              primary={
                <Tooltip
                  title={`${feedback.profile.status} at ${
                    feedback.profile.company
                    }`}
                  placement="top"
                >
                  <Link to={profilepath} className={classes.link}>
                    {feedback.name}{" "}
                  </Link>
                </Tooltip>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption" display="block" gutterBottom
                  >
                    <i className="fas fa-clock" /> {feedback.edited ? "last edited on" : "posted on"} -{" "}
                    {feedback.edited ? <Moment format="DD MMM YYYY ">{feedback.editedDate}</Moment> : <Moment format="DD MMM YYYY ">{feedback.date}</Moment>}

                  </Typography>{" "}
                  <i className="far fa-comment" /> - {feedback.message}
                  <br /><br />
                  <Rating value={stars} readOnly />
                </React.Fragment>
              }
            />
            <IconButton edge="end" size="medium" align="right" aria-label="settings"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start" />
        </List>
      </Container >
      <EditFeedMenu anchorAl={anchorEl} feeds={feedback} auth={auth} handleClose={handleClose} />
    </React.Fragment>
  );
}

GetFeeds.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteFeed: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  feed: state.feedback,
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps
)(GetFeeds);
