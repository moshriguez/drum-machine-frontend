import React from "react";

const DrumContainer = () => {

    return (
        <div className="drum-container">
            <div className="global-controls">
                <div className="tempo-control">
                    <div>
                        <label htmlFor="tempo">TEMPO</label>
                        <div className="digital-display">
                            <p>280</p>
                        </div>
                    </div>
                    <input name="tempo" id="tempo" type="range" min="40" max="280" step="0.5" />
                </div>
                <div className="play-btn">
                    <p>PLAY</p>
                </div>
            </div>
            <div className="pads-container">
                <div className="drum-pad"></div>
                <div className="drum-pad"></div>
                <div className="drum-pad"></div>
                <div className="drum-pad"></div>
            </div>
            <div className="drum-controls">
                <div className="selected-drum-show">
                    <div className="digital-display">
                        <p>Pad1</p>
                    </div>
                </div>
                <div className="volume-control">
                    <label htmlFor="volume">VOLUME</label>
                    <input name="volume" id="volume" type="range" min="0" max="2" step="0.01" />
                </div>
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