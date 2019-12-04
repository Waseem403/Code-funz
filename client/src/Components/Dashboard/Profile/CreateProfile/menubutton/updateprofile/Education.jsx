import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { addEducation } from "../../../../../../actions/profileActions";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';




const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(30)
    },
  },
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "capitalize"
  },
  errors: {
    paddingTop: "0.5%",
    paddingLeft: "1%",
    color: red[900],
    fontWeight: "bold"
  },
  dense: {
    fontSize: "12px"
  }
}));

function Education(props) {
  const classes = useStyles();
  const [school, Setschool] = useState("");
  const [degree, Setdegree] = useState("");
  const [fieldofstudy, Setfieldofstudy] = useState("");
  const [from, Setfrom] = useState(null);
  const [to, Setto] = useState(null);
  const [current, Setcurrent] = useState(false);
  const [description, setdescription] = React.useState();
  const [disabled, Setdisabled] = useState(false);
  const [errors, Seterrors] = useState({})
  const [CharacterCount, SetCharacterCount] = useState(0)

  const Getschool = e => {
    Setschool(e.target.value);
  };

  const Getdegree = e => {
    Setdegree(e.target.value);
  };

  const Getfieldofstudy = e => {
    Setfieldofstudy(e.target.value);
  };

  const Getfrom = fromdate => {
    Setfrom(fromdate);
  };

  const Getto = todate => {
    Setto(todate)
  }

  const Getdescription = e => {
    setdescription(e.target.value)
    SetCharacterCount(e.target.value.length)
    Seterrors({ ...errors, description: undefined })
  }
  const onCheck = e => {
    Setcurrent(!current);
    Setdisabled(!disabled)
  }
  //submiting the data here...

  const onSubmit = e => {
    e.preventDefault();
    const eduData = {
      school: school,
      degree: degree,
      fieldofstudy: fieldofstudy,
      from: from,
      to: to,
      current: current,
      description: description
    };
    props.addEducation(eduData, props.history);
  }


  useEffect(() => {
    if (props.errors) {
      Seterrors(props.errors);
    }
  }, [props.errors])




  //loader for waiting for the response
  let Loader;
  //loading when fetching or sending the request to the server.
  Loader = errors.loading ? (
    <CircularProgress disableShrink style={{ color: "white" }} size={15} />
  ) : (
      ""
    );


  return (
    <React.Fragment>
      <Container component="main" maxWidth="md" className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <i class="fas fa-graduation-cap"></i>
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Education
        </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            add any school,bootcamp,etc that you have attended
            </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  autoComplete="school"
                  name="school"
                  fullWidth
                  margin="dense"
                  id="school"
                  label="school name"
                  required
                  onChange={Getschool}
                  value={school}
                  error={errors.school === undefined ? false : true}
                  helperText={errors.school}

                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  id="degree"
                  label="degree or certification"
                  name="degree"
                  type="degree"
                  onChange={Getdegree}
                  value={degree}
                  error={errors.degree === undefined ? false : true}
                  helperText={errors.degree}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  name="fieldofstudy"
                  label="field of study"
                  id="fieldofstudy"
                  onChange={Getfieldofstudy}
                  value={fieldofstudy}
                  error={errors.fieldofstudy === undefined ? false : true}
                  helperText={errors.fieldofstudy}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <KeyboardDatePicker
                    margin="normal"
                    variant="outlined"
                    required
                    id="from data"
                    label="from date"
                    format="dd/MM/yyyy"
                    name="from"
                    style={{ minWidth: '100%' }}
                    value={from}
                    onChange={Getfrom}
                    KeyboardButtonProps={{
                      'aria-label': 'from date',
                    }}
                    error={errors.from === undefined ? false : true}
                    helperText={errors.from}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <KeyboardDatePicker
                    margin="normal"
                    id="to date"
                    required
                    label="to date"
                    format="dd/MM/yyyy"
                    name="to"
                    style={{ minWidth: '100%' }}
                    value={to}
                    onChange={Getto}
                    disabled={disabled ? true : false}
                    KeyboardButtonProps={{
                      'aria-label': 'to date',
                    }}
                    error={errors.to === undefined ? false : true}
                    helperText={errors.to}
                  />
                </MuiPickersUtilsProvider>
                <FormControlLabel
                  control={<Checkbox value={current}
                    color="primary" />}
                  label="currently studying"
                  checked={current}
                  onChange={onCheck}
                  id="current"
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  multiline
                  row="5"
                  margin="dense"
                  name="description"
                  label="description"
                  id="description"
                  onChange={Getdescription}
                  value={description}
                  error={errors.description === undefined ? false : true}
                  helperText={errors.description === undefined ? `${CharacterCount}/800` : errors.description}
                />
              </Grid>

              <Grid item xs={12} a >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="medium"
                  className={classes.submit}
                >
                  {Loader} {"   "} add Education
          </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}


Education.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(Education));
