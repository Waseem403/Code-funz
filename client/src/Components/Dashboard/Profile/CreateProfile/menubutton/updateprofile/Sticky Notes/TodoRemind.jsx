import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  deleteTodos,
  SetRemainder
} from "../../../../../../../actions/profileActions";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from '@material-ui/core/IconButton';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Tooltip from "@material-ui/core/Tooltip";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  modalcontainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  Inputs: {
    width: "100%"
  },
  submitbtn:
    {
      marginTop: theme.spacing(3),
      textTransform: 'capitalize'
    }
});

class TodoRemind extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      anchorEl: null,
      SelectedDate: "",
    };
  }


  handleClick(event, popoverId) {
    event.preventDefault();
    this.setState({
      pop_open: !this.state.pop_open,
      anchorEl: event.currentTarget,
      openedPopoverId: popoverId
    });
  }

  handleClose() {
    this.setState({
      pop_open: false,
      anchorEl: null,
      openedPopoverId: null
    });
  }

  //Setting the date with the onchange function
  handleDateChange(e) {
    console.log(e.target.value)
    this.setState({
      SelectedDate: e.target.value
    })

  }



  //deleting the note function..
  onDeleteClick(id) {
    this.props.deleteTodos(id);
    console.log(id);
  }

  // set remainders all functions below

  //opening dialog.
  OnShowDateDialog() {
    this.setState({ open: true });
  }

  onCloseDateDialog() {
    this.setState({
      open: false
    });
  }

  set_Today_night_Remainder(id) {
    let NowDate = new Date();
    let NowTime = NowDate.getHours();
    const hrs = 20;
    if (NowTime < hrs)
      return (
        <MenuItem onClick={this.Set_Today_Remainder.bind(this, { id: id, Set_Rem: 20 })}>
          <Typography variant="caption" gutterBottom>
            <i class="fas fa-bell" /> later today {"  "}
          </Typography>{" "}
          <Typography
            variant="caption"
            gutterBottom
            style={{ paddingLeft: "6%" }}
          >
            8:00 Pm
          </Typography>
        </MenuItem>
      );
  }

  //set tommorow morning remainder.
  set_Tommorow_Morning_Remainder(id) {
    let NowDate = new Date();
    let NowTime = NowDate.getHours();
    const eighthrs = 8;
    const twelvehrs = 0
    if (NowTime >= twelvehrs && NowTime < eighthrs)
      return (
        <MenuItem onClick={this.Set_Morning_Remainder.bind(this, { id: id, Set_Rem: 8, day: "today" })}>
          <Typography variant="caption" gutterBottom>
            <i class="fas fa-bell" /> Today  {"  "}
          </Typography>{" "}
          <Typography
            variant="caption"
            gutterBottom
            style={{ paddingLeft: "6%" }}
          >
            8:00 am
        </Typography>
        </MenuItem>
      );
    else {
      return (
        <MenuItem onClick={this.Set_Morning_Remainder.bind(this, { id: id, Set_Rem: 8, day: "tommorow" })}>
          <Typography variant="caption" gutterBottom>
            <i class="fas fa-bell" /> tommorow {"  "}
          </Typography>{" "}
          <Typography
            variant="caption"
            gutterBottom
            style={{ paddingLeft: "6%" }}
          >
            8:00 am
          </Typography>
        </MenuItem>
      );
    }
  }


  //setting fast today remainder 
  Set_Today_Remainder(Remainder_info) {
    const CurrentTime = new Date()
    const Current_Year = CurrentTime.getFullYear();
    const Current_Month = CurrentTime.getMonth() + 1;
    const Current_Date = CurrentTime.getDate();
    const Remainder_Month = Current_Month < 10 ? `0${Current_Month}` : Current_Month
    const Remainder_Date = Current_Date < 10 ? `0${Current_Date}` : Current_Date
    //2015-03-25T12:00:00Z
    let Remainder_Time = `${Current_Year}-${Remainder_Month}-${Remainder_Date}T${20}:00:00+05:30`

    let RemData = {
      id: Remainder_info.id,
      RemDate: Remainder_Time,
    };
    this.props.SetRemainder(RemData);
  }

  //setting fast remainder for morning and tommorow morning at 8:00 am

  Set_Morning_Remainder(Remainder_data) {
    const CurrentTime = new Date()
    const Current_Year = CurrentTime.getFullYear();
    const Current_Month = CurrentTime.getMonth() + 1;
    const Today_Date = CurrentTime.getDate();
    const Tommorow_Date = CurrentTime.getDate() + 1;
    const Remainder_Month = Current_Month < 10 ? `0${Current_Month}` : Current_Month
    const Today_Day = Today_Date < 10 ? `0${Today_Date}` : Today_Date
    const Tommorow_Day = Tommorow_Date < 10 ? `0${Tommorow_Date}` : Tommorow_Date

    //2015-03-25T12:00:00Z
    let Today_Remainder_Time = `${Current_Year}-${Remainder_Month}-${Today_Day}T08:00:00+05:30`
    let Tommorow_Remainder_Time = `${Current_Year}-${Remainder_Month}-${Tommorow_Day}T08:00:00+05:30`

    let Remainder_Time = Remainder_data.day === "today" ? Today_Remainder_Time : Tommorow_Remainder_Time

    let RemData = {
      id: Remainder_data.id,
      RemDate: Remainder_Time,
    };

    this.props.SetRemainder(RemData);
  }


  //setting the fast remainder for the next week morning 8:00 am
  Set_NextWeek_Remainder(TodoItem_id) {
    const CurrentTime = new Date()
    const Current_Year = CurrentTime.getFullYear();
    const Current_Month = CurrentTime.getMonth() + 1;
    const Today_Date = CurrentTime.getDate() + 8;
    const Remainder_Month = Current_Month < 10 ? `0${Current_Month}` : Current_Month
    const Today_Day = Today_Date < 10 ? `0${Today_Date}` : Today_Date

    //2015-03-25T12:00:00Z
    let NextWeek_Remainder_Time = `${Current_Year}-${Remainder_Month}-${Today_Day}T08:00:00+05:30`


    let RemData = {
      id: TodoItem_id,
      RemDate: NextWeek_Remainder_Time,
    };
    this.props.SetRemainder(RemData)
  }



  // Setting the custom alarm.
  onSubmit = e => {
    e.preventDefault();
    let { SelectedDate } = this.state;
    let RemData = {
      id: this.props.items._id,
      RemDate: SelectedDate,
    };
    this.props.SetRemainder(RemData);
    this.setState({
      open: false
    });
  };





  render() {
    const { items, classes } = this.props;

    const { anchorEl, } = this.state;

    return (
      <React.Fragment>
        <div>
          <Tooltip title="remind me" placement="top" >
            <IconButton aria-label="add to shopping cart" size="small" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick.bind(this)}>
              <NotificationsActiveIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={this.handleClose.bind(this)}
          >
            {this.set_Today_night_Remainder(items._id)}
            {this.set_Tommorow_Morning_Remainder(items._id)}

            <MenuItem onClick={this.Set_NextWeek_Remainder.bind(this, items._id)}>
              <Typography variant="caption" gutterBottom>
                <i class="fas fa-bell" /> next week
              </Typography>
              <Typography
                variant="caption"
                gutterBottom
                style={{ paddingLeft: "6%" }}
              >
                8:00 am
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography
                variant="caption"
                gutterBottom
                onClick={this.OnShowDateDialog.bind(this, items._id)}
              >
                <i class="fas fa-bell" /> pick date & time
              </Typography>

              <Dialog
                open={this.state.open}
                onClose={this.onCloseDateDialog.bind(this)}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="sm"
              >
                <DialogTitle id="form-dialog-title" className="center">
                  <Grid align="right">
                    <i
                      class="far fa-times-circle right"
                      style={{ cursor: "pointer" }}
                      onClick={this.onCloseDateDialog.bind(this)}
                    />
                  </Grid>
                  <Typography variant="h5" align="center"> set a custom remainder</Typography>{" "}


                </DialogTitle>

                <DialogContent>
                  <Container component="main" maxWidth="md" className={classes.modalcontainer}>
                    <CssBaseline />
                    <form onSubmit={this.onSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            id="remainder"
                            fullWidth
                            label="set a custom remainder"
                            type="datetime-local"
                            name="remainder"
                            value={this.state.SelectedDate}
                            onChange={this.handleDateChange.bind(this)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Button size="small" fullWidth color="primary" type="submit" variant="contained" className={classes.submitbtn}>set remainder</Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Container>
                </DialogContent>
              </Dialog>
            </MenuItem>
          </Menu>
        </div>
      </React.Fragment>
    );
  }
}

TodoRemind.propTypes = {
  deleteTodos: PropTypes.func.isRequired,

};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteTodos, SetRemainder }
)(withStyles(styles)(TodoRemind));


