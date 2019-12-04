import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EventIcon from '@material-ui/icons/Event';
import CameraIcon from '@material-ui/icons/Camera';
import { Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  speedDial: {
    bottom: theme.spacing(18),
    right: theme.spacing(3),
    position: 'fixed'
  },
  colors: {
    color: "black"
  }
}));

const actions = [
  { icon: <EventIcon />, name: 'add Todos', url: '/Todos' },
  { icon: <i className="fas fa-graduation-cap"></i>, name: 'add education', url: "/Education" },
  { icon: <i className="fas fa-user-tie"></i>, name: 'add experience', url: "/Experience" },
  { icon: <CameraIcon />, name: 'update dp', url: "/Profilepic" },
  { icon: <EditIcon />, name: 'edit profile', url: "/edit-profile" },

];

export default function SpeedDialTooltipOpen() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden] = React.useState(false);


  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleOpen = () => {
    if (!hidden) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>

      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onBlur={handleClose}
        onClick={handleClick}
        onClose={handleClose}
        onFocus={handleOpen}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        open={open}
        size="small"
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            to={action.url}
            component={Link}
            onClick={handleClick}
            className={classes.colors}
          />
        ))}
      </SpeedDial>
    </div>
  );
}