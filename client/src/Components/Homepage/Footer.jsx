import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import indigo from "@material-ui/core/colors/indigo";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: indigo["500"]
  },

  footer: {
    padding: theme.spacing(5),
    marginTop: "auto",
    color: "white"
  }
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer} align="center">
        <Container maxWidth="sm">
          <Typography variant="h4" component="h1">
            Code funz @ 2019
          </Typography>
        </Container>
      </footer>
    </div>
  );
}
