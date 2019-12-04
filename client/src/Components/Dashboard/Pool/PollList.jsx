import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Moment from 'react-moment';


import PollData from "./PollData"
import PollEdit from "./PollEdit"
import PollTimeOut from "./PollTimeOut"


const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    modalcontainer: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
});


class PollList extends Component {
    state = {
        anchorEl: null
    }
    //handle open function
    handleOpen = e => this.setState({ anchorEl: e.currentTarget })
    //handle close function
    handleClose = () => this.setState({ anchorEl: null })


    render() {
        const { Poll, auth, classes } = this.props
        const { anchorEl } = this.state
        return (<React.Fragment>
            <List className={classes.root} style={{ display: Poll.IsPollEnds ? "none" : "block" }}>
                <ListItem alignItems="flex-start" >
                    <ListItemAvatar >
                        <Avatar alt="Not found" src={Poll.profile.avatar} />
                    </ListItemAvatar >
                    <ListItemText primary={Poll.UserName}
                        secondary={
                            <React.Fragment >
                                <Typography variant="caption" display="block" gutterBottom >
                                    <i className="fas fa-clock" color="primary" /> posted on - <Moment format="DD MMM YYYY ">{Poll.date}</Moment>
                                </Typography>
                                <PollData Poll={Poll} />
                                <br />
                                <PollTimeOut Poll={Poll} />
                            </React.Fragment>
                        }
                    />
                    {/*calling the menu item here with this button*/}
                    <IconButton edge="end" size="medium" align="right" aria-label="settings"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        style={{ marginLeft: "10%" }}
                        onClick={this.handleOpen.bind(this)}
                    >
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </ListItem >
                <PollEdit anchorEl={anchorEl} Poll={Poll} auth={auth} handleClose={this.handleClose} />
                <Divider variant="inset" component="li" />
            </List >
        </React.Fragment>);
    }
}





const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(PollList));