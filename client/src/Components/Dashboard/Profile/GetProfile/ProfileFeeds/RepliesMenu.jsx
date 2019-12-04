import React, { Component } from 'react';
import { connect } from "react-redux";
import { FromProfileDeleteFeed } from "../../../../../actions/profilevisitoraction"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import FeedEditForm from "./FeedEditForm"

class RepliesMenu extends Component {
    constructor() {
        super()
        this.state = {
            state: false,
        }
    }

    //opening the edit drawer
    OpenDrawer = () => {
        this.setState({ state: true })
    }
    //closiing the edit drawer

    CloseDrawer = () => {
        this.setState({ state: false })
    }



    //deleting the post
    DeleteFeedItem = feedId => {
        this.props.FromProfileDeleteFeed(feedId)
    }


    //calling the componentWillReceiveProps
    componentWillReceiveProps(Newprops) {
        let error_len = Object.keys(Newprops.errors).length;
        let zero = 0;
        if (error_len === zero) {
            this.setState({
                state: false
            })
        }

    }
    render() {
        const { anchorEl, feeds, handleClose, auth, feedId, CurrentPostProfileId } = this.props
        const { state } = this.state
        return (
            <React.Fragment>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {auth.user.id === CurrentPostProfileId ?
                        <MenuItem onClick={this.OpenDrawer.bind(this)}>
                            <Typography variant="caption" gutterBottom>
                                <i class="far fa-edit" /> edit{" "}
                            </Typography>
                        </MenuItem> : null}
                    {auth.user.id === CurrentPostProfileId ?
                        <MenuItem onClick={this.DeleteFeedItem.bind(this, feedId)}>
                            <Typography variant="caption" gutterBottom>
                                <i class="far fa-trash-alt" /> delete{" "}
                            </Typography>
                        </MenuItem>
                        : null}
                    {auth.user.id === CurrentPostProfileId ?
                        <MenuItem onClick={handleClose}>
                            <Typography variant="caption" gutterBottom>
                                <i class="far fa-eye-slash" /> hide{" "}
                            </Typography>
                        </MenuItem>
                        : null}
                    {auth.user.id === CurrentPostProfileId ? null : <MenuItem onClick={handleClose}>
                        <Typography variant="caption" gutterBottom>
                            <i class="fas fa-exclamation-circle"></i> report{" "}
                        </Typography>
                    </MenuItem>}
                </Menu>
                <FeedEditForm state={state} postid={feedId} comment={feeds} OpenDrawer={this.OpenDrawer} CloseDrawer={this.CloseDrawer} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { FromProfileDeleteFeed }
)(RepliesMenu);