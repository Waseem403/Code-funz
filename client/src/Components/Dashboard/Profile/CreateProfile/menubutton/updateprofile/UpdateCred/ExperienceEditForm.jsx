import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Update_experience_details } from "../../../../../../../actions/ProfilePosts";
import TextField from '@material-ui/core/TextField';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Footer from "../../../../../../Layouts/Footer"
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from "@material-ui/core/CircularProgress";






const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        textTransform: "capitalize"
    },
    errors: {
        paddingTop: "0.5%",
        paddingLeft: "1%",
        color: theme.palette.secondary.main,
        fontWeight: "bold"
    },
    dense: {
        fontSize: "12px"
    }
});


class ExperienceEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            id: '',
            errors: {},
            disabled: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.ondatefromChange = this.ondatefromChange.bind(this)
        this.ondatetoChange = this.ondatetoChange.bind(this)

    }


    componentDidMount() {
        const { experienceddetails } = this.props
        if (experienceddetails !== null) {
            this.setState({
                company: experienceddetails.company,
                title: experienceddetails.title,
                location: experienceddetails.location,
                from: experienceddetails.from,
                to: experienceddetails.current ? null : experienceddetails.to,
                current: experienceddetails.current,
                description: experienceddetails.description,
                id: experienceddetails._id,
                disabled: experienceddetails.current ? true : false
            })
        }
    }



    componentWillReceiveProps(NewProps) {
        if (NewProps.errors) {
            this.setState({ errors: NewProps.errors })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value, });
    }


    ondatefromChange(date) {
        this.setState({ from: date })
    }
    ondatetoChange(date) {
        this.setState({ to: date })
    }

    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    }
    //submiting the data here...
    onSubmit = e => {
        e.preventDefault();
        const { id } = this.state
        const eduData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.current ? null : this.state.to,
            current: this.state.current,
            description: this.state.description,
            handler: id
        };
        this.props.Update_experience_details(eduData, this.props.history);
    }
    render() {
        const { errors } = this.state
        const { classes } = this.props
        let loadertext = errors.loading ? "Updating... education" : "Update education"
        let loader = errors.loading ? <CircularProgress disableShrink style={{ color: "white" }} size={15} /> : null

        return (
            <React.Fragment>
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <EditIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            update Experience details
                    </Typography>
                        <Typography variant="caption" display="block" gutterBottom>
                            update (or) edit any job or position that you have done in past or current
                        </Typography>
                        <form onSubmit={this.onSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField
                                        autoComplete="company"
                                        name="company"
                                        fullWidth
                                        margin="dense"
                                        id="company"
                                        label="company name"
                                        required
                                        value={this.state.company}
                                        onChange={this.onChange}
                                        error={errors.company === undefined ? false : true}
                                        helperText={errors.company}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        margin="dense"
                                        id="title"
                                        label="title"
                                        name="title"
                                        type="title"
                                        value={this.state.title}
                                        onChange={this.onChange}
                                        error={errors.title === undefined ? false : true}
                                        helperText={errors.title}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        fullWidth
                                        margin="dense"
                                        name="location"
                                        label="location"
                                        id="location"
                                        value={this.state.location}
                                        onChange={this.onChange}
                                        error={errors.location === undefined ? false : true}
                                        helperText={errors.location}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                        <KeyboardDatePicker
                                            margin="normal"
                                            variant="outlined"
                                            required
                                            id="from data"
                                            placeholder="from date"
                                            format="dd/MM/yyyy"
                                            name="from"
                                            style={{ minWidth: '100%' }}
                                            value={this.state.from}
                                            onChange={this.ondatefromChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'from date',
                                            }}
                                            error={errors.from === undefined ? false : true}
                                            helperText={errors.from}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="to date"
                                            required
                                            format="dd/MM/yyyy"

                                            name="to"
                                            style={{ minWidth: '100%' }}
                                            value={this.state.to}
                                            onChange={this.ondatetoChange}
                                            disabled={this.state.disabled ? "disabled" : ""}
                                            KeyboardButtonProps={{
                                                'aria-label': 'to date',
                                            }}
                                            error={errors.to === undefined ? false : true}
                                            helperText={errors.to}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <FormControlLabel
                                        control={<Checkbox value={this.state.current}
                                            color="primary" />}
                                        label="currently studying"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        fullWidth
                                        multiline
                                        row="5"
                                        margin="dense"
                                        name="description"
                                        label="description"
                                        id="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                        error={errors.jobdescription === undefined ? false : true}
                                        helperText={errors.jobdescription}
                                    />
                                </Grid>

                                <Grid item xs={12}  >
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        className={classes.submit}
                                    >
                                        {loader}{"  "}{loadertext}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
                <Footer />
            </React.Fragment>


        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});
export default connect(
    mapStateToProps,
    { Update_experience_details }
)(withStyles(styles)(withRouter(ExperienceEditForm)));