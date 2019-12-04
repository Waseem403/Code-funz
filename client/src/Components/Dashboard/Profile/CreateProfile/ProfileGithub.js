import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import grey from '@material-ui/core/colors/grey';
import Badge from '@material-ui/core/Badge';




const styles = theme => ({
  root: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  colorsavatar: {
    backgroundColor: grey[900]
  },
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
});


class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "26c196bacea7db10cf48",
      clientSecret: "0885cb690e07d2a93a6afb0891fb552fd9f7aa53",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return [
            {
              id: 404,
              description: "error 404 not found",
              name: "error 404 not found"
            }
          ];
        }
      })
      .then(data => {
        if (this.refs.myRef) {
          this.setState({
            repos: data
          });
        }
      })
      .catch(err =>
        this.setState({
          repos: {
            msg: "No Profile found"
          }
        })
      );
  }

  render() {
    const { repos } = this.state;

    const { classes } = this.props
    const repoItems = repos.map(repo => {
      if (repo.id !== 404) {
        return (
          <React.Fragment key={repo.id}>
            <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                <Avatar className={classes.colorsavatar}>
                  <i className="fab fa-github black-text" />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={repo.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                      className={classes.inline}
                    />
                    {repo.description}
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Badge color="primary" badgeContent={repo.stargazers_count} className={classes.margin}>
                      <i className="fas fa-star"></i> {" stars"}
                    </Badge>

                  </React.Fragment>
                }
              />
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Badge color="primary" badgeContent={repo.watchers_count} className={classes.margin}>
                      <i className="fas fa-eye"></i> {" watchers"}
                    </Badge>
                  </React.Fragment>
                }
              />
              <ListItemText
                secondary={
                  <React.Fragment>

                    <Badge color="primary" badgeContent={repo.forks_count} className={classes.margin}>
                      <i className="fas fa-code-branch"></i>  {" forks"}
                    </Badge>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      } else if (repo.id === 404) {
        return (
          <div>
            <li className="center-align">
              No Profile with that username found{" "}
            </li>{" "}
          </div>
        );
      }
      return null
    });

    return (
      <React.Fragment>
        <div ref="myRef">
          {" "}
          <List className={classes.root}>
            <ListItem>
              <ListItemText
                primary="Github Projects"
                secondary={
                  <React.Fragment>
                    <Typography
                      variant="caption"
                      color="textPrimary"
                      gutterBottom
                    />
                    list of github Projects along with the details.
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />

            {repoItems}
          </List>
        </div>{" "}
      </React.Fragment>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default withStyles(styles)(ProfileGithub);
