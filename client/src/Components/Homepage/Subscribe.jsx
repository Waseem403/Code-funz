import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  }
}));

export default function Subscribe() {
  const classes = useStyles();
  return (
    <section className={classes.heroContent}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Subscribe Us
        </Typography>
        <Typography variant="caption" gutterBottom>
          To Get daily updates and new from the code funz :
        </Typography>
        <form>
          <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            margin="normal"
          />
        </form>
      </Container>
    </section>
  );
}
