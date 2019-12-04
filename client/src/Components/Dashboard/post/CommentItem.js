import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  ReplyaddLike,
  ReplyremoveLike,
  deleteComment
} from "../../../actions/postActions";
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Moment from 'react-moment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import EditMenu from "./EditMenu"

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(8)
  },
  inline: {
    display: 'inline',
  },
  margin: {
    margin: theme.spacing(2),
    marginRight: theme.spacing(3),
    cursor: 'pointer'
  },
  padding: {
    padding: theme.spacing(0, 1),
  },
  deletebtn: {
    paddingLeft: "5%",
    cursor: 'pointer'
  }
}));

function CommentItem(props) {
  const classes = useStyles();
  const { comment, post, AuthPostUser, auth } = props;
  const [anchorEl, setAnchorEl] = useState(false)


  //opening the menu section with the below function
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

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

  //function which like the post
  const onLikeClick = () => {
    let LikesInfo = {
      PostId: props.post._id,
      ReplyId: props.comment._id
    };

    props.ReplyaddLike(LikesInfo);
  }
  //function which dislike the post
  const onUnlikeClick = () => {
    let UnLikesInfo = {
      PostId: props.post._id,
      ReplyId: props.comment._id
    };
    props.ReplyremoveLike(UnLikesInfo);
  }

  //toggle function between like and dislike post
  const findUserLike = likes => {
    const { auth } = props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return (
        <IconButton size="medium" aria-label="unlike" onClick={onUnlikeClick}>
          <ThumbUpAltIcon fontSize="small" color="primary" />
        </IconButton>
      );
    } else {
      return (
        <IconButton size="medium" aria-label="like" onClick={onLikeClick}>
          <ThumbUpAltIcon fontSize="small" />
        </IconButton>
      );
    }
  }



  return (
    <React.Fragment>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Not found" src={comment.profile.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={comment.name}
            secondary={
              <React.Fragment>
                <Typography
                  variant="caption" display="block" gutterBottom
                >
                  <i className="fas fa-clock" />{comment.edited ? "last edited on" : "posted on"} -{" "}
                  {comment.edited ? <Moment format="DD MMM YYYY ">{comment.editeddate}</Moment> : <Moment format="DD MMM YYYY ">{comment.date}</Moment>}
                </Typography>{" "}

                <i className="far fa-comment" /> - {comment.text}
                <br />
                {findUserLike(comment.likes)}
                {comment.likes.length}
                {/*function which the reply the post*/}

              </React.Fragment>
            }
          />
          {/*calling the menu item here with this button*/}
          <IconButton edge="end" size="medium" align="right" aria-label="settings"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{ marginLeft: "10%" }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </ListItem>

        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start" />
      </List>
      <EditMenu anchorA1={anchorEl} postid={post._id} MainPost_Id={AuthPostUser} comment={comment} auth={auth} handleClose={handleClose} />
    </React.Fragment>
  );
}





CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { ReplyaddLike, ReplyremoveLike, deleteComment }
)(CommentItem);