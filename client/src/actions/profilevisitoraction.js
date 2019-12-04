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



//getting profile feeds by their handler name
export const getProfileFeedsByHandle = handler => dispatch => {
    dispatch(setFeedLoading())
    axios
        .get(`/profilevisiters/ProfileHandler/${handler}`)
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
export const FromProfileAddStatus = FeedsData => dispatch => {
    dispatch(setErrorLoading());
    axios
        .post("/ProfileFeeds/UpdateStatus", FeedsData)
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

//editing or updating the status
export const EditStatus = (EditComment, Post_Id) => dispatch => {
    dispatch(setErrorLoading());
    axios
        .put(`/ProfileFeeds/EditStatus/${Post_Id}`, EditComment)
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


// Delete Feed
export const FromProfileDeleteFeed = id => dispatch => {
    axios
        .delete(`/ProfileFeeds/DeleteFeed/${id}`)
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

// auth user Deleting Feed
export const AuthUserDeleteFeed = id => dispatch => {
    axios
        .delete(`/ProfileFeeds/DeleteFeed/${id}`)
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



// auth user Deleting Feed Reply 
export const AuthUserDeleteFeedReply = (Post_Id, Delete_Info) => dispatch => {
    axios
        .post(`/ProfileFeeds/DeleteFeedReply/${Post_Id}`, Delete_Info)
        .then(res =>
            dispatch({
                type: GET_FEEDS,
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

//love react to the desire status.
export const OtherUserReactlove = Love_info => dispatch => {
    axios
        .post(`../profilevisiters/OtherUserReactlove/${Love_info.feed_id}`, Love_info)
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
export const OtherUserReactUnlove = UnLove_info => dispatch => {
    axios
        .post(`../profilevisiters/OtherUserUnReactlove/${UnLove_info.feed_id}`, UnLove_info)
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
export const OtherUserReactlike = Like_info => dispatch => {
    axios
        .post(`../profilevisiters/OtherUserReactlike/${Like_info.feed_id}`, Like_info)
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
export const OtherUserReactDislike = DisLike_info => dispatch => {
    axios
        .post(`../profilevisiters/OtherUserReactDislike/${DisLike_info.feed_id}`, DisLike_info)
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



//add comment in the other profile feeds
export const OtherUseraddCommentToFeed = (Feed_id, Replies) => dispatch => {
    dispatch(setErrorLoading());
    axios
        .post(`../profilevisiters/OtherUserProfilePostReplies/${Feed_id}`, Replies)
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

//update/edit comment in the other profile feeds
export const OtherUserUpdateCommentToFeed = (Feed_id, Replies) => dispatch => {
    dispatch(setErrorLoading());
    axios
        .post(`../profilevisiters/OtherUserUpdateCommentToFeed/${Feed_id}`, Replies)
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

//love react to the desire status.
export const OtherUserReactloveToFeedReply = Love_info => dispatch => {
    axios
        .post(`../profilevisiters/OtherUserReactloveToFeedReply/${Love_info.Post_Id}`, Love_info)
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



//love react to the desire status.
export const OtherUserReactUnloveToFeedReply = UnLove_info => dispatch => {
    axios
        .post(`../profilevisiters/OtherUserReactUnloveToFeedReply/${UnLove_info.Post_Id}`, UnLove_info)
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



//love react to the desire status.
export const OtherUserReactlikeToFeedReply = Like_info => dispatch => {
    axios
        .post(`../profilevisiters/OtherUserReactlikeToFeedReply/${Like_info.Post_Id}`, Like_info)
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

//love react to the desire status.
export const OtherUserReactDislikeToFeedReply = DisLike_info => dispatch => {
    axios
        .post(`../profilevisiters/OtherUserReactDislikeToFeedReply/${DisLike_info.Post_Id}`, DisLike_info)
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

//reacting likes/love from the currentprofile to the reply posts


//love react to the desire status reply.
export const ReactloveToComment = Love_info => dispatch => {
    axios
        .post(`profilevisiters/OtherUserReactloveToFeedReply/${Love_info.Post_Id}`, Love_info)
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

//love react to the desire status.
export const ReactUnloveToComment = UnLove_info => dispatch => {
    axios
        .post(`profilevisiters/OtherUserReactUnloveToFeedReply/${UnLove_info.Post_Id}`, UnLove_info)
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



//love react to the desire status.
export const ReactlikeToComment = Like_info => dispatch => {
    axios
        .post(`profilevisiters/OtherUserReactlikeToFeedReply/${Like_info.Post_Id}`, Like_info)
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

//love react to the desire status.
export const ReactDislikeToComment = DisLike_info => dispatch => {
    axios
        .post(`profilevisiters/OtherUserReactDislikeToFeedReply/${DisLike_info.Post_Id}`, DisLike_info)
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