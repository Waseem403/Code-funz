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
    }
}));


function FriendList(props) {
    const classes = useStyles();
    const { FriendList } = props

    console.log(FriendList)

    return (
        <List key={FriendList._id} className={classes.cardroot}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="not found" src={FriendList.avatarURL} />
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
                                    to={`/Getprofile/${FriendList.handler}`}
                                >
                                    <i className="fas fa-user " />{" "}
                                    {FriendList.user.name}
                                </Typography>
                            </Tooltip>
                        </React.Fragment>
                    } secondary={
                        <React.Fragment>
                            <Typography variant="caption" gutterBottom>
                                <i className="fas fa-briefcase" />{"  "}
                                {FriendList.status} at {FriendList.company}
                            </Typography>
                            <br />
                            <Typography variant="caption" gutterBottom>
                                <i className="fas fa-map-marker-alt" />{" "}
                                lives in {FriendList.location}</Typography>
                            <br />

                            <Button color="primary"
                                variant="contained"
                                size="small"
                                className={classes.button}

                            >
                                view profile </Button>
                            {"  "}
                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                className={classes.button}
                            >

                                message </Button>

                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    )
}

export default FriendList