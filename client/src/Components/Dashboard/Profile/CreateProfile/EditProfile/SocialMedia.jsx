import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PublicIcon from '@material-ui/icons/Public';
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
      left: '18.5%',
    },
    bottom: '20%',
    position: 'fixed',
  }
}));

function SocialMedia(props) {
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
                  <PublicIcon />
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="twitter"
                label="Twitter Profile URL"
                fullWidth
                name="twitter"
                value={values.twitter}
                onChange={handleChange("twitter")}
                margin="normal"

              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="facebook"
                label="FaceBook Profile URL"
                fullWidth
                name="facebook"
                value={values.facebook}
                onChange={handleChange("facebook")}
                margin="normal"

              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                id="Linkedin"
                label=" Linkedin Profile URL"
                fullWidth
                name="linkedin"
                value={values.linkedin}
                onChange={handleChange("linkedin")}
                margin="normal"

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="youtube"
                label="YouTube Channel URL"
                fullWidth
                name="youtube"
                value={values.youtube}
                onChange={handleChange("youtube")}
                margin="normal"

              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="instagram"
                label="instagram Profile URL"
                fullWidth
                name="instagram"
                value={values.instagram}
                onChange={handleChange("instagram")}
                margin="normal"
              />
            </Grid>
          </Grid>
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
  );
}


export default SocialMedia;
