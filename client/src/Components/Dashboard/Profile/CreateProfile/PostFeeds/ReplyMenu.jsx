import React, { Component } from 'react';
import { connect } from "react-redux";
import { AuthUserDeleteFeedReply } from "../../../../../actions/profilevisitoraction"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ReplyEditForm from "./ReplyEditForm"

class ReplyMenu extends Component {

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

    HandleDeleteReply = (Post_Id, Delete_Info) => {
        this.props.AuthUserDeleteFeedReply(Post_Id, Delete_Info)
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
        const { anchorRl, handleClose, CurrentTargetProfile, PostFeedAuthUser, Post_Id, Reply, CurrentReplyUser, auth } = this.props
        const { state } = this.state
        const Reply_Id = Reply._id
        return (
            <React.Fragment>
                <Menu
                    id="simple-Replyedit-menu"
                    anchorEl={anchorRl}
                    keepMounted
                    open={Boolean(anchorRl)}
                    onClose={handleClose}
                >
                    {auth.user.id === CurrentReplyUser ?
                        <MenuItem onClick={this.OpenDrawer.bind(this)}>
                            <Typography variant="caption" gutterBottom >
                                <i class="far fa-edit" /> edit{" "}
                            </Typography>
                        </MenuItem> : null}
                    {auth.user.id === CurrentReplyUser || auth.user.id === PostFeedAuthUser ?
                        <MenuItem onClick={this.HandleDeleteReply.bind(this, Post_Id, { Reply_Id, CurrentTargetProfile })}>
                            <Typography variant="caption" gutterBottom>
                                <i class="far fa-trash-alt" /> delete{" "}
                            </Typography>
                        </MenuItem> : null}
                    {auth.user.id === CurrentReplyUser ?
                        <MenuItem >
                            <Typography variant="caption" gutterBottom>
                                <i class="far fa-eye-slash" /> hide{" "}
                            </Typography>
                        </MenuItem> : null}
                    {auth.user.id === CurrentReplyUser ? null :
                        <MenuItem onClick={handleClose}>
                            <Typography variant="caption" gutterBottom>
                                <i class="fas fa-exclamation-circle"></i> report{" "}
                            </Typography>
                        </MenuItem>
                    }

                </Menu>
                <ReplyEditForm state={state} Post_Id={Post_Id} comment={Reply} OpenDrawer={this.OpenDrawer} CloseDrawer={this.CloseDrawer} />
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
    {
        AuthUserDeleteFeedReply
    }
)(ReplyMenu)