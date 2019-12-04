import React from 'react';
import LatestPollResult from "./LatestPollResult"
import { connect } from "react-redux";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Bar } from 'react-chartjs-2';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Avatar from "@material-ui/core/Avatar";


const useStyles = makeStyles(theme => ({

    card: {
        width: "100%",
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        },

    },
    content: {
        textAlign: "left",
        padding: theme.spacing(3)
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: theme.spacing(5)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
}));



function PollLists(props) {
    const { Polls, auth } = props
    const classes = useStyles();
    let Polls_Data = Polls.find(Poll => {
        if (Poll.UserName === auth.user.name) {
            return Poll
        }
    })

    let Polls_Content = Polls_Data === undefined ? "You have not posted any poll yet" : <LatestPollResult key={Polls_Data._id} Poll={Polls_Data} />


    return (
        <React.Fragment>
            {Polls_Content}
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    {}
)((PollLists));