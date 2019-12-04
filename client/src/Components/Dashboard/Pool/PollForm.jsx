import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import {
    connect
} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import EqualizerIcon from '@material-ui/icons/Equalizer';


import { Add_Poll } from "../../../actions/pollaction"

const useStyles = makeStyles(theme => ({
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

}));



function PollForm(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [Question, SetQuestion] = useState("")
    const [Option1, SetOption1] = useState("")
    const [Option2, SetOption2] = useState("")
    const [Option3, SetOption3] = useState("")
    const [Option4, SetOption4] = useState("")
    const [Errors, SetErrors] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    //getting inputs of from the user

    const GetQuestion = e => SetQuestion(e.target.value)
    const GetOption1 = e => SetOption1(e.target.value)
    const GetOption2 = e => SetOption2(e.target.value)
    const GetOption3 = e => SetOption3(e.target.value)
    const GetOption4 = e => SetOption4(e.target.value)

    //submiting the pool
    const SubmitPool = e => {
        e.preventDefault()
        const { user } = props.auth

        const CurrentTime = new Date()
        const Current_Year = CurrentTime.getFullYear();
        const Current_Month = CurrentTime.getMonth() + 1;
        const Current_Date = CurrentTime.getDate() + 2;
        const Remainder_Month = Current_Month < 10 ? `0${Current_Month}` : Current_Month
        const Remainder_Date = Current_Date < 10 ? `0${Current_Date}` : Current_Date
        //2015-03-25T12:00:00Z
        let Remainder_Time = `${Current_Year}-${Remainder_Month}-${Remainder_Date}T22:00:00+05:30`


        const Poll_Data = {
            Question,
            Option1,
            Option2,
            Option3,
            Option4,
            Username: user.name,
            PollRemainderDate: Remainder_Time
        }
        props.Add_Poll(Poll_Data)
    }

    //useeffect to get the response from the server.
    useEffect(() => {
        if (props.errors) {
            SetErrors(props.errors);
        }
        let error_len = Object.keys(props.errors).length;
        let zero = 0;
        if (error_len === zero) {
            SetQuestion("")
            SetOption1("")
            SetOption2("")
            SetOption3("")
            SetOption4("")
            setOpen(false)

        }

    }, [props])


    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                fullScreen
            >
                <Container component="main" maxWidth="lg">
                    <CssBaseline />
                    <DialogTitle id="form-dialog-title" align="center">
                        <Grid align="right">
                            <i
                                className="far fa-times-circle"
                                align="right"
                                style={{ cursor: "pointer" }}
                                onClick={handleClose}
                            />
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <Container component="main" maxWidth="lg">
                            <CssBaseline />
                            <div className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <EqualizerIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Poll forum
                                </Typography>
                                <Typography variant="caption" gutterBottom>
                                    get feedback from audience andd senior developers
                                </Typography>
                                <form className={classes.form} onSubmit={SubmitPool}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} >
                                            <TextField
                                                id="outlined-pool"
                                                label="Add pool"
                                                autoComplete='off'
                                                fullWidth
                                                multiline
                                                rowsMax="10"
                                                value={Question}
                                                onChange={GetQuestion}
                                                margin="normal"
                                                name="pool"
                                                error={Errors.Question === undefined ? false : true}
                                                helperText={Errors.Question}
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <TextField
                                                id="outlined-Option1"
                                                label="Option1"
                                                autoComplete='off'
                                                fullWidth
                                                multiline
                                                rowsMax="10"
                                                value={Option1}
                                                onChange={GetOption1}
                                                margin="normal"
                                                name="Option1"
                                                error={Errors.Option1 === undefined ? false : true}
                                                helperText={Errors.Option1}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <TextField
                                                id="outlined-Option2"
                                                label="Option2"
                                                autoComplete='off'
                                                fullWidth
                                                multiline
                                                rowsMax="10"
                                                value={Option2}
                                                onChange={GetOption2}
                                                margin="normal"
                                                name="Option2"
                                                error={Errors.Option2 === undefined ? false : true}
                                                helperText={Errors.Option2}
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <TextField
                                                id="outlined-Option3"
                                                label="Option3"
                                                autoComplete='off'
                                                fullWidth
                                                multiline
                                                rowsMax="10"
                                                value={Option3}
                                                onChange={GetOption3}
                                                margin="normal"
                                                name="Option3"
                                                error={Errors.Option3 === undefined ? false : true}
                                                helperText={Errors.Option3}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <TextField
                                                id="outlined-Option4"
                                                label="Option4"
                                                autoComplete='off'
                                                fullWidth
                                                multiline
                                                rowsMax="10"
                                                value={Option4}
                                                onChange={GetOption4}
                                                margin="normal"
                                                name="Option4"
                                                error={Errors.Option4 === undefined ? false : true}
                                                helperText={Errors.Option4}
                                                required
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
                                        add a poll
                                    </Button>
                                    <Grid>
                                    </Grid>
                                </form>
                            </div>
                        </Container>
                    </DialogContent>
                </Container>
            </Dialog>
            <Fab color="primary" aria-label="add" style={{
                right: '1%',
                bottom: '20%',
                position: 'fixed',
            }} onClick={handleClickOpen} >
                <AddIcon />
            </Fab>
        </React.Fragment>
    );
}

PollForm.propTypes = {
    Add_Poll: PropTypes.func.isRequired,
    Poll: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    Poll: state.Poll,
    errors: state.errors,
    auth: state.auth
});

export default connect(
    mapStateToProps, {
        Add_Poll
    }
)(PollForm);