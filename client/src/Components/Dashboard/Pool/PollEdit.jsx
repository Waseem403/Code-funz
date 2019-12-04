import React, { Component } from 'react';
import { connect } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from '@material-ui/core/Typography';

import {deletePoll} from "../../../actions/pollaction"



class PollEdit extends Component {
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


    onClickDelete=id=>{
        console.log(id)
        this.props.deletePoll(id)
    }



 

    render() {
        const { auth, Poll, anchorEl, handleClose, errors } = this.props
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
        
                    {Poll.user === auth.user.id ?
                        <MenuItem onClick={this.onClickDelete.bind(this,Poll._id)}>
                            <Typography variant="caption" gutterBottom >
                                <i className="far fa-trash-alt" /> delete{" "}
                            </Typography></MenuItem> : null}

                    <MenuItem >
                        <Typography variant="caption" gutterBottom>
                            <i className="fas fa-exclamation-circle"></i> report{" "}
                        </Typography>
                    </MenuItem>
                </Menu>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
 mapStateToProps, { deletePoll }
)(PollEdit);










