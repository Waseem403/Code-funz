import axios from "axios";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  ERROR_LOADING,
  CONTACT_SUCCESSMSG,
  CLEAR_MSG
} from "./types";

// Add Post
export const contactus = postData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("/api/contacts/contactus", postData)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS,
        payload: res.data
      });
      dispatch({
        type: CONTACT_SUCCESSMSG,
        payload: res.data
      })
      setTimeout(() => {
        dispatch({
          type: CLEAR_MSG,
          payload: res.data
        });
      }, 6000)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



export const setProfileLoading = () => {
  return {
    type: ERROR_LOADING
  };
};