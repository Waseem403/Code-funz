import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';






import { Accept_Friend_RequestSent, Reject_Friend_RequestSent } from "../../../../../actions/FriendRequestAction"


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
    cardroot: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
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
}));


function FriendRequestList(props) {
    const classes = useStyles();
    const { RequestedList } = props

    const AcceptRequest = id => {
        props.Accept_Friend_RequestSent(id)
    }
    const RejectRequest = id => {
        props.Reject_Friend_RequestSent(id)
    }
    return (
        <List key={RequestedList._id} className={classes.cardroot} >
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="not found" src={RequestedList.avatarURL} />
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
                                    to={`/Getprofile/${RequestedList.handler}`}
                                >
                                    <i className="fas fa-user " />{" "}
                                    {RequestedList.user.name}
                                </Typography>
                            </Tooltip>
                        </React.Fragment>
                    } secondary={
                        <React.Fragment>
                            <Typography variant="caption" gutterBottom>
                                <i className="fas fa-briefcase" />{"  "}
                                {RequestedList.status} at {RequestedList.company}
                            </Typography>
                            <br />
                            <Typography variant="caption" gutterBottom>
                                <i className="fas fa-map-marker-alt" />{" "}
                                lives in {RequestedList.location}</Typography>
                            <br />

                            <Button color="primary"
                                size="small"
                                className={classes.button}
                                component={Link}
                                to={`/Getprofile/${RequestedList.handler}`}
                            >
                                view profile</Button>
                            {"  "}

                        </React.Fragment>
                    }
                />

                <IconButton edge="end" size="medium" align="right" aria-label="settings"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    style={{ marginLeft: "10%" }}
                >
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>

    )
}

FriendRequestList.propTypes = {
    Accept_Friend_RequestSent: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { Accept_Friend_RequestSent, Reject_Friend_RequestSent }
)(FriendRequestList)