import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Moment from "react-moment";
import Divider from "@material-ui/core/Divider";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Delete_educational_details, Delete_experience_details } from "../../../../actions/ProfilePosts"
import Tooltip from '@material-ui/core/Tooltip';



const useStyles = theme => ({
  modalcontainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  submitbtn:
    {
      marginTop: theme.spacing(3),
      textTransform: 'capitalize'
    }
});


class ProfileCreds extends Component {

  state = {
    expanded: false,
  };



  //deleting the educational details one by one.
  onClickDeleteEducationallist = education_id => {
    this.props.Delete_educational_details(education_id)
  }

  onClickDeleteExperiencelist = Experience_id => {
    this.props.Delete_experience_details(Experience_id)
  }





  render() {
    const { education, experience } = this.props


    const expItems = experience.map(exp => (
      <React.Fragment>
        <ExpansionPanelDetails >
          <Tooltip placement="top" title="edit">
            <IconButton aria-label="eidt" style={{ marginLeft: "90%" }} size="small" component={Link} to={`/EditExperience/${exp._id}`}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="delete">
            <IconButton aria-label="delete" size="small" onClick={this.onClickDeleteExperiencelist.bind(this, exp._id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography variant="caption" gutterBottom>
            <b>company name : </b> {exp.company}{" "}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography variant="caption" display="block" gutterBottom>
            <Moment format="DD MMM YYYY">{exp.from}</Moment> -
          {exp.to === null ? (
              " Now"
            ) : (
                <Moment format="DD MMM YYYY">{exp.to}</Moment>
              )}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography variant="caption" display="block" gutterBottom>
            <b> Position: </b> {exp.title}{" "}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography variant="caption" display="block" gutterBottom>
            {exp.location === "" ? null : (
              <span>
                <b> Location: </b> {exp.location}{" "}
              </span>
            )}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography variant="caption" display="block" gutterBottom>
            {exp.description === "" ? null : (
              <span>
                <b> Description: </b> {exp.description}{" "}
              </span>
            )}
          </Typography>
        </ExpansionPanelDetails>
        <Divider />
      </React.Fragment>
    ));

    const eduItems = education.map(edu => (
      <React.Fragment>
        <ExpansionPanelDetails >
          <Tooltip placement="top" title="edit">
            <IconButton aria-label="eidt" style={{ marginLeft: "90%" }} size="small" component={Link} to={`/EditEducation/${edu._id}`}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="delete">
            <IconButton aria-label="delete" size="small" onClick={this.onClickDeleteEducationallist.bind(this, edu._id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails >
          <Typography variant="caption" gutterBottom>
            <b>school name : </b> {edu.school}{" "}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography variant="caption" display="block" gutterBottom>
            <b>Course duration : </b>  <Moment format="DD MMM YYYY">{edu.from}</Moment> -
          {edu.to === null ? (
              " Now"
            ) : (
                <Moment format="DD MMM YYYY">{edu.to}</Moment>
              )}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography variant="caption" display="block" gutterBottom>
            <b> Degree: </b> {edu.degree}{" "}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography variant="caption" display="block" gutterBottom>
            <b> Field Of Study: </b> {edu.fieldofstudy}{" "}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography variant="caption" display="block" gutterBottom>
            {edu.description === "" ? null : (
              <span>
                <b> Description: </b> {edu.description}{" "}
              </span>
            )}
          </Typography>
        </ExpansionPanelDetails>
        <Divider />
      </React.Fragment>
    ));

    return (
      <div>
        {eduItems.length > 0 ? (
          <ExpansionPanel square
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography variant="subtitle2" gutterBottom>
                {" "}
                <i className="fas fa-user-graduate" /> <b>education details</b>{" "}
              </Typography>
            </ExpansionPanelSummary>
            {eduItems}
          </ExpansionPanel>
        ) : (
            <ExpansionPanel
              square
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="subtitle2" gutterBottom>
                  {" "}
                  <i className="fas fa-user-graduate" /> <b>education details</b>{" "}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="caption" gutterBottom>
                  <b> details not listed</b>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}

        {expItems.length > 0 ? (
          <ExpansionPanel
            square
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography variant="subtitle2" gutterBottom>
                {" "}
                <i className="fas fa-briefcase" /> <b>professional details</b>{" "}
              </Typography>
            </ExpansionPanelSummary>
            {expItems}
          </ExpansionPanel>
        ) : (
            <ExpansionPanel
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography variant="subtitle2" gutterBottom>
                  {" "}
                  <i className="fas fa-briefcase" /> <b>professional details</b>{" "}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="caption" gutterBottom>
                  <b>details not listed</b>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}
      </div>
    );

  }
}


const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { Delete_educational_details, Delete_experience_details }
)(withStyles(useStyles)(withRouter(ProfileCreds)));