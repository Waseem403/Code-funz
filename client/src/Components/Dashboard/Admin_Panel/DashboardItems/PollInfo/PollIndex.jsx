import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import PollIcon from '@material-ui/icons/Poll';


import LatestPollIndex from "./LatestPollData/LatestPollIndex"
import PollResult from "./PollResult"
import Footer from "../../../../Layouts/Footer"
import PollAnalysis from "./PollAnalysis"
import AllPollIndex from "./AllPollData/AllPollIndex"


const useStyles = makeStyles(theme => ({
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
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    },
    paper: {
        marginTop: theme.spacing(-4),
        marginBottom: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
}))


function Pollindex() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Container component="main" maxWidth="lg" className={classes.root}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PollIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        poll results and analysis
                  </Typography>
                </div>
                <Grid container spacing={4}>
                    {/* Chart */}
                    <Grid item xs={12} md={6} lg={6}>
                        <LatestPollIndex />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <PollAnalysis />
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <AllPollIndex />
                    </Grid>
                </Grid>

                <Footer />
            </Container>
        </React.Fragment >
    )
}

export default Pollindex