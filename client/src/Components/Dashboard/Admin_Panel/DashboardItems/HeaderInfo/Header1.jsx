import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({

    card: {
        maxWidth: 300,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        },

    },
    content: {
        textAlign: "left",
        padding: theme.spacing(3)
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
}));

const Budget = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <Card
            {...rest}
            className={classes.card}
        >
            <CardContent className={classes.content}>
                <Grid
                    container
                    justify="space-between"
                >
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            BUDGET
               </Typography>
                        <Typography variant="h3" className={classes.heading}>$24,000</Typography>
                    </Grid>

                </Grid>
                <div className={classes.difference}>
                    <ArrowDownwardIcon className={classes.differenceIcon} />
                    <Typography
                        className={classes.differenceValue}
                        variant="body2"
                    >
                        12%
                   </Typography>
                    <Typography
                        className={classes.caption}
                        variant="caption"
                    >
                        Since last month
                     </Typography>
                    <LinearProgress variant="determinate" className={classes.progress} value={100} />

                </div>
            </CardContent>
        </Card>
    );
};

Budget.propTypes = {
    className: PropTypes.string
};

export default Budget;
