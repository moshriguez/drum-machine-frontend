import React from "react";

import { useDispatch, useSelector } from "react-redux";

import BeatCard from "../components/BeatCard";


const MyProfileContainer = () => {
    const user = useSelector(state => state.user)

    const renderBeats = () => {
        return user.beats.map(beat => {
            return <BeatCard key={beat.id} beat={beat}/>
        })
    }
    return (
        <div className="my-profile-container">
            <div className="profile-section">
                <h2>User: {user.username}</h2>
                <h3>Bio:</h3>
                <p>{user.bio}</p>
            </div>
            <div className="feed-section">
                <h2>Feed:</h2>
            </div>
            <div className="beats-section">
                <h2>Beats:</h2>
                <ul>{renderBeats()}</ul>
            </div>
        </div>
    )
}

export default MyProfileContainer