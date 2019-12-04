import React from 'react';
import FriendRequestList from "./FriendRequestedList"


export default function FriendRequestedLists(props) {
    const { RequestedLists } = props
    return RequestedLists.map(RequestedList => <FriendRequestList key={RequestedList._id} RequestedList={RequestedList} />)
}