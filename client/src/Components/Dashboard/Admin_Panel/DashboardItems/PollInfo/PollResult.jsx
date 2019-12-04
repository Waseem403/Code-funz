import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Bar } from 'react-chartjs-2';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(30)
        },
    },
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
}));

function PollResult() {
    const classes = useStyles();

    const data = {
        labels: ['poll1', 'poll2', 'poll3', 'poll4'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 100]
            }
        ]
    };
    return (
        <Container component="main" maxWidth="lg" className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography component="h2" variant="h6" align="center"> latest poll analysis</Typography>
                    <Bar
                        data={data}
                        width={200}
                        height={200}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </CardContent>
            </Card>

        </Container>
    )
}

export default PollResult