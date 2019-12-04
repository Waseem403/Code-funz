import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { OtherUseraddCommentToFeed } from "../../../../../actions/profilevisitoraction"
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";



const useStyles = makeStyles(theme => ({
    submitbtn: {
        textTransform: 'capitalize'
    },
}))



function ReplyForm(props) {
    const { feeds } = props
    const classes = useStyles();
    const [postReplies, SetReplies] = React.useState("");
    const [CharacterCount, SetCharacterCount] = useState(0)
    const [errors, seterrors] = useState({})


    //handling replies requests
    function HandleInputs(e) {
        SetReplies(e.target.value);
        SetCharacterCount(e.target.value.length)
        seterrors({})
    }

    //submitting the replies to the desire post
    const HandleSubmit = e => {
        e.preventDefault();
        const { user } = props.auth
        const Feed_id = feeds._id
        const Replies = {
            Username: user.name,
            ReplyFeed: postReplies,
            Targetprofile: feeds.profile._id
        };

        props.OtherUseraddCommentToFeed(Feed_id, Replies);
    };

    //useeffect which check for errors and updates
    useEffect(() => {
        if (props.errors) {
            seterrors(props.errors)
        }
        let error_len = Object.keys(props.errors).length;
        let zero = 0;
        if (error_len === zero) {
            SetReplies("")
            SetCharacterCount(0)
        }
    }, [props])


    //loader for waiting for the response
    let ReplyLoader;
    //loading when fetching or sending the request to the server.
    ReplyLoader = errors.loading ? <CircularProgress disableShrink style={{ color: "white" }} size={15} /> : null


    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <form onSubmit={HandleSubmit}>
                <Grid container  >
                    <Grid item xs={12}>
                        <TextField
                            id="Reply"
                            label="Reply comment"
                            value={postReplies}
                            onChange={HandleInputs}
                            margin="normal"
                            fullWidth
                            multiline
                            row="6"
                            variant="outlined"
                            required
                            error={errors.Reply === undefined ? false : true}
                            helperText={errors.Reply === undefined ? `${CharacterCount}/1000` : errors.Reply}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Button
                            type="submit"
                            color="primary"
                            size="small"
                            variant="contained"
                            className={classes.submitbtn}>
                            {ReplyLoader}  Reply
                </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )

}


const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { OtherUseraddCommentToFeed }
)(ReplyForm);