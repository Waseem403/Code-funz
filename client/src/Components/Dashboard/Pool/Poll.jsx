import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Get_Polls } from "../../../actions/pollaction"
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Avatar from "@material-ui/core/Avatar";




import PollForm from "./PollForm"
import PollLists from "./PollLists"
import Footer from "../../Layouts/Footer"

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(15)
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
});



class Poll extends Component {
    state = {}

    componentDidMount() {
        this.props.Get_Polls()
    }

    render() {
        const { Polls, loading, } = this.props.Poll
        const { classes } = this.props
        let PollContent;
        if (Polls === null || loading) {
            PollContent = (
                <div align="center" style={{ marginTop: "130px", marginBottom: "130px" }} >
                    <CircularProgress disableShrink size={130} />
                </div >
            );
        }
        else {
            if(Polls.length===0)
            {
             PollContent= <Typography color="error" component="h1" style={{paddingTop:"40px"}} align='center' variant="h5">
                                 <b>There are no polls exists currently to display.</b>
                                </Typography>
            }
            else
            {
                PollContent = <PollLists Polls={Polls} />
            }
        }
        return (
            <React.Fragment >
                <Container component="main" maxWidth="lg" className={classes.root}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <EqualizerIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Poll forum
                                </Typography>
                        <Typography variant="caption" gutterBottom>
                            get advice from audience and senior developers
                                </Typography>
                    </div>

                    <Grid container spacing={2} >
                        <Grid item xs={12} > {PollContent} </Grid>
                        <Grid item xs={12} > <PollForm /> </Grid>
                    </Grid>
                </Container>
                <Footer />
            </React.Fragment>
        );
    }
}



const mapStateToProps = state => ({
    Poll: state.Poll,
    errors: state.errors,
});

export default connect(
    mapStateToProps, {
        Get_Polls
    }
)(withStyles(styles)(Poll));