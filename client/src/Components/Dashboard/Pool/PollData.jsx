import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";

import { Public_Opinion } from "../../../actions/pollaction"

class PollData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectedOption: ''
        }
    }

    handleChange = e => {
        const SelectedOption = e.target.value
        const Poll_Id = this.props.Poll._id
        this.props.Public_Opinion(Poll_Id, SelectedOption)
    }


    render() {
        const { Poll, auth } = this.props
        const { SelectedOption } = this.state

        const radio_checked1 = Poll.Option1PollInfo.filter(poll => poll.user === auth.user.id).length > 0 ? true : false
        const radio_checked2 = Poll.Option2PollInfo.filter(poll => poll.user === auth.user.id).length > 0 ? true : false
        const radio_checked3 = Poll.Option3PollInfo.filter(poll => poll.user === auth.user.id).length > 0 ? true : false
        const radio_checked4 = Poll.Option4PollInfo.filter(poll => poll.user === auth.user.id).length > 0 ? true : false

        const Total_data = Poll.Option1PollInfo.length + Poll.Option2PollInfo.length + Poll.Option3PollInfo.length + Poll.Option4PollInfo.length

        return (
            <FormControl component="fieldset" >
                <Typography variant="subtitle2" gutterBottom>{Poll.Question}</Typography>
                <RadioGroup aria-label="Poll" name="PollList" value={SelectedOption} onChange={this.handleChange.bind(this)}>
                    <FormControlLabel value="Option1PollInfo" control={<Radio color="primary" checked={radio_checked1} />} label={Poll.Option1} />
                    <LinearProgress variant="determinate" value={Poll.Option1PollInfo.length} />
                    <Typography variant="caption" gutterBottom align="right">{Poll.Option1PollInfo.length}%</Typography>
                    <FormControlLabel value="Option2PollInfo" control={<Radio color="primary" checked={radio_checked2} />} label={<Typography variant="subtitle2" gutterBottom>{Poll.Option2}</Typography>} />
                    <LinearProgress variant="determinate" value={Poll.Option2PollInfo.length} />
                    <Typography variant="caption" gutterBottom align="right">{Poll.Option2PollInfo.length}%</Typography>
                    <FormControlLabel value="Option3PollInfo" control={<Radio color="primary" checked={radio_checked3} />} label={<Typography variant="subtitle2" gutterBottom>{Poll.Option3}</Typography>} />
                    <LinearProgress variant="determinate" value={Poll.Option3PollInfo.length} />
                    <Typography variant="caption" gutterBottom align="right">{Poll.Option3PollInfo.length}%</Typography>
                    <FormControlLabel value="Option4PollInfo" control={<Radio color="primary" checked={radio_checked4} />} label={<Typography variant="subtitle2" gutterBottom>{Poll.Option4}</Typography>} />
                    <LinearProgress variant="determinate" value={Poll.Option4PollInfo.length} />
                    <Typography variant="caption" gutterBottom align="right">{Poll.Option4PollInfo.length}%</Typography>
                </RadioGroup>
            </FormControl>

        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps, { Public_Opinion }
)(PollData);