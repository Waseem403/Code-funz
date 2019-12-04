import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Bar } from 'react-chartjs-2';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Avatar from "@material-ui/core/Avatar";
import Grid from '@material-ui/core/Grid';



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
        marginBottom: theme.spacing(1)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },

    viewmore: {
        textTransform: "capitalize",
        "&:hover": {
            color: theme.palette.primary.main
        },
    }
}));

function LatestPollResult(props) {
    const classes = useStyles();
    const { Poll } = props
    const { auth } = props

    let Poll1_Data = Poll.Option1PollInfo.length !== 0 ? Poll.Option1PollInfo.length : 0
    let Poll2_Data = Poll.Option2PollInfo.length !== 0 ? Poll.Option2PollInfo.length : 0
    let Poll3_Data = Poll.Option3PollInfo.length !== 0 ? Poll.Option3PollInfo.length : 0
    let Poll4_Data = Poll.Option4PollInfo.length !== 0 ? Poll.Option4PollInfo.length : 0

    const data = {
        labels: [Poll.Option1, Poll.Option2, Poll.Option3, Poll.Option4],
        datasets: [
            {
                label: 'your latest poll',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [Poll1_Data, Poll2_Data, Poll3_Data, Poll4_Data]
            }

        ]
    };

    const LatestPollResult = Poll.UserName === auth.user.name ? <Card className={classes.card}>
        <CardContent className={classes.content}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}> <EqualizerIcon /> </Avatar>
                <Typography component="h1" variant="h6">last Poll results & analysis</Typography>
            </div>
            <Typography variant="caption" gutterBottom>Q.{Poll.Question}</Typography>
            <Bar data={data} />

        </CardContent>
        <CardActions>
            <Grid container>
                <Grid items xs={12} align="right">
                    <Button size="small" component={Link} to="/PollIndex" className={classes.viewmore}>see more</Button>
                </Grid>
            </Grid>
        </CardActions>
    </Card> : null

    return (
        <React.Fragment>
            {LatestPollResult}
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
)((LatestPollResult));