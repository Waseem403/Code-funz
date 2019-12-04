import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import Avatar from "@material-ui/core/Avatar";

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
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        textAlign: 'right'
    },
    heading: {
        fontWeight: "bold",
        textAlign: 'center'
    },
    pos: {
        marginBottom: 12,
    },
    progress: {

        color: 'red',

    },
    progress_section: {
        marginTop: theme.spacing(2)
    },
    percentage: {
        paddingLeft: theme.spacing(25),
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(43)
        },
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
}))

function Courses() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <Card className={classes.card}>

            <CardContent className={classes.content}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}> <ImportantDevicesIcon /> </Avatar>
                    <Typography component="h1" variant="h5">courses analysis</Typography>
                </div>
                <div className={classes.progress_section}>
                    <span >javascript</span>
                    <span className={classes.percentage}>20%</span>
                    <LinearProgress variant="determinate" className={classes.progress} value={100} />
                </div>

                <div className={classes.progress_section}>

                    <span >javascript</span>
                    <span className={classes.percentage}>20%</span>
                    <LinearProgress variant="determinate" className={classes.progress} value={100} />
                </div>
                <div className={classes.progress_section}>

                    <span >javascript</span>
                    <span className={classes.percentage}>20%</span>
                    <LinearProgress variant="determinate" className={classes.progress} value={100} />
                </div>
                <div className={classes.progress_section}>

                    <span >javascript</span>
                    <span className={classes.percentage}>20%</span>
                    <LinearProgress variant="determinate" className={classes.progress} value={100} />
                </div>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default Courses