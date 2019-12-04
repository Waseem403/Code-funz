import React, { useState, useEffect } from "react";
import { createProfile } from "../../../../../actions/profileActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';


const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  root: {
    width: '100%',
    overflowX: 'auto',

  },
  root1: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(30)
    },
  },
  errorsign: {
    color: red[700]
  },
  table: {
    minWidth: 650,
  },
  backbtn: {
    [theme.breakpoints.up('sm')]: {
      left: '16.5%',
    },
    bottom: '20%',
    position: 'fixed',
  }
}));



function Confirm(props) {
  const classes = useStyles();
  //getting the user all details
  const { values } = props;

  const [errors, seterrors] = useState({})

  //calling the submition form function here...
  const submit = e => {
    e.preventDefault();
    const profileData = {
      handle: props.values.handle,
      company: props.values.company,
      website: props.values.website,
      location: props.values.location,
      work_exp: props.values.work_exp,
      status: props.values.status,
      frontendskills: props.values.frontendskills.toString(),
      bussinessskills: props.values.bussinessskills.toString(),
      backendskills: props.values.backendskills.toString(),
      githubusername: props.values.githubusername,
      bio: props.values.bio,
      DOB: props.values.DOB,
      twitter: props.values.twitter,
      facebook: props.values.facebook,
      linkedin: props.values.linkedin,
      youtube: props.values.youtube,
      instagram: props.values.instagram
    };
    console.log(profileData)
    props.createProfile(profileData, props.history);
  };

  console.log(props)
  const back = e => {
    e.preventDefault();
    props.prevStep();
  };

  //getting the data from the server by using the below function
  useEffect(() => {
    seterrors(props.errors)
  }, [props.errors])

  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg" className={classes.root1}>
        <CssBaseline />
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">S.no</TableCell>
                <TableCell align="left">Default names</TableCell>
                <TableCell align="left">Your details</TableCell>
                <TableCell align="left">errors</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/*row 1*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"1"}
                </TableCell>
                <TableCell align="left">{"* handle"}</TableCell>
                <TableCell align="left">{values.handle}</TableCell>
                <TableCell align="left" className={classes.errorsign} >
                  {errors.handle}</TableCell>
              </TableRow>

              {/*row 1*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"2"}
                </TableCell>
                <TableCell align="left">{"* status"}</TableCell>
                <TableCell align="left">{values.status}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.status}</TableCell>
              </TableRow>


              {/*row 3*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"3"}
                </TableCell>
                <TableCell align="left">{"* company name"}</TableCell>
                <TableCell align="left">{values.company}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.company}</TableCell>
              </TableRow>

              {/*row 4*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"4"}
                </TableCell>
                <TableCell align="left">{"* location"}</TableCell>
                <TableCell align="left">{values.location}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.location}</TableCell>
              </TableRow>

              {/*row 5*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"5"}
                </TableCell>
                <TableCell align="left">{"* work experienc"}</TableCell>
                <TableCell align="left">{values.work_exp}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.work_exp}</TableCell>
              </TableRow>


              {/*row 6*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"6"}
                </TableCell>
                <TableCell align="left">{"* frontendskills"}</TableCell>
                <TableCell align="left">{values.frontendskills}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.frontendskills}
                </TableCell>
              </TableRow>


              {/*row 7*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"7"}
                </TableCell>
                <TableCell align="left">{"* bussinessskills"}</TableCell>
                <TableCell align="left">{values.bussinessskills}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.bussinessskills}</TableCell>
              </TableRow>


              {/*row 8*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"8"}
                </TableCell>
                <TableCell align="left">{"* backendskills"}</TableCell>
                <TableCell align="left">{values.backendskills}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.backendskills}</TableCell>
              </TableRow>


              {/*row 9*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"9"}
                </TableCell>
                <TableCell align="left">{"githubusername"}</TableCell>
                <TableCell align="left">{values.githubusername}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.githubusername}</TableCell>
              </TableRow>

              {/*row 10*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"10"}
                </TableCell>
                <TableCell align="left">{"website"}</TableCell>
                <TableCell align="left">{values.website}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.website}</TableCell>
              </TableRow>


              {/*row 11*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"11"}
                </TableCell>
                <TableCell align="left">{"twitter"}</TableCell>
                <TableCell align="left">{values.twitter}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.twitter}</TableCell>
              </TableRow>



              {/*row 12*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"12"}
                </TableCell>
                <TableCell align="left">{"facebook"}</TableCell>
                <TableCell align="left">{values.facebook}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.facebook}</TableCell>
              </TableRow>



              {/*row 13*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"13"}
                </TableCell>
                <TableCell align="left">{"linkedin"}</TableCell>
                <TableCell align="left">{values.linkedin}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.linkedin}</TableCell>
              </TableRow>

              {/*row 14*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"14"}
                </TableCell>
                <TableCell align="left">{"youtube"}</TableCell>
                <TableCell align="left">{values.youtube}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.youtube}</TableCell>
              </TableRow>

              {/*row 15*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"15"}
                </TableCell>
                <TableCell align="left">{"instagram"}</TableCell>
                <TableCell align="left">{values.instagram}</TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.instagram}</TableCell>
              </TableRow>

              {/*row 16*/}
              <TableRow >
                <TableCell component="th" scope="row" align="left">
                  {"16"}
                </TableCell>
                <TableCell align="left">{"* date of birth"}</TableCell>
                <TableCell align="left"><Moment format="DD/MM/YYYY">{values.DOB}</Moment></TableCell>
                <TableCell align="left" className={classes.errorsign}>{errors.DOB}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" display="inline" gutterBottom>
              * Bio details: {" "}
            </Typography>
            <Typography variant="caption" display="inline" gutterBottom>
              {values.bio}
            </Typography>
            <Typography variant="h4" align="center" color="secondary" gutterBottom>
              {errors.bio}
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <Button variant="contained" small="small" style={{ textTransform: 'capitalize' }} color="primary" onClick={submit}>
              submit
           </Button>
          </Grid>

        </Grid>
      </Container>
      <Fab color="primary" size="small" aria-label="add" className={classes.backbtn} onClick={back} >
        <ArrowBackIcon />
      </Fab>
    </React.Fragment>
  );
}


Confirm.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(Confirm));