import React, { Component } from 'react';
import { connect } from "react-redux";
import { deletePost } from "../../../actions/postActions"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from '@material-ui/core/Typography';



import EditPostForm from "./EditPostForm"




class EditPost extends Component {
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
    onDeleteClick = id => {
        this.props.deletePost(id);
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
        const { auth, post, anchorEl, handleClose, errors } = this.props
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
                    {post.user === auth.user.id ?
                        <MenuItem onClick={this.OpenDrawer.bind(this)}>
                            <Typography variant="caption" gutterBottom >
                                <i className="far fa-edit" /> edit{" "}
                            </Typography>
                        </MenuItem> : null}
                    {post.user === auth.user.id ?
                        <MenuItem onClick={this.onDeleteClick.bind(this, post._id)}>
                            <Typography variant="caption" gutterBottom >
                                <i className="far fa-trash-alt" /> delete{" "}
                            </Typography></MenuItem> : null}

                    <MenuItem >
                        <Typography variant="caption" gutterBottom>
                            <i className="fas fa-exclamation-circle"></i> report{" "}
                        </Typography>
                    </MenuItem>
                </Menu>
                <EditPostForm state={state} posts={post} errors={errors} OpenDrawer={this.OpenDrawer} CloseDrawer={this.CloseDrawer} />
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
        deletePost,
    }
)(EditPost);










