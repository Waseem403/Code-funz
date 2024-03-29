import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  ERROR_LOADING,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,

} from "./types";

// Add Post
export const addPost = postData => dispatch => {
  dispatch(setErrorLoading());
  axios
    .post("/api/posts", postData)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS,
        payload: res.data
      });
      dispatch({
        type: ADD_POST,
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

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Get Post
export const getPost = id => dispatch => {
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
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

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(setErrorLoading());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS,
        payload: res.data
      });
      dispatch({
        type: GET_POST,
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

// edits Comment
export const EditComment = EditComment => dispatch => {
  dispatch(setErrorLoading());
  axios
    .put(`/api/posts/UpdatePost`, EditComment)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS,
        payload: res.data
      });
      dispatch({
        type: GET_POSTS,
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

export const EditReply = (Edit_Data, postid) => dispatch => {
  dispatch(setErrorLoading());
  axios
    .put(`/api/posts/EditReply/${postid}`, Edit_Data)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS,
        payload: res.data
      });
      dispatch({
        type: GET_POST,
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

// Add Reply Like
export const ReplyaddLike = data => dispatch => {
  axios
    .post(`/api/posts/replies/like`, data)
    .then(res =>
      dispatch({
        type: GET_POST,
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

// Remove Reply Like
export const ReplyremoveLike = data => dispatch => {
  axios
    .post(`/api/posts/replies/unlike`, data)
    .then(res =>
      dispatch({
        type: GET_POST,
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

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
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

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
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