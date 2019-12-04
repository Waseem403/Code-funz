import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
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
        <Typography variant="h2" component="h1" gutterBottom>
          A better way to work together
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom>
              Write better code
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
              inventore id explicabo beatae eligendi. Corrupti fugiat quod a
              tempora error!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom>
              Code security
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
              inventore id explicabo beatae eligendi. Corrupti fugiat quod a
              tempora error!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom>
              Access controlled
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
              inventore id explicabo beatae eligendi. Corrupti fugiat quod a
              tempora error!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom>
              Usability
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
              inventore id explicabo beatae eligendi. Corrupti fugiat quod a
              tempora error!
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
