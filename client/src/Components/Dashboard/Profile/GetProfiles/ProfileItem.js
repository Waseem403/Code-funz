import React from 'react';
import {
  connect
} from "react-redux";
import {
  makeStyles
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Link
} from "react-router-dom";
import blue from "@material-ui/core/colors/blue";
import Grid from "@material-ui/core/Grid";
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Divider from "@material-ui/core/Divider";
import Moment from 'react-moment';


import Friends from "./Friends"

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
  },

  divider: {
    margin: `${theme.spacing(3)}px 0`
  },
  heading: {
    fontWeight: "bold",
    align: "center",
    textDecoration: "none",
    color: "black",
    transition: "0.5s",
    "&:hover": {
      color: '#2196f3'
    }
  },
  button: {
    textTransform: 'capitalize',
    letterSpacing: '2px',
    transition: "1s",
    "&:hover": {
      backgroundColor: '#2196f3',
      color:'white'
    }
  },
  avatar: {
    width: 80,
    height: 80,
    display: "inline-block",
 
    "&:not(:first-of-type)": {
      marginLeft: -theme.spacing(1)
    }
  },
  small: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

function ProfileItem(props) {
  const classes = useStyles();
  const { profile, auth } = props;



  var ActionButtons = profile.user._id === auth.user.id ? <Button
    color="default"
    variant="outlined"
    size="small"
    className={classes.button}
  >
    <i class="fas fa-user-plus"></i> view
   </Button> : <Friends profile={profile} />

let UserShortName=profile.user.name.charAt(0)

  let Profile_Avatar=profile.avatar!==undefined?<Avatar alt="Remy Sharp" src={profile.avatar} className={classes.avatar} />:<Avatar style={{backgroundColor:profile.color}} className={classes.small}>{UserShortName}</Avatar>

  return (
    <div className="App" key={profile._id}>
      <Card className={classes.card} key={profile._id}>
        <CardContent className={classes.content}>
          <Grid container justify="center" alignItems="center" >
            {Profile_Avatar}
          </Grid><br />
          <Typography variant="subtitle1"
            component={Link}
            to={`/Getprofile/${profile.handle}`}
            align="center"
            className={classes.heading}
            gutterBottom>
            <i className="fas fa-user " />    {profile.user.name}
          </Typography>
          <Typography variant="caption" display="block" align="left" gutterBottom>
            <i className="fas fa-briefcase" />  {profile.status} at {profile.company}
          </Typography>
          <Typography variant="caption" display="block" align="left" gutterBottom>
            <i className="fas fa-map-marker-alt" /> {" "}  {profile.location}
          </Typography>
          <Typography variant="caption" display="block" align="left" gutterBottom>
            <i className="fas fa-user-cog " /> {"  "}
            {profile.work_exp} years of work experience
          </Typography>
          <Typography variant="caption" display="block" align="left" gutterBottom>
            <i class="fas fa-user-friends"></i>
            {"  "}  {profile.Followers.length} Followers
          </Typography>
          <Typography variant="caption" display="block" align="left" gutterBottom>
            <i class="far fa-calendar-alt"></i>  {"  "}
            joined on   <Moment format="DD MMM YYYY ">{profile.date}</Moment>
          </Typography>
          <Divider className={classes.divider} light />
          <Grid container justify="center" alignItems="center" >
            {ActionButtons}
          </Grid>
        </CardContent>

      </Card>
    </div>











  );
}


const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps, {},
)(ProfileItem)