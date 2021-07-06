import React from "react";
import { Link } from 'react-router-dom'


const BeatCard = ({ beat }) => {

    return (
        <div className="beat-card">
            <Link to={'/drum_machine/' + beat.id}>{beat.name}</Link>
            <p>{beat.description}</p>
            <span>Tempo: {beat.tempo}</span>
        </div>
    )
}

export default BeatCard