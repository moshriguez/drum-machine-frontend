import React from "react";

import { useDispatch, useSelector } from "react-redux";


const MyProfileContainer = () => {
    const user = useSelector(state => state.user)

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
            </div>
        </div>
    )
}

export default MyProfileContainer