import React from 'react';
import PollList from "./PollList"


export default function PollLists(props) {
    const { Polls } = props
    return Polls.map(Poll => <PollList key={Poll._id} Poll={Poll} />)
}