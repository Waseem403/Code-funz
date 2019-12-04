import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: blue[500]
    }
  },
  website: {
    color: blue[500],

  }
});

export default function Bio(props) {
  const classes = useStyles();
  const { profile } = props

  return (
    <Hidden smDown>
      <Card className={classes.card}>
        <CardContent>

          <Typography variant="h5" component="h2">
            <i class="fas fa-user" />{" "} {profile.user.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            @{profile.handle}
          </Typography>

          <Typography variant="caption" display="block" gutterBottom>
            {profile.bio}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            <i class="fas fa-briefcase" />
            {"  "}    {profile.status} @ {profile.company}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            <i class="fas fa-user-cog " />
            {"  "}  {profile.work_exp} {"years of work experience"}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            <i class="fas fa-map-marker-alt" />{" "}
            {profile.location}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            <i class="fas fa-birthday-cake"></i>{"  "}  <Moment format="DD-MM-YYYY">{profile.DOB}</Moment>
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            <i class="fas fa-link"></i>{" "}
            <Link to={`Getprofile/${profile.website}`} className={classes.link}>{profile.website}</Link>
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            <i class="far fa-calendar-alt"></i> joined on{" "}
            <Moment format="MMM YYYY">{profile.date}</Moment>
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            <i class="fas fa-user-friends"></i>
            {"  "}  {profile.Followers.length} Followers
          </Typography>
        </CardContent>
      </Card>
    </Hidden>
  );
}