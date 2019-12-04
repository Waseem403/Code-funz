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


// follow peoples
export const Follow_Peoples = Profile_User => dispatch => {
    axios
        .post(`Follow/FollowPeople/${Profile_User}`)
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


// Unfollow peoples
export const UnFollow_Peoples = Profile_User => dispatch => {
    axios
        .post(`Follow/UnFollowPeople/${Profile_User}`)
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