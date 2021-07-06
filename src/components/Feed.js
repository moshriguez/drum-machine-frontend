import { render } from "@testing-library/react";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../actions/feed";


import BeatCard from "../components/BeatCard";

const URL = 'http://localhost:3000/api/v1/beats/'

const Feed = () => {
    const feed = useSelector(state => state.feed)
    const dispatch = useDispatch()


    const renderBeats = () => {
        return feed.map(beat => {
            return <BeatCard key={beat.id} beat={beat}/>
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("jwt")
        fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "appliction/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(r => r.json())
        .then(data => dispatch(setFeed(data.feed)))
    }, [])

    return (
        <div className="feed">
            {renderBeats()}
        </div>
    )
}

export default Feed