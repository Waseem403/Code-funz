import axios from "axios";
import {
    POLL_LOADING,
    ADD_POLL,
    GET_POLLS,
    DELETE_POLL,
    GET_ERRORS,
    CLEAR_ERRORS,
    ERROR_LOADING
} from "./types";



//getting all the polls 
// Get Posts
export const Get_Polls = () => dispatch => {
    dispatch(setPollLoading());
    axios
        .get("/Poll/GetPolls")
        .then(res =>
            dispatch({
                type: GET_POLLS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POLLS,
                payload: null
            })
        );
};

// Add Post
export const Add_Poll = Poll_Data => dispatch => {
    dispatch(setPollLoading())
    axios
        .post("/Poll/AddPoll", Poll_Data)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS,
                payload: res.data
            });
            dispatch({
                type: ADD_POLL,
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


//getting opionions of others in the poll list.

// Add Post
export const Public_Opinion = (Poll_id, Selected_Option) => dispatch => {
    axios
        .post(`/Poll/Public_Opinion/${Poll_id}/${Selected_Option}`)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS,
                payload: res.data
            });
            dispatch({
                type: GET_POLLS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// edits Comment
export const Update_Poll = Poll_Id => dispatch => {
    axios
        .put(`/Poll/UpdatePoll/${Poll_Id}`)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS,
                payload: res.data
            });
            dispatch({
                type: GET_POLLS,
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


// Delete Post
export const deletePoll = id => dispatch => {
    axios
        .delete(`/Poll/Delete_Poll/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_POLL,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set loading state
export const setPollLoading = () => {
    return {
        type: POLL_LOADING
    };
};