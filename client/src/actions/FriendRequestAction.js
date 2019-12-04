import axios from "axios";
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS,
    ERROR_LOADING,
    CLEAR_ERRORS,
    SET_CURRENT_USER,
} from "./types";
import Pusher from 'pusher-js';


// Get all profiles
export const Friend_RequestSent = Profile_Id => dispatch => {
    axios
        .post(`Friends/RequestSent/${Profile_Id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILES,
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

export const Accept_Friend_RequestSent = Targeted_Id => dispatch => {
    axios
        .post(`Friends/AcceptedRequest/${Targeted_Id}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


export const Reject_Friend_RequestSent = Targeted_Id => dispatch => {
    axios
        .post(`Friends/RejectRequest/${Targeted_Id}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const Accept_Friend_RequestSent_From_Profiles = Profile_Id => dispatch => {
    axios
        .post(`Friends/AcceptRequestInfo/${Profile_Id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILES,
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