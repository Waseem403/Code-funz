import React from 'react';
import FriendList from "./FriendList"

export default function FriendLists(props) {
    const { FriendLists } = props
    return FriendLists.map(Lists => <FriendList key={Lists._id} FriendList={Lists} />)
}