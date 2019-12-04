import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getExperienceDetails } from "../../../../../../../actions/ProfilePosts";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExperienceEditForm from "./ExperienceEditForm"


class EditExperience extends Component {
    state = {}



    componentWillMount() {
        this.props.getExperienceDetails(this.props.match.params.Experience_handler)

    }

    render() {
        const { experiencedetails } = this.props

        let Experience_Form;
        if (experiencedetails === null) {
            Experience_Form = (<div
                align="center"
                style={{ marginTop: "15%", marginBottom: "20%" }}
            >
                <CircularProgress disableShrink size={130} />
            </div>)
        } else {
            Experience_Form = <ExperienceEditForm experienceddetails={experiencedetails} />
        }


        return (
            <React.Fragment>
                {Experience_Form}
                <Fab color="primary" size="small" component={Link} to="/Getyourprofile" aria-label="add" style={{
                    right: '1%',
                    bottom: '20%',
                    position: 'fixed',
                }}  >
                    <ArrowBackIcon />
                </Fab>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    experiencedetails: state.profile.experiencedetails,
});

export default connect(
    mapStateToProps,
    { getExperienceDetails }
)(withRouter(EditExperience));


