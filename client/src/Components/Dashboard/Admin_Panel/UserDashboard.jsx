import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Header1 from "./DashboardItems/HeaderInfo/Header1"
import Header2 from "./DashboardItems/HeaderInfo/Header2"
import Chart1 from "./DashboardItems/UserChat/Chart1"
import Chart2 from "./DashboardItems/UserChat/Chart2"
import PollResult from "./DashboardItems/PollInfo/PollResult"
import Courses from "./DashboardItems/Courses/Courses"
import Footer from "../../Layouts/Footer"
import LatestPollIndex from "./DashboardItems/PollInfo/LatestPollData/LatestPollIndex"


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

}))
export default function Dashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Container component="main" maxWidth="lg" className={classes.root}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={3} lg={3}>
                        <Header1 />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Header1 />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Header1 />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Header1 />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                        <Chart1 />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Chart2 />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                        <LatestPollIndex />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Courses />
                    </Grid>
                </Grid>
                <Footer />
            </Container>
        </React.Fragment >

    );
}