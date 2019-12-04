import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Hidden from '@material-ui/core/Hidden';
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="inherit" align="center">
      A new way to learn coding with Code funz
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(5),
    marginTop: 'auto',
    backgroundColor: 'inherit',
    color: 'black'
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  const [value, setValue] = React.useState('recents');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  let Footercontent = (
    <React.Fragment>
      <Hidden smUp>
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
          <BottomNavigationAction to="/dashboard"
            component={Link} label="Recents" value="recents" icon={<RestoreIcon />} />
          <BottomNavigationAction to="/posts"
            component={Link} label="Favorites" value="favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction to="/Getprofiles"
            component={Link} label="Nearby" value="nearby" icon={<LocationOnIcon />} />
          <BottomNavigationAction to="/Getyourprofile"
            component={Link} label="Folder" value="folder" icon={<FolderIcon />} />


        </BottomNavigation>

      </Hidden>
      <Hidden xsDown>
        <footer className={classes.footer}>
          <Container maxWidth="sm" align="center">
            <Typography variant="h5"> {'Copyright © code funz'}{"  "}
              {new Date().getFullYear()}</Typography>
            <Copyright />
          </Container>
        </footer>
      </Hidden>

    </React.Fragment>
  )

  return (<React.Fragment>
    {Footercontent}
  </React.Fragment>
  );
}