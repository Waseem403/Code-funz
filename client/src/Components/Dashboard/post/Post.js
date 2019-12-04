import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getPost } from "../../../actions/postActions";
import Footer from "../../Layouts/Footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';





class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;



    let postContent;
    // console.log(post);
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = (
        <div align="center" style={
          {
            marginTop: "130px",
            marginBottom: "130px"
          }
        }>
          <CircularProgress disableShrink size={130} />
        </div>
      );
    } else {
      postContent = (
        <div style={{ marginTop: "50px" }}>
          <PostItem post={post} showActions={false} />
          <CommentFeed postId={post._id} post={post} comments={post.comments} AuthPostUser={post.user} />
          <CommentForm postId={post._id} />
        </div>
      );
    }

    return (
      <React.Fragment>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <br />
          {postContent}
        </Container>
        <Fab color="primary" component={Link} to="/posts" aria-label="add" style={{
          right: '1%',
          bottom: '20%',
          position: 'fixed',
        }}  >
          <ArrowBackIcon />
        </Fab>
        <Footer />
      </React.Fragment>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
