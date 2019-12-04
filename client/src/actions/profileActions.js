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

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/Getyourprofile"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  dispatch(seterrorsLoading());
  axios
    .post("/api/profile/experience", expData)
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

// Add education
export const addEducation = (eduData, history) => dispatch => {
  dispatch(seterrorsLoading());
  axios
    .post('/api/profile/education', eduData)
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


//Add todo lists

export const addTodos = (TodoData, history) => dispatch => {
  axios
    .post("/api/profile/Todos", TodoData)
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

// Delete Experience
export const deleteTodos = id => dispatch => {
  axios
    .delete(`api/profile/Todos:${id}`)
    .then(res => {
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

//  ping todo
export const PingTodos = id => dispatch => {
  axios
    .post(`api/profile/TodoPings:${id}`)
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

//  set a remainder

export const SetRemainder = data => dispatch => {

  axios
    .post(`api/profile/Remainder`, data)
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

// clone todo
export const Todoclone = id => dispatch => {
  axios
    .post(`api/profile/Todoclone:${id}`)
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

// Toggle todolabels from todos..

export const ToggleLabels = data => dispatch => {
  axios
    .post(`api/profile/ToggleLabels`, data)
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

// Addlabel to todo
export const AddLabels = data => dispatch => {
  axios
    .post(`api/profile/Addlabel`, data)
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

//Delete labels from todos
export const deleteLabels = data => dispatch => {
  axios
    .post(`api/profile/DeleteLabels`, data)
    .then(res => {
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

// change color
export const Changecolor = color => dispatch => {
  axios
    .post("/api/profile/addcolor", color)
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

// edit the todo notes.

export const TodoEdit = data => dispatch => {
  axios
    .post(`api/profile/Todoedit`, data)
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

// Delete Experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
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

// Delete Education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
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

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

//profile image set

export const Upload_Profile_Picture = (Profile_Picture, history) => dispatch => {
  dispatch(seterrorsLoading());
  axios
    .post("api/profile/profilepic", Profile_Picture)
    .then(res => {
      history.push("/Getyourprofile")
      dispatch({
        type: CLEAR_ERRORS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: err.response.data
      })
    );
};


//profile image set

export const Upload_Bg_Image = (Profile_Picture, history) => dispatch => {
  dispatch(seterrorsLoading());
  axios
    .post("api/profile/BgImage", Profile_Picture)
    .then(res => {
      history.push("/Getyourprofile")
      dispatch({
        type: CLEAR_ERRORS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: err.response.data
      })
    );
};







// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const seterrorsLoading = () => {
  return {
    type: ERROR_LOADING
  };
}

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};