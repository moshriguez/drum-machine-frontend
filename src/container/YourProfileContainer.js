import React, { useEffect } from "react";
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { setOtherUser } from "../actions/otherUser";

import BeatCard from "../components/BeatCard";
import CommentedBeatsContainer from "./CommentedBeatsContainer";

const userURL = 'http://localhost:3000/api/v1/users/'

const MyProfileContainer = () => {
    
    const { id } = useParams();

    const dispatch = useDispatch();
    const { username, bio, beats } = useSelector(state => state.otherUser)

    const renderBeats = () => {
        return beats.map(beat => {
            return <BeatCard key={beat.id} beat={beat}/>
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("jwt")
        fetch(userURL + id, {
            method: "GET",
            headers: {
                "Content-Type": "appliction/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(r => r.json())
        .then(data => dispatch(setOtherUser(data.user)))
    }, [id])


    return (
        <div className="my-profile-container">
            <div className="profile-section">
                <h2>User: {username}</h2>
                <h3>Bio:</h3>
                <p>{bio}</p>
            </div>
            <div className="feed-section">
                <CommentedBeatsContainer />
            </div>
            <div className="beats-section">
                <h2>Beats:</h2>
                <ul>{renderBeats()}</ul>
            </div>
        </div>
    )
}

export default MyProfileContainer