import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from '@material-ui/icons/Face';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DOB from './DOB'

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  bottoms: {
    marginBottom: theme.spacing(10),
  },
  backbtn: {
    [theme.breakpoints.up('sm')]: {
      left: '16.5%',
    },
    bottom: '20%',
    position: 'fixed',
  }
}));

function Bio(props) {
  const classes = useStyles();



  const { values, handleChange } = props;

  const continues = e => {
    e.preventDefault();
    props.nextStep();
  };
  const back = e => {
    e.preventDefault();
    props.prevStep();
  };



  return (
    <React.Fragment>
      <section className={classes.bottoms}>
        <Container component="main" maxWidth="md" className={classes.root}>
          <CssBaseline />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <FaceIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Social Media Section
                  </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  Please provide your social media contacts
               </Typography>
              </div>
            </Grid>
          </Grid>

          < Grid container spacing={2}>
            <Grid item xs={12}>
              <DOB props={props} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="bio"
                label="* Short bio"
                fullWidth
                name="bio"
                multiline
                rows="6"
                value={values.bio}
                onChange={handleChange("bio")}
                margin="normal"
                helperText="Tell us a little about yourself"
              />
            </Grid>
          </ Grid>
        </Container>
      </section>



      <Fab color="primary" size="small" aria-label="add" className={classes.backbtn} onClick={back} >
        <ArrowBackIcon />
      </Fab>

      <Fab color="primary" size="small" aria-label="add" style={{
        right: '1%',
        bottom: '20%',
        position: 'fixed',
      }} onClick={continues} >
        <ArrowForwardIcon />
      </Fab>
    </React.Fragment>
  )
}

export default Bio