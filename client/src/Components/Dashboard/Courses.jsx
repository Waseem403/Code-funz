import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5, 10)
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
        <Typography variant="h3" component="h1" gutterBottom>
          popular courses
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={4}>
            <i className="fab fa-js-square fa-6x" style={{ color: "yellow" }} />
            <Typography variant="h6" gutterBottom>
              javascript
            </Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
              inventore id explicabo beatae eligendi. Corrupti fugiat quod a
              tempora error!
            </Typography>
            <Fab color="secondary" size="small" aria-label="edit" className={classes.fab}>
              <EditIcon />
            </Fab>
          </Grid>
          {/* end of javascript*/}
          <Grid item xs={12} sm={4} md={4}>
            <i className="fab fa-java fa-6x" style={{ color: "tomato" }} />
            <Typography variant="h6" gutterBottom>
              javascript
            </Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
              inventore id explicabo beatae eligendi. Corrupti fugiat quod a
              tempora error!
            </Typography>
            <Fab color="secondary" size="small" aria-label="edit" className={classes.fab}>
              <EditIcon />
            </Fab>
          </Grid>
          {/* end of javascript*/}
          <Grid item xs={12} sm={4} md={4}>
            <i className="fas fa-database fa-6x" style={{ color: "blue" }} />
            <Typography variant="h6" gutterBottom>
              javascript
            </Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
              inventore id explicabo beatae eligendi. Corrupti fugiat quod a
              tempora error!
            </Typography>
            <Fab color="secondary" size="small" aria-label="edit" className={classes.fab}>
              <EditIcon />
            </Fab>
          </Grid>
          {/* end of javascript*/}
          <Grid item xs={12} sm={4} md={4}>
            <i className="fab fa-html5 fa-6x" style={{ color: "#29b6f6" }} />
            <Typography variant="h6" gutterBottom>
              javascript
            </Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
              inventore id explicabo beatae eligendi. Corrupti fugiat quod a
              tempora error!
            </Typography>
            <Fab color="secondary" size="small" aria-label="edit" className={classes.fab}>
              <EditIcon />
            </Fab>
          </Grid>
          {/* end of javascript*/}
          <Grid item xs={12} sm={4} md={4}>
            <i
              className="fas fa-laptop-code fa-6x"
              style={{ color: "#00897b" }}
            />            <Typography variant="h6" gutterBottom>
              javascript
            </Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
              inventore id explicabo beatae eligendi. Corrupti fugiat quod a
              tempora error!
            </Typography>
            <Fab color="secondary" size="small" aria-label="edit" className={classes.fab}>
              <EditIcon />
            </Fab>
          </Grid>
          {/* end of javascript*/}
          <Grid item xs={12} sm={4} md={4}>
            <i
              className="fas fa-calculator fa-6x"
              style={{ color: "#ffb74d" }}
            />            <Typography variant="h6" gutterBottom>
              javascript
            </Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
              inventore id explicabo beatae eligendi. Corrupti fugiat quod a
              tempora error!
            </Typography>
            <Fab color="secondary" size="small" aria-label="edit" className={classes.fab}>
              <EditIcon />
            </Fab>
          </Grid>
          {/* end of javascript*/}
        </Grid>
      </Container>
    </div>
  );
}
