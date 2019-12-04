import React, {
  useEffect
} from "react";

import PropTypes from "prop-types";
import {
  connect
} from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  getPosts
} from "../../../actions/postActions";
import Footer from "../../Layouts/Footer";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles
} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  H1: {
    paddingTop: theme.spacing(15),
  },
}));

function Posts(props) {
  const classes = useStyles();


  //useeffect to load all details from the function.
  useEffect(() => {
    props.getPosts();
  }, [])
  //Loading the data and displaying.
  const {
    posts,
    loading
  } = props.post;

  let postContent;

  if (posts === null || loading) {
    postContent = (<
      div align="center"
      style={
        {
          marginTop: "130px",
          marginBottom: "130px"
        }
      } >
      <
        CircularProgress disableShrink size={
          130
        }
      />
    </div >
    );
  } else {
    postContent = < PostFeed posts={
      posts
    }
    />;
  }





  return (
    <React.Fragment >
      <Container >
        <CssBaseline />
        <Typography component="h1" align="center" className={classes.H1} variant="h4" >
          Queries and comment section
          </Typography>
        <Grid container spacing={2} >
          <Grid item xs={12} > {postContent} </Grid>
          <Grid item xs={12} > < PostForm /> </Grid>
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  )

}



Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps, {
    getPosts
  }
)(Posts);