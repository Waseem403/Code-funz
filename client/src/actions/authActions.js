import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  ERROR_LOADING,
  FORGOT_SUCCESSMSG,
  REGISTER_SUCCESSMSG,
  CLEAR_MSG
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
  dispatch(setAuthLoading());
  axios
    .post("/api/users/register", userData)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESSMSG,
        payload: res.data
      });
      dispatch({
        type: CLEAR_ERRORS,
        payload: res.data
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_MSG,
          payload: res.data
        });
      }, 6000)
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  dispatch(setAuthLoading());
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const {
        token
      } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch({
        type: CLEAR_ERRORS,
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

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const forgotPass = (userData, history) => dispatch => {
  dispatch(setAuthLoading());
  axios
    .post("/password/forgot", userData)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS,
        payload: res.data
      });
      dispatch({
        type: FORGOT_SUCCESSMSG,
        payload: res.data
      });
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

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const setAuthLoading = () => {
  return {
    type: ERROR_LOADING
  };
};