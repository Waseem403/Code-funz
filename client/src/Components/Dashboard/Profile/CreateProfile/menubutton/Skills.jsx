import React from "react";
import Footer from "../../../../Layouts/Footer";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import WorkIcon from '@material-ui/icons/Work';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';




const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(12),
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
  }
}));











function Skills(props) {
  const classes = useStyles();

  const { values, handleChange } = props;
  //function which continues
  const continues = e => {
    e.preventDefault();
    props.nextStep();
  };


  //function which go backs
  const back = e => {
    e.preventDefault();
    props.prevStep();
  };

  return (
    <React.Fragment>
      <section className={classes.bottoms}>
        <Container component="main" maxWidth="md" >
          <CssBaseline />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <WorkIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Skills
        </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                Let's Get Some skills Information To Make Your Profile Stand Out
               </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="frontendskills"
                label="* frontend skills"
                fullWidth

                name="frontendskills"
                value={values.frontendskills}
                onChange={handleChange("frontendskills")}
                margin="normal"
                helperText=" Please use comma separated values (eg. HTML,CSS,JavaScript)"
              />
            </Grid>
        
            <Grid item xs={12}>
              <TextField
                id="bussinessskills"
                label="* bussiness skills"
                fullWidth
                name="bussinessskills"
                value={values.bussinessskills}
                onChange={handleChange("bussinessskills")}
                margin="normal"
                helperText="Please use comma separated values (eg.nodejs,java PHP)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="backendskills"
                label=" * backend skills"
                fullWidth
                name="backendskills"
                value={values.backendskills}
                onChange={handleChange("backendskills")}
                margin="normal"
                helperText="Please use comma separated values (eg. mysql,mssql,mongodb)"
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                id="githubusername"
                label=" Github Username"
                fullWidth
                name="github username"
                value={values.githubusername}
                onChange={handleChange("githubusername")}
                margin="normal"
                helperText=" If you want your latest repos and a Github link, include your
                username"
              />
            </Grid>
          </Grid>

        </Container>
      </section>
      <Footer />

      <Fab color="primary" size="small" aria-label="add" style={{
        left: '1%',
        bottom: '20%',
        position: 'fixed',

      }} onClick={back} >
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

export default Skills;