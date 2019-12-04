import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { addCommentToFeed, Reactlove, ReactUnlove, Reactlike, ReactDislike, DeleteFeed } from "../../../../../actions/profilefeedsaction"
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Moment from "react-moment";
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Tooltip from '@material-ui/core/Tooltip';

import FeedRepliesList from "./FeedRepliesList"
import ReplyForm from "./ReplyForm"
import PostListMenu from "./PostListMenu"


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  card: {
    maxWidth: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  submit: {
    textTransform: 'capitalize'
  },
  actionbtn: {
    marginLeft: "5%"
  }
}));

function PostLists(props) {
  const { feeds, profile } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);




  //useeffect which check for errors and updates
  useEffect(() => {
    let error_len = Object.keys(props.errors).length;
    let zero = 0;
    if (error_len === zero) {
      setAnchorEl(null)
    }
  }, [props])


  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleExpandClick() {
    setExpanded(!expanded);
  }



  //function which love the post
  const onLoveClick = Love_Info => {
    props.Reactlove(Love_Info);
  }

  //function which dislove the post
  const onUnloveClick = Love_Info => {

    props.ReactUnlove(Love_Info);
  }


  //function which love the post
  const onLikeClick = Love_Info => {
    props.Reactlike(Love_Info);
  }

  //function which dislove the post
  const onDislikeClick = Love_Info => {
    props.ReactDislike(Love_Info);
  }


  //toggle function between love and dislove post
  const findUserLove = love => {
    const { auth, feeds } = props;
    if (love.filter(love => love.user === auth.user.id).length > 0) {
      return (
        <IconButton size="medium" aria-label="unlove" onClick={onUnloveClick.bind(this, { feed_id: feeds._id, targetprofile: feeds.profile._id })}>
          <FavoriteIcon fontSize="small" color="secondary" />
        </IconButton>
      );
    } else {
      return (
        <IconButton size="medium" aria-label="love" onClick={onLoveClick.bind(this, { feed_id: feeds._id, targetprofile: feeds.profile._id })}>
          <FavoriteIcon fontSize="small" />
        </IconButton>
      );
    }
  }

  //toggle function between like and dislike post
  const findUserLike = like => {
    const { auth, feeds } = props;
    if (like.filter(like => like.user === auth.user.id).length > 0) {
      return (
        <IconButton size="medium" aria-label="unlike" className={classes.actionbtn} onClick={onDislikeClick.bind(this, { feed_id: feeds._id, targetprofile: feeds.profile._id })}>
          <ThumbUpIcon fontSize="small" color="primary" />
        </IconButton>
      );
    } else {
      return (
        <IconButton size="medium" aria-label="love" className={classes.actionbtn} onClick={onLikeClick.bind(this, { feed_id: feeds._id, targetprofile: feeds.profile._id })}>
          <ThumbUpIcon fontSize="small" />
        </IconButton>
      );
    }
  }


  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              src={profile.avatar}
              className={classes.avatar}
            />
          }
          action={
            <IconButton
              aria-label="settings"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={profile.user.name}
          subheader={<React.Fragment>
            {feeds.edited ? <Typography variant="caption" gutterBottom>last edited on </Typography> : <Typography variant="caption" gutterBottom>posted on </Typography>} -
           <Typography variant="caption" gutterBottom> {feeds.edited ? <Moment format="DD MMM YYYY ">{feeds.editedDate}</Moment> : <Moment format="DD MMM YYYY ">{feeds.date}</Moment>}</Typography>
          </React.Fragment>}
        />
        {feeds.PostImgURL === null ? null : (
          <CardMedia
            className={classes.media}
            image={feeds.PostImgURL}
            title="post media"
          />
        )}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {feeds.StatusComment}
          </Typography>
        </CardContent>
        <CardActions >
          {findUserLove(feeds.love)}
          {"  "}
          {feeds.love.length}
          {findUserLike(feeds.likes)}
          {feeds.likes.length}
          <Tooltip title={"add comment"} placement="top">
            <IconButton aria-label="comments" onClick={handleExpandClick}
              aria-expanded={expanded} size="medium" className={classes.actionbtn}>
              <CommentIcon fontSize="small" />
            </IconButton>
          </Tooltip>{" "}
          {feeds.comments.length}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <PostListMenu anchorEl={anchorEl} Feeds={feeds} handleClose={handleClose} Feed_Id={feeds._id} />


        <Collapse in={expanded} timeout="auto">
          <CardContent>
            <FeedRepliesList Replies={feeds.comments} Post_Id={feeds._id} CurrentTargetProfile={feeds.profile._id} PostFeedAuthUser={feeds.user} />
            <ReplyForm feeds={feeds} />
          </CardContent>
        </Collapse>
      </Card>
      <br />
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { addCommentToFeed, Reactlove, ReactUnlove, Reactlike, ReactDislike, DeleteFeed }
)(PostLists);
