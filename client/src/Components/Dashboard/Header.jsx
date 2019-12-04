import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import img from "../Images/bg.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundImage: `url(${img})`
  },
  icon: {
    marginTop: theme.spacing(15),
  },
  h4: {
    paddingTop: theme.spacing(4),
  },
  bodytext: {
    paddingBottom: theme.spacing(5)
  }
}));

export default function Types() {
  const classes = useStyles();

  return (
    <div className={classes.root} align="center">
      <CssBaseline />
      <Container maxWidth="md">
        <i
          className="fas fa-laptop-code fa-9x"
          style={{ paddingTop: "150px" }}
        />
        <Typography variant="h4" className={classes.h4} gutterBottom>
          Learn anything to anyone from anywhere
      </Typography>


        <Typography variant="h6" gutterBottom>
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Typography>

        <Typography variant="body2" className={classes.bodytext} gutterBottom>
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      </Container>

    </div>
  );
}