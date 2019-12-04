import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Footer from "../../Layouts/Footer"
const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    paper: {
        marginTop: theme.spacing(15),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
}));

export default function index() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <i class="fab fa-js-square"></i>
                </Avatar>
                <Typography component="h1" variant="h3">Javascript </Typography>

                <div className={classes.heroContent}>
                    <Container maxWidth="md" align="center">

                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Avatar className={classes.avatar}>
                                    <i class="fab fa-js-square"></i>
                                </Avatar>
                                <Typography variant="h6" gutterBottom>
                                    learn Javascript
                            </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
                                    nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
                                    inventore id explicabo beatae eligendi. Corrupti fugiat quod a
                                    tempora error!
                             </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Avatar className={classes.avatar}>
                                    <i class="fab fa-js-square"></i>
                                </Avatar>
                                <Typography variant="h6" gutterBottom>
                                    take challenges
                                 </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
                                    nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
                                    inventore id explicabo beatae eligendi. Corrupti fugiat quod a
                                    tempora error!
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Avatar className={classes.avatar}>
                                    <i class="fab fa-js-square"></i>
                                </Avatar>
                                <Typography variant="h6" gutterBottom>
                                    take quiz
                               </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
                                    nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
                                    inventore id explicabo beatae eligendi. Corrupti fugiat quod a
                                    tempora error!
                             </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Avatar className={classes.avatar}>
                                    <i class="fab fa-js-square"></i>
                                </Avatar>
                                <Typography variant="h6" gutterBottom>
                                    get certification
                           </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
                                    nobis sapiente reprehenderit odio ab modi nisi alias, iure quas
                                    inventore id explicabo beatae eligendi. Corrupti fugiat quod a
                                    tempora error! this is a test
                            </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                <Footer />
            </div>
        </React.Fragment>
    );
}
