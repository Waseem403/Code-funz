import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from '@material-ui/core/Badge';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from "@material-ui/core/Tooltip";




const useStyles = makeStyles(theme => ({
    button: {
        boxShadow: "0 8px 40px -12px rgba(0,0,0,50)",
        textTransform: 'capitalize',
        wordSpacing: '1px',
        letterSpacing: '1px',
        fontSize: "10px",
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    viewall: {
        textDecoration: "none",
    },
    links: {
        textDecoration: 'none',
        color: 'black',
        "&:hover": {
            color: theme.palette.primary.main
        }
    },
    ShowLink: {
        textDecoration: 'none',
        paddingLeft: theme.spacing(25),
        color: 'black',
        "&:hover": {
            color: theme.palette.primary.main
        }
    }
}));


function FriendRequestedNotify(props) {
    const classes = useStyles();
    const { profile } = props
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClickNotification = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    let Total_Requested = profile.RequestedFriendList.length
    //getting the request users list in friendlist.
    let Requested_Content = Total_Requested === 0 ?
        <React.Fragment>
            <IconButton color="inherit" onClick={handleClickNotification}>
                <Badge badgeContent={profile.RequestedFriendList.length} color="primary">
                    <GroupAddIcon />
                </Badge>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem><InfoIcon color="secondary" />{"   "}
                    <Typography variant="subtitle1" gutterBottom> No Friend requested</Typography>
                </MenuItem>
            </Menu>
        </React.Fragment>
        :
        <React.Fragment>
            <IconButton color="inherit" onClick={handleClickNotification}>
                <Badge badgeContent={profile.RequestedFriendList.length} color="primary">
                    <GroupAddIcon />
                </Badge>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {profile.RequestedFriendList.map((requests, index) => {
                    if (index <= 1) {
                        return (<List key={requests._id}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="not found" src={requests.avatarURL} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            <Tooltip
                                                title="view profile"
                                                placement="top"
                                            >
                                                <Typography
                                                    caption="h2"
                                                    variant="h6"
                                                    className={classes.links}
                                                    component={Link}
                                                    to={`/Getprofile/${requests.handler}`}
                                                >
                                                    <i className="fas fa-user " />{" "}
                                                    {requests.user.name}
                                                </Typography>
                                            </Tooltip>
                                        </React.Fragment>
                                    } secondary={
                                        <React.Fragment>
                                            <Typography variant="caption" gutterBottom>
                                                <i className="fas fa-briefcase" />{"  "}
                                                {requests.status} at {requests.company}
                                            </Typography>
                                            <br />
                                            <Typography variant="caption" gutterBottom>
                                                <i className="fas fa-map-marker-alt" />{" "}
                                                lives in {requests.location}</Typography>
                                            <br />
                                            <Button color="primary" variant="contained" size="small" className={classes.button}>accept</Button>
                                            {"  "}  <Button color="secondary" variant="contained" size="small" className={classes.button}> decline </Button>

                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>)
                    }

                })}
                <List key={123} onClick={handleClose}>
                    <Typography variant="caption"
                        className={classes.ShowLink}
                        component={Link}
                        to={`/FriendRequests`}
                        gutterBottom>

                        show more <i class="fas fa-caret-down"></i> </Typography>
                </List>
            </Menu>
        </React.Fragment>

    return (
        <React.Fragment>
            {Requested_Content}
        </React.Fragment>
    )
}



const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    {}
)(FriendRequestedNotify);
