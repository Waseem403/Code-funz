import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteFeed } from "../../../actions/feedbackaction";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import FeedEditForm from "./FeedEditForm"

class EditFeedMenu extends Component {
    state = {
        state: false
    }


    //opening the edit drawer
    OpenDrawer = () => {
        this.setState({ state: true })
    }
    //closiing the edit drawer

    CloseDrawer = () => {
        this.setState({ state: false })
    }


    //function which deleted the feedback
    onDeleteClick = (id) => {
        this.props.deleteFeed(id);
    };


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
        const { anchorAl, feeds, auth, handleClose, errors } = this.props
        const { state } = this.state

        return (
            <React.Fragment>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorAl}
                    keepMounted
                    open={Boolean(anchorAl)}
                    onClose={handleClose}
                >
                    {feeds.user === auth.user.id ? <MenuItem onClick={this.OpenDrawer.bind(this)}>
                        <Typography variant="caption" gutterBottom>
                            <i className="far fa-edit" /> edit{" "}
                        </Typography>
                    </MenuItem> : null}
                    {feeds.user === auth.user.id ? <MenuItem onClick={this.onDeleteClick.bind(this, auth.user.id)}><Typography variant="caption" gutterBottom>
                        <i className="far fa-trash-alt" /> delete{" "}
                    </Typography></MenuItem> : null}

                    <MenuItem onClick={handleClose}>
                        <Typography variant="caption" gutterBottom>
                            <i className="fas fa-exclamation-circle"></i> report{" "}
                        </Typography>
                    </MenuItem>
                </Menu>
                <FeedEditForm state={state} feed={feeds} errors={errors} OpenDrawer={this.OpenDrawer} CloseDrawer={this.CloseDrawer} />

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps, {
        deleteFeed,
    }
)(EditFeedMenu);
