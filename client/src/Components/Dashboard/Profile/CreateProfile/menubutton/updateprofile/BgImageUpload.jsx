import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import 'firebase/storage';  // If using Firebase storage
import FileUploader from "react-firebase-file-uploader";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
    Upload_Bg_Image, getCurrentProfile
} from "../../../../../../actions/profileActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Footer from "../../../../../Layouts/Footer"
import CameraIcon from '@material-ui/icons/Camera';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';



const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    root: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(30)
        },
    },
    paper1: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: theme.spacing(5),
        width: "100%"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        textTransform: "capitalize"
    },

});

class UploadImg extends Component {

    constructor() {
        super();
        this.state = {
            avatar: "",
            isUploading: false,
            progress: 0,
            avatarURL: "",
            disabled: true,
            BgProgress: 0,
            BgDisabled: true,
            BgImageURL: "",
            errors: {}
        };
        this.Bgonsubmit = this.Bgonsubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }







    //below function are the background image 

    handleUploadStartBgImage = () => this.setState({ isUploading: true, BgProgress: 0 });

    handleProgressBgImage = BgProgress => {
        this.setState({ BgProgress });
        if (BgProgress === 100) {
            this.setState({ BgDisabled: false })
        }
    }

    handleUploadErrorBgImage = error => {
        this.setState({ isUploading: false });
    };


    handleUploadSuccessBgImage = filename => {
        this.setState({ avatar: filename, BgProgress: 100, isUploading: false });
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ BgImageURL: url }));
    };


    Bgonsubmit = e => {
        const { user } = this.props.auth;
        e.preventDefault();
        const Bg_Image = {
            BgImage: this.state.BgImageURL,
            name: user.name
        };
        this.props.Upload_Bg_Image(Bg_Image, this.props.history);
    };





    render() {
        const { profile, loading } = this.props.profile;
        const { classes } = this.props
        const { BgDisabled } = this.state

        let bgloader;
        if (profile === null || loading) {
            bgloader = (
                <div
                    align="center"
                    style={{ marginTop: "100px", marginBottom: "100px" }}
                >
                    <CircularProgress disableShrink size={130} />
                </div>
            );
        } else {
            bgloader = <img src={profile.BgImage} alt="not loaded." style={{ width: "100%" }} />;
        }

        let submitloader = this.props.errors.loading ? (
            <CircularProgress disableShrink style={{ color: "white" }} size={15} />
        ) : null
        let submittext = this.props.errors.loading ? "uploading..." : "bg image picture"


        return (
            <React.Fragment>
                <Container component="main" maxWidth="md" className={classes.root}>
                    <CssBaseline />
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <div className={classes.paper1}>
                                <Avatar className={classes.avatar}>
                                    <CameraIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    background image
                               </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    uploade backgound image from here.
                              </Typography>
                                <form className={classes.form} onSubmit={this.Bgonsubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} align="center">
                                            <Button
                                                style={{
                                                    textTransform: "capitalize",
                                                }}
                                                size="small"
                                                component="label"
                                            >
                                                {bgloader}
                                                <FileUploader
                                                    accept="image/*"
                                                    name="avatar"
                                                    randomizeFilename
                                                    storageRef={firebase.storage().ref("images")}
                                                    onUploadStart={this.handleUploadStartBgImage}
                                                    onUploadError={this.handleUploadErrorBgImage}
                                                    onUploadSuccess={this.handleUploadSuccessBgImage}
                                                    onProgress={this.handleProgressBgImage}
                                                    required
                                                    style={{ display: "none" }}
                                                />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={this.state.BgProgress}
                                            />

                                            <Typography variant="caption" align="left" gutterBottom>
                                                {this.state.BgProgress === 100
                                                    ? "completed"
                                                    : this.state.BgProgress + "%"}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} align="center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                type="submit"
                                                disabled={BgDisabled}
                                                className={classes.submit}
                                            >
                                                {submitloader} {" "}  {submittext}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
                <Fab color="primary" size="small" component={Link} to="/getyourprofile" aria-label="add" style={{
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

UploadImg.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    Upload_Bg_Image: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { Upload_Bg_Image, getCurrentProfile }
)(withStyles(styles)(UploadImg));