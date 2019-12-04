import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from '@material-ui/core/Hidden';
import Socialbtn from "./Socialbtn"
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import blue from '@material-ui/core/colors/blue';
import isEmpty from "../../../../validation/is-empty";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import MessageIcon from '@material-ui/icons/Message';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';


const useStyles = makeStyles(muiBaseTheme => ({
  card: {
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  },
  media: {
    paddingTop: "25.25%",
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing(3)
  },
  divider: {
    margin: `${muiBaseTheme.spacing(3)}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    width: 100,
    height: 100,
    aling: 'left',
    marginTop: "-7%",
    borderRadius: '8%',
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing(0)
    }
  },
  socialmedia: {
    display: "inline-block",
    border: "2px solid white",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: muiBaseTheme.palette.common.white,
    marginTop: muiBaseTheme.spacing(1)
  },
  avatarmob: {
    margin: 10,
    width: 60,
    height: 60,
    backgroundColor: muiBaseTheme.palette.secondary.main,
    alignItems: "center"
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
  },
  socialbtnmob: {
    marginBottom: '3.5%'
  },
  button: {
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    textTransform: 'capitalize'
  }
}));

function ProfileHeader(props) {

  const classes = useStyles();
  const { profile, auth } = props;

  const Show_AddFriend_Button = auth.user.name === profile.user.name ? null :
    <React.Fragment>
      <Button color="primary" variant="contained" size="small" className={classes.button}>
        <MessageIcon />{" "} message
     </Button>{"  "}
      <Button color="primary" variant="contained" size="small" className={classes.button}>
        <PersonOutlineIcon /> {"  "}add friend
   </Button>
    </React.Fragment>

  return (
    <React.Fragment>
      <Hidden smDown>
        <div className="App">
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={profile.BgImage}
            />
            <CardContent className={classes.content}>
              <Avatar className={classes.avatar} key={""} src={profile.avatar} />
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="h5" component="h2">
                    {profile.user.name}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    @{profile.handle}
                  </Typography><br />
                  {Show_AddFriend_Button}
                </Grid>
              </Grid>
              <Divider className={classes.divider} light />
              <Socialbtn profile={props.profile} />
            </CardContent>
          </Card>
        </div>
      </Hidden>

      <Hidden mdUp>
        <div className={classes.paper}>
          <Avatar className={classes.avatarmob} src={profile.avatar} />
          <Container component="main" align="center" maxWidth="md">
            <CssBaseline />
            <Typography component="h1" variant="h5">
              {profile.user.name}
            </Typography>
            <Typography component="h1" variant="h6" color="textSecondary">
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
            <Divider className={classes.divider} light />
            {/*socila media icons for the links*/}
            <div className={classes.socialbtnmob}>
              {isEmpty(profile.website) ? (
                ""
              ) : (
                  <Link
                    className="black"
                    size="large"
                    color="white"
                    to={profile.website}
                    target="_blank"
                    style={{ marginLeft: '8.2%' }}
                  >
                    <i className="fas fa-globe fa-1x" />
                  </Link>
                )}
              {isEmpty(profile.social && profile.social.twitter) ? null : (
                <Link
                  className="blue accent-1"
                  style={{ marginLeft: "10%" }}
                  to={profile.social.twitter}
                  target="_blank"
                >
                  <i className="fab fa-twitter fa-1x" />
                </Link>
              )}
              {isEmpty(profile.social && profile.social.facebook) ? null : (
                <Link
                  color="primary"
                  size="large"
                  style={{ marginLeft: "10%" }}
                  to={profile.social.facebook}
                  target="_blank"
                >
                  <i class="fab fa-facebook-f fa-1x" />{" "}
                </Link>
              )}
              {isEmpty(profile.social && profile.social.linkedin) ? null : (
                <Link
                  className="indigo"
                  size="large"
                  style={{ marginLeft: "10%" }}
                  to={profile.social.linkedin}
                  target="_blank"
                >
                  <i class="fab fa-linkedin-in fa-1x" />{" "}
                </Link>
              )}
              {isEmpty(profile.social && profile.social.youtube) ? null : (
                <Link
                  className="red"
                  size="large"
                  style={{ marginLeft: "10%" }}
                  to={profile.social.youtube}
                  target="_blank"
                >
                  <i className="fab fa-youtube fa-1x" />
                </Link>
              )}
              {isEmpty(profile.social && profile.social.instagram) ? null : (
                <Link
                  className=" deep-orange darken-1"
                  size="large"
                  style={{
                    marginLeft: "10%"
                  }}
                  to={profile.social.instagram}
                  target="_blank"
                >
                  <i className="fab fa-instagram fa-1x" />
                </Link>
              )}
            </div>
          </Container>
        </div>
      </Hidden>
    </React.Fragment>
  );
}


const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {},
)(ProfileHeader)