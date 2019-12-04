import axios from "axios";
import {
    FEEDS_LOADING,
    GET_FEEDS,
    ADD_FEEDS,
    DELETE_FEED,
    ERROR_LOADING,
    GET_ERRORS,
    CLEAR_ERRORS
} from "./types"

//getting the feed status 
// Get Posts
export const GetFeeds = () => dispatch => {
    dispatch(setFeedLoading());
    axios
        .get("/ProfileFeeds")
        .then(res =>
            dispatch({
                type: GET_FEEDS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_FEEDS,
                payload: null
            })
        );
};



//adding the status
export const AddStatus = FeedsData => dispatch => {
    dispatch(setErrorLoading());
    axios
        .post("ProfileFeeds/UpdateStatus", FeedsData)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS,
                payload: res.data
            });
            dispatch({
                type: ADD_FEEDS,
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



// Delete Feed
export const DeleteFeed = id => dispatch => {
    axios
        .delete(`ProfileFeeds/DeleteFeed/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_FEED,
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


//love react to the desire status.
export const Reactlove = Love_info => dispatch => {
    axios
        .post(`ProfileFeeds/Reactlove/${Love_info.feed_id}`, Love_info)
        .then(res => {
            dispatch({
                type: GET_FEEDS,
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

//unlove react to the desire status.
export const ReactUnlove = UnLove_info => dispatch => {
    axios
        .post(`ProfileFeeds/UnReactlove/${UnLove_info.feed_id}`, UnLove_info)
        .then(res => {
            dispatch({
                type: GET_FEEDS,
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


//like react to the desire status.
export const Reactlike = Like_info => dispatch => {
    axios
        .post(`ProfileFeeds/Reactlike/${Like_info.feed_id}`, Like_info)
        .then(res => {
            dispatch({
                type: GET_FEEDS,
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

//dislike react to the desire status.
export const ReactDislike = DisLike_info => dispatch => {
    axios
        .post(`ProfileFeeds/ReactDislike/${DisLike_info.feed_id}`, DisLike_info)
        .then(res => {
            dispatch({
                type: GET_FEEDS,
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

// Add Comment
export const addCommentToFeed = (Feed_id, Replies) => dispatch => {
    dispatch(setErrorLoading());
    axios
        .post(`/ProfileFeeds/ProfilePostReplies/${Feed_id}`, Replies)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS,
                payload: res.data
            });
            dispatch({
                type: GET_FEEDS,
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


//edit the reply of the comment.
export const EditReplyFeed = (Feed_id, Replies) => dispatch => {
    dispatch(setErrorLoading());
    axios
        .put(`/ProfileFeeds/EditStatusComment/${Feed_id}`, Replies)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS,
                payload: res.data
            });
            dispatch({
                type: GET_FEEDS,
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


// Set loading state
export const setErrorLoading = () => {
    return {
        type: ERROR_LOADING
    };
};

// Set loading state
export const setFeedLoading = () => {
    return {
        type: FEEDS_LOADING
    };
};