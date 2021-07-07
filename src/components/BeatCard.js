import React from "react";
import { Link } from 'react-router-dom'


const BeatCard = ({ beat, showUsername }) => {

    return (
        <div className="beat-card">
            <Link to={'/drum_machine/' + beat.id}>{beat.name}</Link>
            {showUsername ? <Link to={'/profile/' + beat.user_id}>{beat.username}</Link> : null}
            <p>{beat.description}</p>
            <span>Tempo: {beat.tempo}</span>
        </div>
    )
}

export default BeatCard