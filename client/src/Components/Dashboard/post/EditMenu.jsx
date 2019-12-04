import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteComment } from "../../../actions/postActions"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from '@material-ui/core/Typography';


import EditReplyForm from './EditReplyForm'




class EditMenu extends Component {
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




    //function which delete the post
    onDeleteClick = (commentIds) => {
        const commentId = commentIds;
        const postId = this.props.postid
        console.log(postId)
        console.log(commentId)
        this.props.deleteComment(postId, commentId);
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
        const { auth, postid,MainPost_Id, comment, anchorA1, handleClose, errors } = this.props
        const { state } = this.state
        return (
            <React.Fragment>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorA1}
                    keepMounted
                    open={Boolean(anchorA1)}
                    onClose={handleClose}
                >
                    {comment.user === auth.user.id ?
                        <MenuItem onClick={this.OpenDrawer.bind(this)}>
                            <Typography variant="caption" gutterBottom >
                                <i className="far fa-edit" /> edit{" "}
                            </Typography>
                        </MenuItem> : null}
                    {comment.user === auth.user.id || MainPost_Id===auth.user.id ?
                        <MenuItem onClick={this.onDeleteClick.bind(this, comment._id)}>
                            <Typography variant="caption" gutterBottom >
                                <i className="far fa-trash-alt" /> delete{" "}
                            </Typography></MenuItem> : null}

                    <MenuItem >
                        <Typography variant="caption" gutterBottom>
                            <i className="fas fa-exclamation-circle"></i> report{" "}
                        </Typography>
                    </MenuItem>
                </Menu>
                <EditReplyForm state={state} postid={postid} comment={comment} errors={errors} OpenDrawer={this.OpenDrawer} CloseDrawer={this.CloseDrawer} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps, {
        deleteComment,
    }
)(EditMenu);










