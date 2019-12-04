import React, { useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { addTodosList } from "../../../../../actions/Widgetaction"
import { getCurrentProfile } from "../../../../../actions/profileActions"
import TodoLists from "./TodoLists"
import Footer from "../../../../Layouts/Footer"

const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            backgroundColor: '#eeeeee'
        }
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },

    root1: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(30)
        },
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        borderRadius: '0px'
    },
    btn: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(0)
    }
}));

function index(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    const [Todo, SetTodo] = React.useState('')

    //getting the user input from the input field
    const Get_Todos = e => {
        SetTodo(e.target.value)
    }

    //submiting the user input todo data
    const TodoSubmit = e => {
        e.preventDefault()
        props.addTodosList(Todo)
        SetTodo('')
    }

    //getting the user profile using use effect method

    useEffect(() => {
        props.getCurrentProfile()
    }, []);


    const { profile, loading } = props.profile;
    let TodosContent
    if (profile === null || loading) {
        TodosContent = (
            <div
                align="center"
                style={{ marginTop: "100px", marginBottom: "100px" }}
            >
                <CircularProgress disableShrink size={130} />
            </div>
        );
    } else {
        TodosContent = <React.Fragment>
            <TodoLists Todos={profile.TodosList} />
        </React.Fragment>
    }

    return (
        <Container component="main" maxWidth="lg" className={classes.root1}>
            <Typography component="h1" variant="h5" align="center">Todo-List section</Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="main-todo-input-wrap">
                                <div class="main-todo-input fl-wrap">
                                    <form onSubmit={TodoSubmit}>
                                        <div class="main-todo-input-item">
                                            <input type="text"
                                                id="todo-list-item"
                                                placeholder="What will you do today?"
                                                value={Todo}
                                                onChange={Get_Todos}
                                                maxLength="100"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <button type="submit" class="add-items main-search-button">ADD</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    {TodosContent}
                </Grid>
            </Grid>
            <Footer />
        </Container>
    );
}

index.propTypes = {
    addTodosList: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,

});

export default connect(
    mapStateToProps, {
        addTodosList,
        getCurrentProfile
    }
)(index);