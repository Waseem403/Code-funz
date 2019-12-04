import React from 'react';
import TodoList from "./Todolist"
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

function TodoLists(props) {
    const classes = useStyles();
    const { Todos } = props

    return <List className={classes.root}>
        {Todos.map(todos => <TodoList key={todos._id} todo={todos} />)}
    </List>
}

export default TodoLists