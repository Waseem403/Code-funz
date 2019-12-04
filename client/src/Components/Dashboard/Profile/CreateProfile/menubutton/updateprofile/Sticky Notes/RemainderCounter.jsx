import React from 'react';
import Chip from '@material-ui/core/Chip';
import TimerIcon from '@material-ui/icons/Timer';
import Countdown from 'react-countdown-now';
import Typography from "@material-ui/core/Typography";
import {
    Changecolor
} from "../../../../../../../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function RemainderCounter(props) {
    const Completionist = () => {
        return <Typography variant="caption" gutterBottom style={{ color: "white", fontWeight: "bold" }}>
            Time out! task not completed
    </Typography>
    }

    const UpdatedTodoList_Not_Completed = () => {
        const obj = {
            color: "red", id: props.todoid
        }
        props.Changecolor(obj);
    }

    return (
        //2019-09-05T12:00:00-06:30
        <Chip
            icon={<TimerIcon />}
            label={<Countdown date={props.remdate} onComplete={UpdatedTodoList_Not_Completed}>
                <Completionist />
            </Countdown>}
            color="secondary"
        />
    )
}


RemainderCounter.propTypes = {
    Changecolor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    { Changecolor }
)(RemainderCounter);