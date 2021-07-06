import React from "react";

const BeatCard = ({ beat }) => {

    return (
        <div className="beat-card">
            <h4>{beat.name}</h4>
            <p>{beat.description}</p>
            <span>Tempo: {beat.tempo}</span>
        </div>
    )
}

export default BeatCard