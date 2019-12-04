import React from 'react';
import Chip from '@material-ui/core/Chip';
import TimerIcon from '@material-ui/icons/Timer';
import Countdown from 'react-countdown-now';
import Typography from "@material-ui/core/Typography";
import {
    Update_Poll
} from '../../../actions/pollaction'
import PropTypes from "prop-types";
import { connect } from "react-redux";

function PollTimeOut(props) {
    const { Poll, Update_Poll } = props



    const OnCompleteUpdatePoll = () => {
        const Poll_Id = Poll._id
        props.Update_Poll(Poll_Id)
        console.log("deleted pool...")
    }




    return (
        //2019-09-05T12:00:00-06:30
        <React.Fragment>
            <Typography variant="caption" gutterBottom style={{ color: "red", fontWeight: "bold" }}>
                This poll ends on :   <Countdown date={Poll.PollRemainderDate} onComplete={OnCompleteUpdatePoll}>

                </Countdown>
            </Typography>

        </React.Fragment>
    )
}


PollTimeOut.propTypes = {
    Update_Poll: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    { Update_Poll }
)(PollTimeOut);