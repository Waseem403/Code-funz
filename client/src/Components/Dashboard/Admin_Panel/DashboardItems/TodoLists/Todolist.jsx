import React from 'react';
import { connect } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DeleteTodosList, UpdateTodosList } from "../../../../../actions/Widgetaction"

function Todolist(props) {
    const { todo } = props


    //creating a function which delete todo based on user selected.

    const DeleteTodo = id => {
        props.DeleteTodosList(id)
    }

    const EditTodo = id => {
        let todo = document.getElementById(id)
        todo.setAttribute("contentEditable", true)
        todo.focus()
    }

    const CompleteTodo = id => {
        props.UpdateTodosList(id)
    }

    const testing = id => {
        let t = document.getElementById(id).childNodes

        console.log(t)
    }


    return <ListItem key={todo._id} dense>
        <ListItemIcon>
            <Checkbox
                edge="start"
                checked={todo.IsComplete}
                tabIndex={-1}
                disableRipple
                color="primary"
                onClick={() => CompleteTodo(todo._id)}
                inputProps={{ 'aria-labelledby': todo._id }}
            />
        </ListItemIcon>
        <ListItemText id={todo._id} primary={todo.TodoText} onBlur={() => { testing(todo._id) }} style={{ textDecoration: todo.IsComplete === true ? "line-through" : null }} />
        <ListItemSecondaryAction>
            <IconButton edge="end" size="medium" aria-label="comments" onClick={() => DeleteTodo(todo._id)}>
                <DeleteIcon fontSize="small" color="secondary" />
            </IconButton>
            <IconButton edge="end" size="medium" aria-label="comments" disabled={todo.IsComplete == true ? true : false}>
                <EditIcon fontSize="small" color="primary" onClick={() => EditTodo(todo._id)} />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
}



const mapStateToProps = state => ({
    error: state.error,
});
export default connect(
    mapStateToProps, {
        DeleteTodosList, UpdateTodosList
    }
)(Todolist);