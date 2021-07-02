import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPad } from "../actions/drumMachine";


const DrumContainer = () => {
    const dispatch = useDispatch();
    const selectedPad = useSelector(state => state.drumMachine.selectedPad)
  

    const bdURL = 'https://firebasestorage.googleapis.com/v0/b/drum-machine-27.appspot.com/o/SB15_Drm_bd.wav?alt=media&token=cf875504-7d60-4ae8-88ca-13192ea16d84'
    const snareURL = 'https://firebasestorage.googleapis.com/v0/b/drum-machine-27.appspot.com/o/tracks_15%20%23006.wav?alt=media&token=decfdcaa-0761-447e-be62-a86ea91207f5'
    const hhURL = 'https://firebasestorage.googleapis.com/v0/b/drum-machine-27.appspot.com/o/tracks_19%20%23004.wav?alt=media&token=90e8fac2-5f2a-45f5-a4e6-dc8762c0ba41'
    const hhOpenURL = 'https://firebasestorage.googleapis.com/v0/b/drum-machine-27.appspot.com/o/tracks_61%20%23008.wav?alt=media&token=f72ab516-80e9-47f5-9a39-f2e357c5a3e6'
    
    const handleDrumPadClick = (e) => {
        e.target.firstChild.play()
        console.log(e.target.id)
        dispatch(setPad(e.target.id))
    }

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
                <div className="drum-pad" id="pad1" onClick={(e)=> handleDrumPadClick(e)}>
                    <audio src={bdURL} ></audio>
                </div>
                <div className="drum-pad" id="pad2" onClick={(e)=> handleDrumPadClick(e)}>
                    <audio src={snareURL} ></audio>
                </div>
                <div className="drum-pad" id="pad3" onClick={(e)=> handleDrumPadClick(e)}>
                    <audio src={hhURL} ></audio>
                </div>
                <div className="drum-pad" id="pad4" onClick={(e)=> handleDrumPadClick(e)}>
                    <audio src={hhOpenURL} ></audio>
                </div>
            </div>
            <div className="drum-controls">
                <div className="selected-drum-show">
                    <div className="digital-display">
                        <p>{selectedPad}</p>
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