import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { addExperience } from "../../../../../../actions/profileActions";
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
import Fab from '@material-ui/core/Fab';
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

function Experience(props) {
  const classes = useStyles();
  const [company, Setcompany] = useState("");
  const [title, Settitle] = useState("");
  const [location, Setlocation] = useState("");
  const [from, Setfrom] = useState(null);
  const [to, Setto] = useState(null);
  const [current, Setcurrent] = useState(false);
  const [description, setdescription] = React.useState();
  const [disabled, Setdisabled] = useState(false);
  const [errors, Seterrors] = useState({})
  const [CharacterCount, SetCharacterCount] = useState(0)


  const Getcompany = e => {
    Setcompany(e.target.value);
  };

  const Gettitle = e => {
    Settitle(e.target.value);
  };

  const Getlocation = e => {
    Setlocation(e.target.value);
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
    Seterrors({ ...errors, jobdescription: undefined })
  }
  const onCheck = e => {
    Setcurrent(!current);
    Setdisabled(!disabled)
  }
  //submiting the data here...

  const onSubmit = e => {
    e.preventDefault();
    const expData = {
      company: company,
      title: title,
      location: location,
      from: from,
      to: to,
      current: current,
      description: description
    };

    props.addExperience(expData, props.history);
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
            <i class="fas fa-user-tie"></i>
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Experience
        </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            add any job or position that you have done in past or current
            </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  autoComplete="company"
                  name="company"
                  required
                  fullWidth
                  margin="dense"
                  id="company"
                  label="company name"
                  onChange={Getcompany}
                  value={company}
                  error={errors.company === undefined ? false : true}
                  helperText={errors.company}

                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  id="title"
                  label="job title or designation"
                  name="title"
                  type="title"
                  onChange={Gettitle}
                  value={title}
                  error={errors.title === undefined ? false : true}
                  helperText={errors.title}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  name="location"
                  label="location"
                  id="location"
                  onChange={Getlocation}
                  value={location}
                  error={errors.location === undefined ? false : true}
                  helperText={errors.location}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <KeyboardDatePicker
                    required
                    margin="normal"
                    variant="outlined"
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
                    required
                    margin="normal"
                    id="to date"
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
                  label="currently working"
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
                  label="job description"
                  id="description"
                  onChange={Getdescription}
                  value={description}
                  error={errors.jobdescription === undefined ? false : true}
                  helperText={errors.jobdescription === undefined ? `${CharacterCount}/800` : errors.jobdescription}
                />
              </Grid>

              <Grid item xs={12}  >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="medium"
                  className={classes.submit}
                >
                  {Loader} {"   "} add Experience
          </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Fab color="primary" size="small" component={Link} to="/Getyourprofile" aria-label="add" style={{
        right: '1%',
        bottom: '20%',
        position: 'fixed',
      }}  >
        <ArrowBackIcon />
      </Fab>
    </React.Fragment>
  );
}


Experience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(Experience));
