import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { grey, green, blue, deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }, frontendskills: {
    backgroundColor: grey[50],
    color: deepOrange[400]
  },
  serverskills: {
    backgroundColor: grey[50],
    color: green[500]
  },
  backskills: {
    backgroundColor: grey[50],
    color: blue[800]
  }
}));

export default function ProfileAbout(props) {
  const classes = useStyles();
  const { profile } = props;

  // Skill List
  const frontendskills = profile.frontendskills.map((skill, index) => (
    <span key={index}>
      <i className="fa fa-check pr-1 " /> {skill},{"  "}
    </span>
  ));
  const bussinessskills = profile.bussinessskills.map((skill, index) => (
    <span key={index}>
      <i className="fa fa-check pr-1 " /> {skill},{"  "}
    </span>
  ));
  const backendskills = profile.backendskills.map((skill, index) => (
    <span key={index}>
      <i className="fa fa-check pr-1 " /> {skill},{"  "}
    </span>
  ));
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.frontendskills}>
            <i className="fab fa-html5 " />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Frontend skills"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {frontendskills}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.serverskills}>
            <i className="fab fa-node-js " />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="bussiness skills"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {bussinessskills}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.backskills}>
            <i className="fas fa-database " />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="backendskills"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {backendskills}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
