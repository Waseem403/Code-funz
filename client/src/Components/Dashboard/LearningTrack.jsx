import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";



const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5, 10)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  }
}));

export default function CoreValues() {
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md" align="center">
        <Typography variant="h3" component="h1" gutterBottom>
          popular courses
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom>Show Your Skills And Idea Here.
</Typography>
      </Container>
    </div>
  );
}
