import React, { Component } from 'react';
import { connect } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import FeedEditForm from "./FeedEditForm"
import { AuthUserDeleteFeed } from "../../../../../actions/profilevisitoraction"




class PostListMenu extends Component {
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

    //deleting the profile feed

    DeleteProfilFeed = StatusId => {
        this.props.AuthUserDeleteFeed(StatusId)
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
        const { anchorEl, Feeds, Feed_Id, handleClose } = this.props
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
                    <MenuItem onClick={this.OpenDrawer.bind(this)}>
                        <Typography variant="caption" gutterBottom>
                            <i class="far fa-edit" /> edit{" "}
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={this.DeleteProfilFeed.bind(this, Feed_Id)}>
                        <Typography variant="caption" gutterBottom>
                            <i class="far fa-trash-alt" /> delete{" "}
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Typography variant="caption" gutterBottom>
                            <i class="far fa-eye-slash" /> hide{" "}
                        </Typography>
                    </MenuItem>
                </Menu>
                <FeedEditForm state={state} postid={Feed_Id} comment={Feeds} OpenDrawer={this.OpenDrawer} CloseDrawer={this.CloseDrawer} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { AuthUserDeleteFeed }
)(PostListMenu);