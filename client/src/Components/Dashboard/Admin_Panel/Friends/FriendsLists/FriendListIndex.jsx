import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Typography from "@material-ui/core/Typography";
import { getCurrentProfile } from "../../../../../actions/profileActions"
import FriendLists from "./FriendLists"
import { withStyles } from "@material-ui/core/styles";
import Footer from "../../../../Layouts/Footer"

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(15),
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(30)
        }
    },

    heading: {
        paddingBottom: theme.spacing(5),
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    progress: {
        marginTop: theme.spacing(10)
    }

});

class FriendListIndex extends Component {
    componentDidMount() {
        this.props.getCurrentProfile()
    }
    render() {
        const { profile, loading } = this.props.profile;
        const { classes } = this.props
        const Zero_Value = 0;


        let Friends_Content
        if (profile == null || loading) {
            Friends_Content = <div align="center" className={classes.progress}>
                <CircularProgress disableShrink size={130} />
            </div>
        }
        else {

            if (Object.keys(profile).length !== Zero_Value) {
                Friends_Content = <FriendLists FriendLists={profile.Followers} />
            }
        }
        return (
            <React.Fragment>
                <Container component="main" maxWidth="md" className={classes.root}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <GroupAddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            friend's list
                     </Typography>
                    </div>
                    {Friends_Content}
                    <Footer />
                </Container>
            </React.Fragment>
        );
    }
}

FriendListIndex.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { getCurrentProfile }
)(withStyles(styles)(FriendListIndex))
