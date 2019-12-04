import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  CLEAR_ERRORS,
  ERROR_LOADING,
  GET_EDUCATIONAL_DETAILS,
  GET_EXPERIENCE_DETAILS,
  EDIT_LOADING,
  CLEAR_EDIT_LOADING,
} from "./types";





//setting the todos to complete action.

export const SetTodosComplete = Todostatus => dispatch => {
  axios
    .post("/api/profile/TodosStatus", Todostatus)
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
}

//getting the eduction details by its id
export const getEducationDetails = id => dispatch => {
  dispatch(setEditLoading())
  axios
    .get(`/api/profile/geteducationallist/${id}`)
    .then(res => {
      dispatch({
        type: GET_EDUCATIONAL_DETAILS,
        payload: res.data
      })
      dispatch(setClearLoading())
    })
    .catch(err =>
      dispatch({
        type: GET_EDUCATIONAL_DETAILS,
        payload: null
      })
    );
};

//updating the existing educational details
export const Update_educational_details = (eduData, history) => dispatch => {
  dispatch(seterrorsLoading());
  axios
    .put(`/api/profile/UpdatedEducation`, eduData)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS,
        payload: res.data
      });
      history.push("/Getyourprofile")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//deleting the existing education details based on their id
export const Delete_educational_details = id => dispatch => {
  dispatch(setEditLoading())
  axios
    .delete(`/api/profile/DeleteEducationallist/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
      dispatch(setClearLoading())
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}


//getting the experience details by its id
export const getExperienceDetails = id => dispatch => {
  dispatch(setEditLoading())
  axios
    .get(`/api/profile/getexperiencelist/${id}`)
    .then(res => {
      dispatch({
        type: GET_EXPERIENCE_DETAILS,
        payload: res.data
      })
      dispatch(setClearLoading())
    })
    .catch(err =>
      dispatch({
        type: GET_EXPERIENCE_DETAILS,
        payload: null
      })
    );
};


//updating the existing experience details
export const Update_experience_details = (expData, history) => dispatch => {
  dispatch(seterrorsLoading());
  axios
    .put(`/api/profile/UpdatedExperience`, expData)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS,
        payload: res.data
      });
      history.push("/Getyourprofile")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


//deleting the existing education details based on their id
export const Delete_experience_details = id => dispatch => {
  dispatch(setEditLoading())
  axios
    .delete(`/api/profile/DeleteExperiencelist/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
      dispatch(setClearLoading())
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}






//error loading.
export const seterrorsLoading = () => {
  return {
    type: ERROR_LOADING
  };
}


// editeductioan loading
export const setEditLoading = () => {
  return {
    type: EDIT_LOADING
  };
};

// editeductioan clear loading
export const setClearLoading = () => {
  return {
    type: CLEAR_EDIT_LOADING
  };
};


// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};


// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};