import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import clsx from 'clsx';
import Hidden from "@material-ui/core/Hidden";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MessageIcon from '@material-ui/icons/Message';
import InboxIcon from "@material-ui/icons/MoveToInbox";


import Drawer from '@material-ui/core/Drawer';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import WidgetsIcon from '@material-ui/icons/Widgets';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';






const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "white",
        "&:hover": {
            backgroundColor: "white"
        },

    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        textTransform: "capitalize",
        color: "black",
        textDecoration: "none"
    },
    links: {
        textTransform: "capitalize",
        color: "black",
        textDecoration: "none"
    },
    root1: {
        marginLeft: theme.spacing(25),
        marginTop: theme.spacing(15)
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },


    rootlist: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    button: {
        boxShadow: "0 8px 40px -12px rgba(0,0,0,50)",
        textTransform: 'capitalize',
        wordSpacing: '1px',
        fontSize: "10px",
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    viewall: {
        textDecoration: "none",
    }
}));








function UserDashboardNav(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openlist, setlistOpen] = React.useState(false);
    const [openwidget, setwidgetOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);


    useEffect(() => {
        Get_Current_URLPath_Name()
    }, [props])


    const handleClickNotification = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = () => {
        setlistOpen(!openlist);
    };
    const handleClickWidget = () => {
        setwidgetOpen(!openwidget);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    let Dashboard_Menu
    const Get_Current_URLPath_Name = () => {
        return window.location.pathname === "/UserDashboard"
            || window.location.pathname === "/Todos"
            || window.location.pathname === "/PollIndex"
            || window.location.pathname === "/Profilepic"
            || window.location.pathname === "/Education"
            || window.location.pathname === "/Experience"
            || window.location.pathname === "/Experience"
            || window.location.pathname === "/edit-profile"
            || window.location.pathname === "/bgimage"
            ? Dashboard_Menu = (
                <div className={classes.root1}>
                    <Hidden xsDown>
                        <CssBaseline />
                        <AppBar position="fixed" color="inherit" className={clsx(classes.appBar, open && classes.appBarShift)}>
                            <Toolbar className={classes.toolbar}>
                                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                                    Dashboard
                              </Typography>
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            className={classes.drawer}
                            variant="permanent"
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            anchor="left"
                        >
                            <div className={classes.toolbar} />

                            <List className={classes.rootlist}>
                                <ListItem button key={"UserDashboard"} component={Link} to="/UserDashboard">
                                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                                    <ListItemText secondary={"UserDashboard"} />
                                </ListItem>

                                <ListItem button onClick={handleClick} key={"profile"}>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText secondary="profile" />
                                    {openlist ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={openlist} unmountOnExit>
                                    <List component="div" dense>
                                        <ListItem button key={"edit-profile"} className={classes.nested} component={Link} to="/edit-profile">
                                            <ListItemIcon>
                                                <i class="fas fa-user-edit"></i>
                                            </ListItemIcon>
                                            <ListItemText secondary="edit profile" />
                                        </ListItem>
                                        <ListItem button key={"Education"} className={classes.nested} component={Link} to="/Education">
                                            <ListItemIcon>
                                                <i class="fas fa-graduation-cap"></i>
                                            </ListItemIcon>
                                            <ListItemText secondary="add education" />
                                        </ListItem>
                                        <ListItem button key={"Experience"} className={classes.nested} component={Link} to="/Experience">
                                            <ListItemIcon>
                                                <i class="fas fa-user-tie"></i>
                                            </ListItemIcon>
                                            <ListItemText secondary="add experience" />
                                        </ListItem>
                                        <ListItem button key={"Profilepic"} className={classes.nested} component={Link} to="/Profilepic">
                                            <ListItemIcon>
                                                <i class="fas fa-camera"></i>
                                            </ListItemIcon>
                                            <ListItemText secondary="profile picture" />
                                        </ListItem>
                                        <ListItem button key={"bgimage"} className={classes.nested} component={Link} to="/bgimage">
                                            <ListItemIcon>
                                                <i class="fas fa-image"></i>
                                            </ListItemIcon>
                                            <ListItemText secondary="bg profile" />
                                        </ListItem>
                                    </List>
                                </Collapse>


                                <ListItem button key={"PollIndex"} component={Link} to="/PollIndex">
                                    <ListItemIcon><InboxIcon /></ListItemIcon>
                                    <ListItemText secondary={"Polls"} />
                                </ListItem>
                            </List>

                            <ListItem button onClick={handleClickWidget} >
                                <ListItemIcon>
                                    <WidgetsIcon />
                                </ListItemIcon>
                                <ListItemText secondary="widget" />
                                {openwidget ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openwidget} unmountOnExit>
                                <List component="div" dense>
                                    <ListItem button className={classes.nested} key={"Todos"} component={Link} to="/Todos">
                                        <ListItemIcon>
                                            <i class="far fa-sticky-note"></i>
                                        </ListItemIcon>
                                        <ListItemText secondary={"sticky notes"} />
                                    </ListItem>
                                    <ListItem button className={classes.nested} key={"todolist"} component={Link} to="/todolist">
                                        <ListItemIcon>
                                            <i class="fas fa-clipboard-list"></i>
                                        </ListItemIcon>
                                        <ListItemText secondary={"todo-list"} />
                                    </ListItem>
                                    <ListItem button className={classes.nested} key={"Scheduler"} component={Link} to="/Scheduler">
                                        <ListItemIcon>
                                            <i class="far fa-calendar-alt"></i>
                                        </ListItemIcon>
                                        <ListItemText secondary={"Scheduler"} />
                                    </ListItem>

                                </List>
                            </Collapse>
                            <ListItem button key={"messages"} component={Link} to="/messages">
                                <ListItemIcon><MessageIcon /></ListItemIcon>
                                <ListItemText secondary={"messages"} />
                            </ListItem>
                            <ListItem button key={"results"} component={Link} to="/results">
                                <ListItemIcon><MessageIcon /></ListItemIcon>
                                <ListItemText secondary={"results"} />
                            </ListItem>
                            <ListItem button key={"certifications"} component={Link} to="/certifications">
                                <ListItemIcon><MessageIcon /></ListItemIcon>
                                <ListItemText secondary={"certifications"} />
                            </ListItem>
                            <ListItem button key={"achievements"} component={Link} to="/achievements">
                                <ListItemIcon><MessageIcon /></ListItemIcon>
                                <ListItemText secondary={"achievements"} />
                            </ListItem>
                            <ListItem button key={"leaderboard"} component={Link} to="/leaderboard">
                                <ListItemIcon><MessageIcon /></ListItemIcon>
                                <ListItemText secondary={"leaderboard"} />
                            </ListItem>
                            <Divider />
                            <List>
                                <ListItem button key={"onLogoutClick"} component={Link} to="/dashboard">
                                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                    <ListItemText secondary={"back_to_main_page"} />
                                </ListItem>
                            </List>
                        </Drawer>
                    </Hidden>
                </div>
            ) : null
    }


    return (
        <Get_Current_URLPath_Name />
    )
}

export default UserDashboardNav;