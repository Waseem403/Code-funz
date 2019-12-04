import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { EditStatus } from "../../../../../actions/profilevisitoraction"
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";


//css classes
const styles = theme => ({
    paper: {
        marginTop: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(7)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        textTransform: "capitalize"
    },
});


class FeedEditForm extends Component {
    state = {
        Edit_StatusComment: this.props.comment.StatusComment,
        CharacterCount: this.props.comment.StatusComment.length,
        errors: {}
    }

    onChange = e => {
        this.setState({
            Edit_StatusComment: e.target.value,
            CharacterCount: e.target.value.length,
            errors: {}
        })
    }

    onSubmit = e => {
        e.preventDefault()
        const { Edit_StatusComment } = this.state
        const { postid, comment } = this.props
        const Edit_Feed_Data = {
            Edit_StatusComment,
            Target_Profile: comment.profile._id
        }
        this.props.EditStatus(Edit_Feed_Data, postid)
    }


    //calling the componentWillReceiveProps
    componentWillReceiveProps(Newprops) {
        if (Newprops.errors) {
            this.setState({ errors: Newprops.errors })
        }

    }

    render() {

        const { state, classes, OpenDrawer, CloseDrawer } = this.props
        const { Edit_StatusComment, CharacterCount, errors } = this.state
        //loader for waiting for the response
        let profileContent;
        //loading when fetching or sending the request to the server.
        profileContent = errors.loading ? (
            <CircularProgress disableShrink style={{ color: "white" }} size={15} />
        ) : (
                ""
            );
        //loading test when fecthing or sending the data,
        let ProfileData = errors.loading ? "updating..." : "update Feed";


        return (
            <SwipeableDrawer
                anchor="bottom"
                height="500"
                open={state}
                onClose={CloseDrawer}
                onOpen={OpenDrawer}
            >
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <EditIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            edit Post forum
                    </Typography>

                        <form className={classes.form} onSubmit={this.onSubmit.bind(this)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-Message"
                                        label="edit post"
                                        autoComplete='off'
                                        required
                                        fullWidth
                                        multiline
                                        rowsMax="10"
                                        value={Edit_StatusComment}
                                        onChange={this.onChange.bind(this)}
                                        margin="normal"
                                        name="Message"
                                        error={errors.Edit_StatusComment === undefined ? false : true}
                                        helperText={errors.Edit_StatusComment === undefined ? `${CharacterCount}/1000` : errors.Edit_StatusComment}
                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {profileContent}{"  "} {ProfileData}

                            </Button>
                            <Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </SwipeableDrawer>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps, {
        EditStatus
    }
)(withStyles(styles)(FeedEditForm));