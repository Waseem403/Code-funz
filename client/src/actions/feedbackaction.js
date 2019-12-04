import axios from "axios";
import {
  ADD_FEEDBACK,
  GET_ERRORS,
  CLEAR_ERRORS,
  DELETE_FEEDBACK,
  GET_FEEDBACK,
  FEED_LOADING,
  ERROR_LOADING
} from "./types";



//getting the all feedback

export const getFeeds = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/feedback/getfeeds")
    .then(res =>
      dispatch({
        type: GET_FEEDBACK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};


// Add Feedback
export const addFeedback = postData => dispatch => {
  dispatch(setErrorLoading());
  axios
    .post("/feedback/rateus", postData)
    .then(res => {
      dispatch({
        type: ADD_FEEDBACK,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Edit Feedback
export const UpdateFeedback = (Updatedata, FeedId) => dispatch => {
  dispatch(setErrorLoading());
  axios
    .put(`/feedback/UpdateFeed/${FeedId}`, Updatedata)
    .then(res => {
      dispatch({
        type: GET_FEEDBACK,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// delete feedback
export const deleteFeed = id => dispatch => {
  axios
    .delete(`/feedback/rate:${id}`)
    .then(res =>
      dispatch({
        type: DELETE_FEEDBACK,
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
export const setErrorLoading = () => {
  return {
    type: ERROR_LOADING
  };
};


// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: FEED_LOADING
  };
};