import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

class DOB extends Component {


    handleDateChange = (date) => {
        this.setState({ DOB: date })
    }

    render() {
        const { values, handleDate } = this.props.props;
        console.log(this.props)
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker
                    margin="normal"
                    id="DOBg"
                    label="* select your date of birth"
                    format="dd/MM/yyyy"
                    name="DOB"
                    style={{ minWidth: '100%' }}
                    value={values.DOB}
                    onChange={handleDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        )

    }



}

export default DOB