import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, removeLike } from "../../../actions/postActions";
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';






import EditPost from "./EditPost"



import Moment from 'react-moment';



const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  modalcontainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
});


class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    }
  }


  //opening the menu section with the below function
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  //closing the menu section with the below function
  handleClose = () => {
    this.setState({ anchorEl: null })
  }


  //function which like the post
  onLikeClick = (id) => {
    this.props.addLike(id);
  }

  //function which dislike the post
  onUnlikeClick = (id) => {
    this.props.removeLike(id);
  }

  //toggle function between like and dislike post
  findUserLike = likes => {
    const { auth, post } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return (
        <IconButton size="medium" aria-label="unlike" onClick={this.onUnlikeClick.bind(this, post._id)}>
          <ThumbUpAltIcon fontSize="small" color="primary" />
        </IconButton>
      );
    } else {
      return (
        <IconButton size="medium" aria-label="like" onClick={this.onLikeClick.bind(this, post._id)}>
          <ThumbUpAltIcon fontSize="small" />
        </IconButton>
      );
    }
  }


  //calling the componentWillReceiveProps
  componentWillReceiveProps(Newprops) {
    let error_len = Object.keys(Newprops.errors).length;
    let zero = 0;
    if (error_len === zero) {
      this.setState({
        anchorEl: null
      })
    }

  }

  render() {
    const { post, auth, classes } = this.props
    const { anchorEl } = this.state




    let UserShortName=post.name.charAt(0)

    let Profile_Avatar=post.profile.avatar!==undefined?<Avatar alt="not found" src={post.profile.avatar} className={classes.avatar} />:<Avatar style={{backgroundColor:post.profile.color}} className={classes.small}>{UserShortName}</Avatar>
  

    return (<React.Fragment>
      <List className={
        classes.root
      } >
        <ListItem alignItems="flex-start" >
          <ListItemAvatar >
           {Profile_Avatar}
           </ListItemAvatar >
          <ListItemText primary={post.name}
            secondary={
              <React.Fragment >
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom >
                  <i className="fas fa-clock"
                    color="primary" /> {post.edited ? "last edited on" : "posted on"} -
              {post.edited ? <Moment format="DD MMM YYYY ">{post.editedDate}</Moment> : <Moment format="DD MMM YYYY ">{post.date}</Moment>}
                </Typography>{" "}

                <i className="far fa-comment" /> -{
                  post.text
                } <br />
                {this.findUserLike(post.likes)}
                {post.likes.length}
                {/*function which the reply the post*/}
                {`        `}
                <IconButton size="medium" aria-label="comment" component={Link} to={`/post/${post._id}`} style={{ marginLeft: "5%" }}>
                  <CommentIcon fontSize="small" />
                </IconButton>
                {post.comments.length}

              </React.Fragment>
            }
          />
          {/*calling the menu item here with this button*/}
          <IconButton edge="end" size="medium" align="right" aria-label="settings"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={this.handleClick.bind(this)}
            style={{ marginLeft: "10%" }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </ListItem >

        <Divider variant="inset"
          component="li" />
        <ListItem alignItems="flex-start" />
      </List >

      <EditPost anchorEl={anchorEl} post={post} auth={auth} handleClose={this.handleClose} />


      {/*calling the edit dialog to edit the post*/}



    </React.Fragment>);
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps, {
    addLike,
    removeLike,
  }
)(withStyles(styles)(PostItem));