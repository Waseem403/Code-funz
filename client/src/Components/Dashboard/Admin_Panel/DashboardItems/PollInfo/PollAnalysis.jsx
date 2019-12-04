import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Bar } from 'react-chartjs-2';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import { Doughnut } from 'react-chartjs-2';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import { Get_Polls } from "../../../../../actions/pollaction"


const useStyles = makeStyles(theme => ({

    card: {
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
}));

function PollAnalysis(props) {
    const classes = useStyles();
    const { Polls, loading, } = props.Poll


    useEffect(() => {
        props.Get_Polls()
    }, [])



    const data = {
        labels: [
            `Total:${Polls.length}`,
            `results:${12}`,
            `data:${12}`
        ],
        datasets: [{
            data: [3, 4, 5],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };




    let PollContent;
    if (Polls === null || loading) {
        PollContent = (
            <div align="center" style={{ marginTop: "130px", marginBottom: "130px" }} >
                <CircularProgress disableShrink size={130} />
            </div >
        );
    } else {
        PollContent = <Container component="main" maxWidth="lg" className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}> <EqualizerIcon /> </Avatar>
                        <Typography component="h1" variant="h5">overall-Poll analysis</Typography>
                    </div>
                    <Doughnut height={260} data={data} />
                </CardContent>
            </Card>
        </Container>
    }

    return (
        <React.Fragment>
            {PollContent}
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    Poll: state.Poll,
    errors: state.errors,
});

export default connect(
    mapStateToProps, {
        Get_Polls
    }
)(PollAnalysis);