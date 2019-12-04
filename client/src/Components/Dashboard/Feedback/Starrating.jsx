import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  title: {
    paddingTop: theme.spacing(8)
  },
  main: {
    marginBottom: theme.spacing(8)
  },
  progressbar: {
    paddingTop: theme.spacing(8)
  },
  avgrating: {
    paddingTop: theme.spacing(2)
  }
}));

function Starrating(props) {
  const classes = useStyles();
  const { feed } = props;

  //initing the const value for stars whihc to help for conditions
  const star5 = 5;
  const star4 = 4;
  const star3 = 3;
  const star2 = 2;
  const star1 = 1;
  // declaration of variable to store the star rating given by users
  let stars_5 = 0;
  let stars_4 = 0;
  let stars_3 = 0;
  let stars_2 = 0;
  let stars_1 = 0;

  let Total_Rating = 0;
  feed.forEach(element => {
    if (element.stars === star5) {
      stars_5++;
    } else if (element.stars === star4) {
      stars_4++;
    } else if (element.stars === star3) {
      stars_3++;
    } else if (element.stars === star2) {
      stars_2++;
    } else if (element.stars === star1) {
      stars_1++;
    }
    Total_Rating = Total_Rating + element.stars;
  });
  const total_reviewers = feed.length;

  const avg_rating = Total_Rating / total_reviewers;


  return (
    <React.Fragment>
      <Container component="main" className={classes.main} maxWidth="md">
        <CssBaseline />
        <Typography
          component="h1"
          align="center"
          color="textSecondary"
          variant="h5"
          className={classes.title}
        >
          Reviews and feedbacks
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4} md={4} lg={4} sm={4}>
            <Box mt={8}>
              <Typography
                component="h1"
                color="primary"
                variant="h2"
                align="center"
                className={classes.avgrating}
              >
                {isNaN(avg_rating) ? 0 : avg_rating.toFixed(1).toString()}
              </Typography>
              <Typography variant="body2" align="center" gutterBottom>
                out of 5 stars
              </Typography>
              <Typography
                variant="caption"
                align="center"
                display="block"
                gutterBottom
              >
                based on {total_reviewers} reviews
              </Typography>{" "}
            </Box>
          </Grid>

          <Grid item xs={8} md={8} lg={8} sm={8}>
            <Box mt={-5}>
              <Typography
                variant="caption"
                className={classes.progressbar}
                display="block"
                gutterBottom
              >
                5 star rating :
              </Typography>{" "}
              <LinearProgress variant="determinate" value={stars_5} />{" "}
            </Box>
            <Box mt={-5}>
              <Typography
                variant="caption"
                className={classes.progressbar}
                display="block"
                gutterBottom
              >
                4 star rating :
              </Typography>{" "}
              <LinearProgress variant="determinate" value={stars_4} />{" "}
            </Box>
            <Box mt={-5}>
              <Typography
                variant="caption"
                className={classes.progressbar}
                display="block"
                gutterBottom
              >
                3 star rating :
              </Typography>{" "}
              <LinearProgress variant="determinate" value={stars_3} />{" "}
            </Box>
            <Box mt={-5}>
              <Typography
                variant="caption"
                className={classes.progressbar}
                display="block"
                gutterBottom
              >
                2 star rating :
              </Typography>{" "}
              <LinearProgress variant="determinate" value={stars_2} />{" "}
            </Box>
            <Box mt={-5}>
              <Typography
                variant="caption"
                className={classes.progressbar}
                display="block"
                gutterBottom
              >
                1 star rating :
              </Typography>{" "}
              <LinearProgress variant="determinate" value={stars_1} />{" "}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

Starrating.propTypes = {
  feed: PropTypes.array.isRequired
};

export default Starrating;
