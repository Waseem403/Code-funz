import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Update_educational_details, getEducationDetails } from "../../../../../../../actions/ProfilePosts";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EducationEditForm from "./EducationEditForm"


class EditEducation extends Component {
    state = {}

    componentDidMount() {
        if (this.props.match.params.Education_id) {
            this.props.getEducationDetails(this.props.match.params.Education_id)
        }
    }

    render() {
        const { educationallist } = this.props

        let EducationForm;
        if (educationallist === null) {
            EducationForm = (<div
                align="center"
                style={{ marginTop: "100px", marginBottom: "100px" }}
            >
                <CircularProgress disableShrink size={130} />
            </div>)
        } else {
            EducationForm = <EducationEditForm educationaldetails={educationallist} />

        }

        return (
            <React.Fragment>
                {EducationForm}
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
    educationallist: state.profile.educationaldetails,
});

export default connect(
    mapStateToProps,
    { Update_educational_details, getEducationDetails }
)(withRouter(EditEducation));


