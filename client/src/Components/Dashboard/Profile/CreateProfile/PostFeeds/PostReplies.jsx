import React, { Component } from 'react';
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FavoriteIcon from "@material-ui/icons/Favorite";
import Moment from "react-moment";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  ReactloveToComment,
  ReactUnloveToComment,
  ReactlikeToComment,
  ReactDislikeToComment
} from "../../../../../actions/profilevisitoraction"
import ReplyMenu from "./ReplyMenu"


const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  actionlove: {
    marginLeft: "10%"
  },
  actionlike: {
    marginLeft: "5%"
  }
});


class PostReplies extends Component {
  constructor() {
    super()
    this.state = {
      anchorRl: null
    }
  }

  //function which triggered on the post menu
  handleClick = event => {
    this.setState({
      anchorRl: event.currentTarget
    })
  }

  //function which triggered off the post menu
  handleClose = () => {
    this.setState({
      anchorRl: null
    })
  }


  //calling the componentWillReceiveProps
  componentWillReceiveProps(Newprops) {
    let error_len = Object.keys(Newprops.errors).length;
    let zero = 0;
    if (error_len === zero) {
      this.setState({
        anchorRl: null
      })
    }
  }





  //function which love the post
  onLoveClick = Love_Info => {
    this.props.ReactloveToComment(Love_Info)
  }

  //function which dislove the post
  onUnloveClick = Love_Info => {
    this.props.ReactUnloveToComment(Love_Info)
  }

  //function which like the post
  onlikeClick = like_Info => {
    this.props.ReactlikeToComment(like_Info)
  }

  //function which dislike the post
  onUnlikeClick = like_Info => {
    this.props.ReactDislikeToComment(like_Info)
  }

  //toggle function between love and unlike post
  findUserLove = Love => {
    const { Reply_id, love } = Love
    const { auth, CurrentTargetProfile, Post_Id, classes } = this.props;
    if (love.filter(love => love.user === auth.user.id).length > 0) {
      return (
        <IconButton size="medium" aria-label="unlove" className={classes.actionlove} onClick={this.onUnloveClick.bind(this, { Reply_id, Post_Id, CurrentTargetProfile })}>
          <FavoriteIcon fontSize="small" color="secondary" />
        </IconButton>
      );
    } else {
      return (
        <IconButton size="medium" aria-label="love" className={classes.actionlove} onClick={this.onLoveClick.bind(this, { Reply_id, Post_Id, CurrentTargetProfile })}>
          <FavoriteIcon fontSize="small" />
        </IconButton>
      );
    }
  }

  //toggle function between like and dislike post
  findUserlike = Like => {
    const { Reply_id, like } = Like
    const { auth, CurrentTargetProfile, classes, Post_Id } = this.props;
    if (like.filter(like => like.user === auth.user.id).length > 0) {
      return (
        <IconButton size="medium" aria-label="unlike" className={classes.actionlike} onClick={this.onUnlikeClick.bind(this, { Reply_id, Post_Id, CurrentTargetProfile })}>
          <ThumbUpIcon fontSize="small" color="primary" />
        </IconButton>
      );
    } else {
      return (
        <IconButton size="medium" aria-label="like" className={classes.actionlike} onClick={this.onlikeClick.bind(this, { Reply_id, Post_Id, CurrentTargetProfile })}>
          <ThumbUpIcon fontSize="small" />
        </IconButton>
      );
    }
  }



  render() {
    const { FeedReply, Post_Id, CurrentTargetProfile, PostFeedAuthUser, classes } = this.props
    const { anchorRl } = this.state
    return (
      <React.Fragment key={FeedReply._id}>
        <List className={classes.root} style={{ paddingLeft: "4%" }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={FeedReply.profile.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={FeedReply.Username}
              secondary={
                <React.Fragment>
                  <i className="fas fa-clock" /> {"  "}{FeedReply.edited ? <Typography variant="caption" gutterBottom>last edited on</Typography> :
                    <Typography variant="caption" gutterBottom>posted on</Typography>} -{" "}
                  {FeedReply.edited ? <Typography variant="caption" gutterBottom><Moment format="DD MMM YYYY ">{FeedReply.editeddate}</Moment></Typography>
                    : <Typography variant="caption" gutterBottom><Moment format="DD MMM YYYY ">{FeedReply.date}</Moment></Typography>}
                  <br />
                  <Typography
                    variant="caption"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {FeedReply.ReplyFeed}
                  </Typography>
                </React.Fragment>
              }
            />
            <IconButton edge="end" size="small" align="right" aria-label="settings"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={this.handleClick.bind(this)}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </ListItem>
          {this.findUserLove({ Reply_id: FeedReply._id, love: FeedReply.love })}
          {"  "}
          {FeedReply.love.length}{" "}
          {this.findUserlike({ Reply_id: FeedReply._id, like: FeedReply.likes })}
          {FeedReply.likes.length}

          <Divider variant="inset" component="li" />
        </List>
        <ReplyMenu anchorRl={anchorRl} Post_Id={Post_Id} CurrentTargetProfile={CurrentTargetProfile} Reply={FeedReply} handleClose={this.handleClose} CurrentReplyUser={FeedReply.user} PostFeedAuthUser={PostFeedAuthUser} />
      </React.Fragment>

    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {
    ReactloveToComment,
    ReactUnloveToComment,
    ReactlikeToComment,
    ReactDislikeToComment
  }
)(withStyles(styles)(PostReplies))