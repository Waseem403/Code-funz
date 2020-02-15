import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Friend_RequestSent, Accept_Friend_RequestSent_From_Profiles } from "../../../../actions/FriendRequestAction"
import { Follow_Peoples, UnFollow_Peoples } from "../../../../actions/Follow"
import PersonIcon from '@material-ui/icons/Person';
const useStyles = makeStyles(theme => ({
    Followbutton: {
        textTransform: 'capitalize',
        letterSpacing: '2px',
        transition: "1s",
        "&:hover": {
          backgroundColor: '#2196f3',
          color:'white'
        }
    },
    Unfollowbutton: {
        textTransform: 'capitalize',
        letterSpacing: '2px',
        transition: "1s",
        "&:hover": {
          backgroundColor: '#f44336',
          color:'white'
        }
    }
}));


function Friends(props) {
    const classes = useStyles();
    const { profile, auth } = props


    const Follow = () => {
        const Targeted_Profile = profile.user._id
        props.Follow_Peoples(Targeted_Profile)
    }
    const UnFollow = () => {
        const Targeted_Profile = profile.user._id
        props.UnFollow_Peoples(Targeted_Profile)
    }




    let FriendsButton
    if (profile.user._id === auth.user.id) {
        FriendsButton = null
    }
    else {
        if (profile.Followers.length === 0) {
            FriendsButton = <Button
                color="primary"
                variant="outlined"
                size="small"
                className={classes.Followbutton}
                onClick={Follow}
            >
                <i class="fas fa-user-plus"></i> follow
            </Button>
        }
        else {
            let FollowersAuthPeople = []
            const one = 1
            profile.Followers.forEach(followers => {
                if (followers.user.toString() === auth.user.id) {
                    FollowersAuthPeople.push(followers)
                }
            })
            //validating the condition based on auth user
            if (FollowersAuthPeople.length === one) {
                FriendsButton = <Button
                    color="secondary"
                    variant="outlined"
                    size="small"
                    className={classes.Unfollowbutton}
                    onClick={UnFollow}
                >
                    <i class="fas fa-user-minus"></i>  unfollow
            </Button>
            } else {
                FriendsButton = <Button
                    color="primary"
                    variant="outlined"
                    size="small"
                    className={classes.Followbutton}
                    onClick={Follow}
                >
                    <i class="fas fa-user-plus"></i> follow
        </Button>
            }
        }

    }
    return FriendsButton
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { Friend_RequestSent, Accept_Friend_RequestSent_From_Profiles, Follow_Peoples, UnFollow_Peoples },
)(Friends)