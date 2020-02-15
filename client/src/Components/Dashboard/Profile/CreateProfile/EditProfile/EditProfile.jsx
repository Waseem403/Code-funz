import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getCurrentProfile } from "../../../../../actions/profileActions"
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import CreateProfile from "./CreateProfile"




class EditProfile extends Component {
    state = {}

    componentDidMount() {
        this.props.getCurrentProfile()
    }


    render() {
        const { profile, loading } = this.props.profile
    
        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = (
                <div
                    align="center"
                    style={{ marginTop: "100px", marginBottom: "100px" }}
                >
                    <CircularProgress disableShrink size={130} />
                </div>
            );
        } else {
            dashboardContent = (<CreateProfile profile={profile} />)

        }

        return (
            <React.Fragment>
                <Container component="main" maxWidth="lg">
                    <CssBaseline />
                    {dashboardContent}
                </Container>
            </React.Fragment>
        );
    }
}


EditProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getCurrentProfile }
)(EditProfile);