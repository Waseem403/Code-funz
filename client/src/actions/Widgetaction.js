import axios from "axios";
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS,
    ERROR_LOADING,
    CLEAR_ERRORS,
    SET_CURRENT_USER
} from "./types";


//adding new todo list 
export const addTodosList = TodoData => dispatch => {
    axios
        .post(`/Widget/addtodos/${TodoData}`)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS,
                payload: res.data
            });
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//deleting the existing todo list based on our user request

export const DeleteTodosList = TodoData => dispatch => {
    axios
        .delete(`/Widget/Todosdelete/${TodoData}`)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS,
                payload: res.data
            });
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//update the existing todo to is complete to true

export const UpdateTodosList = TodoData => dispatch => {
    axios
        .put(`/Widget/TodosUpdate/${TodoData}`)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS,
                payload: res.data
            });
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};