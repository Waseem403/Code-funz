import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  clearCurrentProfile,
  getCurrentProfile
} from "../../actions/profileActions";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MessageIcon from '@material-ui/icons/Message';
import LinksMobile from "./LinksMobile";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';


import Drawer from '@material-ui/core/Drawer';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useTheme } from '@material-ui/core/styles';
import UserDashboard from "../Dashboard/Admin_Panel/UserDashboard"
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import PersonIcon from '@material-ui/icons/Person';
import CameraIcon from '@material-ui/icons/Camera';
import PanoramaIcon from '@material-ui/icons/Panorama';
import DashboardIcon from '@material-ui/icons/Dashboard';
import WidgetsIcon from '@material-ui/icons/Widgets';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import CircularProgress from "@material-ui/core/CircularProgress";


import FriendRequestedNotify from "./FriendRequestedNotify"

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
}));

function Layout(props) {
  const { isAuthenticated, user } = props.auth;
  const { profile, loading } = props.profile
  const classes = useStyles();
  const theme = useTheme();
  const [auth] = React.useState(true);
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const [open, setOpen] = React.useState(false);
  const [openlist, setlistOpen] = React.useState(false);
  const [openwidget, setwidgetOpen] = React.useState(false);
  const Zero_Value = 0;


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

  useEffect(() => {
    Get_Current_URLPath_Name()
    if (window.location.pathname === "/UserDashboard") {
      Getting_Requested_Details()
    }
  }, [props])

  useEffect(() => {
    props.getCurrentProfile()


  }, [])


  function onLogoutClick(e) {
    e.preventDefault();
    props.clearCurrentProfile();
    props.logoutUser();
  }

  const Getting_Requested_Details = () => console.log("running this function after menu open")



  let Requested_Content
  if (profile == null || loading) {
    Requested_Content = <CircularProgress disableShrink size={20} />
  }
  else {
    var Profile_Status = Object.keys(profile).length
    if (Object.keys(profile).length !== Zero_Value) {
      var Requested_Length = profile.RequestedFriendList.length;
      Requested_Content = <FriendRequestedNotify profile={profile} />
    }
  }


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
      || window.location.pathname === "/Following"
      || window.location.pathname === "/Followers"
      || window.location.pathname === "/Todolisted"
      ? Dashboard_Menu = (
        <div className={classes.root1}>
          <Hidden xsDown>
            <CssBaseline />
            <AppBar position="fixed" color="inherit" className={clsx(classes.appBar, open && classes.appBarShift)}>
              <CssBaseline />
              <Container main maxWidth="lg">
                <Toolbar className={classes.toolbar}>
                  <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Dashboard
              </Typography>
                  {Requested_Content}
                </Toolbar>
              </Container>
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
                    <ListItem button key={"Followers"} className={classes.nested} component={Link} to="/Followers">
                      <ListItemIcon>
                        <i class="fas fa-image"></i>
                      </ListItemIcon>
                      <Badge color="primary" badgeContent={Requested_Length} className={classes.margin}>
                        <ListItemText secondary="Followers" />
                      </Badge>
                    </ListItem>

                    <ListItem button key={"Following"} className={classes.nested} component={Link} to="/Following">
                      <ListItemIcon>
                        <i class="fas fa-image"></i>
                      </ListItemIcon>
                      <ListItemText secondary="Following" />
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
                  <ListItem button className={classes.nested} key={"todolist"} component={Link} to="/Todolisted">
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


  const AuthLinks = (
    <Hidden xsDown>
      <Toolbar>
        <Typography
          variant="h5"
          className={classes.title}
          to="/dashboard"
          component={Link}
        >
          Code funz
        </Typography>
        <Button
          color="inherit"
          to="/Poll"
          component={Link}
          className={classes.links}
          disabled={Profile_Status === Zero_Value ? true : false}
        >
          {" "}
          ask a pool
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/posts"
          className={classes.links}
          disabled={Profile_Status === Zero_Value ? true : false}
        >
          {" "}
          Add Post
        </Button>
        <Button
          color="inherit"
          to="/Getprofiles"
          component={Link}
          className={classes.links}
          disabled={Profile_Status === Zero_Value ? true : false}
        >
          {" "}
          Developers
        </Button>
        <Button
          color="inherit"
          to="/feed"
          component={Link}
          className={classes.links}
          disabled={Profile_Status === Zero_Value ? true : false}
        >
          {" "}
          feedback
        </Button>

        {auth && (
          <div>
            <IconButton
              {...bindTrigger(popupState)}>
              <AccountCircle />
            </IconButton>
            {user.name}
            <Menu {...bindMenu(popupState)}>
              <MenuItem component={Link}
                to="/Getyourprofile" onClick={popupState.close}>your profile</MenuItem>

              <MenuItem component={Link} disabled={Profile_Status === Zero_Value ? true : false}
                to="/UserDashboard" onClick={popupState.close}>dashboard</MenuItem>

              <MenuItem onClick={onLogoutClick}> sign out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </Hidden>
  );

  const GuestLinks = (
    <Hidden xsDown>
      <Toolbar>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          className={classes.title}
        >
          Code funz
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/login"
          className={classes.links}
        >
          {" "}
          Login{" "}
        </Button>
        <Button
          color="inherit"
          to="/Register"
          component={Link}
          className={classes.links}
        >
          {" "}
          Register
        </Button>
        <Button
          color="inherit"
          to="/News"
          component={Link}
          className={classes.links}
        >
          {" "}
          News
        </Button>
        <Button
          color="inherit"
          to="/Annual"
          component={Link}
          className={classes.links}
        >
          {" "}
          AnnualFunction
        </Button>{" "}
        <Button
          color="inherit"
          to="/Contact"
          component={Link}
          className={classes.links}
        >
          {" "}
          Contact
        </Button>
      </Toolbar>
    </Hidden>
  );

  //sending the navbar options based on condition
  const AuthLinksMobile = (
    <List>
      <ListItem button disabled={Profile_Status === Zero_Value ? true : false} key="AddPost" component={Link} to="/posts">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="AddPost" />
      </ListItem>
      <ListItem button disabled={Profile_Status === Zero_Value ? true : false} key="developers" component={Link} to="/Getprofiles">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="developers" />
      </ListItem>
      <ListItem button disabled={Profile_Status === Zero_Value ? true : false} key="Feedback" component={Link} to="/feed">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </ListItem>
      <ListItem button key="Your Profile" component={Link} to="/Getyourprofile">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Your Profile" />
      </ListItem>
      <ListItem button disabled={Profile_Status === Zero_Value ? true : false} key="Dashboard" component={Link} to="/posts">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <Divider />
      <ListItem button key="Sign out" onClick={onLogoutClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Sign out" />
      </ListItem>
    </List>
  );

  const GuestLinksMobile = (
    <List>
      <ListItem button key="Login" component={Link} to="/login">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>

      <ListItem button key="register" component={Link} to="/Register">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="register" />
      </ListItem>

      <ListItem button key="News" component={Link} to="/News">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="News" />
      </ListItem>

      <ListItem button key="annual functions" component={Link} to="/Annual">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="annual functions" />
      </ListItem>

      <ListItem button key="contact us" component={Link} to="/contact">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="contact us" />
      </ListItem>
    </List>
  );

  const GuestHeader = (
    <Typography
      variant="h6"
      className={classes.links}
      noWrap
      component={Link}
      to="/"
    >
      Code funz
    </Typography>
  );
  const AuthHeader = (
    <Typography
      variant="h6"
      noWrap
      component={Link}
      className={classes.links}
      to="/dashboard"
    >
      Code funz
    </Typography>
  );

  return (

    <React.Fragment>
      <div>
        <AppBar position="fixed" color="inherit">
          <CssBaseline />
          <Container maxWidth="lg">
            {isAuthenticated ? AuthLinks : GuestLinks}
          </Container>
        </AppBar>
      </div>
      <LinksMobile
        Authcond={isAuthenticated ? AuthLinksMobile : GuestLinksMobile}
        Header={isAuthenticated ? AuthHeader : GuestHeader}
      />

      <Get_Current_URLPath_Name />

    </React.Fragment>
  );
}

Layout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, getCurrentProfile }
)(Layout);
