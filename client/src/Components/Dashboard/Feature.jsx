import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function Courses() {
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md" >
        <Typography variant="h3" align="center" component="h1" gutterBottom>
          feature Courses        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Heading
                    </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button size="small" color="primary">
                  View
                    </Button>
              </CardActions>
            </Card>
          </Grid>
          {/*end of first col1*/}

          <Grid item xs={12} sm={4} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button size="small" color="primary">
                  View
                    </Button>
              </CardActions>
            </Card>
          </Grid>
          {/*end of second col2*/}
          <Grid item xs={12} sm={4} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button size="small" color="primary">
                  View
                    </Button>
              </CardActions>
            </Card>
          </Grid>
          {/*end of third col3*/}
        </Grid>
        {/*end of firsr row1*/}


        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button size="small" color="primary">
                  View
                    </Button>
              </CardActions>
            </Card>
          </Grid>
          {/*end of first col1*/}

          <Grid item xs={12} sm={4} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button size="small" color="primary">
                  View
                    </Button>
              </CardActions>
            </Card>
          </Grid>
          {/*end of second col2*/}
          <Grid item xs={12} sm={4} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button size="small" color="primary">
                  View
                    </Button>
              </CardActions>
            </Card>
          </Grid>
          {/*end of third col3*/}
        </Grid>
        {/*end of firsr row1*/}


        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button size="small" color="primary">
                  View
                    </Button>
              </CardActions>
            </Card>
          </Grid>
          {/*end of first col1*/}

          <Grid item xs={12} sm={4} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button size="small" color="primary">
                  View
                    </Button>
              </CardActions>
            </Card>
          </Grid>
          {/*end of second col2*/}
          <Grid item xs={12} sm={4} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button size="small" color="primary">
                  View
                    </Button>
              </CardActions>
            </Card>
          </Grid>
          {/*end of third col3*/}
        </Grid>
        {/*end of firsr row1*/}
      </Container>
    </div>
  );
}
