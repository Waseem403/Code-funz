import React from 'react';
import AllPollList from "./AllPollList"


export default function AllPollLists(props) {
    const { Polls } = props
    return Polls.map(Poll => <AllPollList key={Poll._id} Poll={Poll} />)
}