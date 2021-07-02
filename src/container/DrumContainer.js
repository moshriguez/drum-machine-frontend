import React from "react";

const DrumContainer = () => {

    return (
        <div className="drum-container">
            <div className="global-controls">
                <div className="tempo-control"></div>
                <div className="play-btn"></div>
            </div>
            <div className="pads-container">
                <div className="drum-pad"></div>
                <div className="drum-pad"></div>
                <div className="drum-pad"></div>
                <div className="drum-pad"></div>
            </div>
            <div className="drum-controls">
                <div className="selected-drum-show"></div>
                <div className="volume-control"></div>
            </div>
            <div className="pads-container">
                <div className="sequence-pad"></div>
                <div className="sequence-pad"></div>
                <div className="sequence-pad"></div>
                <div className="sequence-pad"></div>
            </div>
        </div>
    )
}

export default DrumContainer