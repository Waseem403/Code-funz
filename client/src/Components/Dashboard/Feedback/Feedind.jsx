import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Footer from "../../Layouts/Footer";
import { getFeeds } from "../../../actions/feedbackaction";
import Feedback from "./Feedback";
import Feedfunc from "./Feedfunc";
import Starrating from "./Starrating";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from '@material-ui/icons/Error';



class Feedind extends Component {
  state = {};

  componentDidMount() {
    this.props.getFeeds();
  }

  render() {
    const { feedbacks, loading } = this.props.feedbacks;
    const { profile, loading1 } = this.props.profile;
    let FeedContent;
    var Starratings;
    if (feedbacks === null || loading || loading1) {
      FeedContent = (
        <div align="center">
          <CircularProgress disableShrink size={80} />
        </div>
      );
    } else {
      if(feedbacks.length===0)
      {
        FeedContent=<Typography color="error" component="h1" style={{paddingTop:"40px"}} align='center' variant="h5">
        <b><ErrorIcon fontSize="medium"/> There are no feedbacks exists currently to display.</b>
       </Typography>
      }
      else
      {
        FeedContent = <Feedfunc feedbacks={feedbacks} profile={profile} />;
      Starratings = <Starrating feed={feedbacks} />;
      }
    }

    return (
      <React.Fragment>
        <Feedback />

        {Starratings}
        {FeedContent}
        <Footer />
      </React.Fragment>
    );
  }
}
Feedind.propTypes = {
  getFeeds: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  feedbacks: state.feedback,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getFeeds }
)(Feedind);
