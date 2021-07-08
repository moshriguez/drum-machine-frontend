import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setPad, setTempo, playing, setVolume, loading, setTimerID, setBeatNumber, setSequence } from "../actions/drumMachine";
import { audioCtx, kick1Sample, kick2Sample, snareSample, clapSample, rimSample, hhOpenSample, hh1Sample, hh2Sample, rideSample, shakerSample } from "../loadSamples";

const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)


const DrumContainer = () => {
    const dispatch = useDispatch();
    const drumMachine = useSelector(state => state.drumMachine)
    const { isLoading, selectedPad, tempo, isPlaying, timerID, beatNumber, pad1, pad2, pad3, pad4, pad5, pad6, pad7, pad8, pad9, pad10 } = useSelector(state => state.drumMachine)
    const volume = useSelector(state => state.drumMachine[selectedPad].volume)

    // useEffect(()=> {
        // stopDrumMachine()
        // startDrumMachine()
        // when the sample has loaded allow play
            // .then(() => {
            //     dispatch(loading(!isLoading))
            // })
    // }, [tempo])
    
    // ** EVENT HANDLERS **
    const handleDrumPadClick = (e) => {
        dispatch(setPad(e.target.id))
    }

    const handleSequencePadClick = (i) => {
        dispatch(setSequence(i))
    }

    const handleChangeTempo = (e) => {
        dispatch(setTempo(e.target.value))
        // console.log(tempo)
    }

    const handleChangeVolume = (e) => {
        dispatch(setVolume(e.target.value))
    }

    const handlePlayBtnClick = (e) => {
        // TODO: it would be cool to trigger this with spacebar as well like other audio software
        if (!isPlaying) { // if we're not currently playing, start playing...
            startDrumMachine()
        } else {
            stopDrumMachine()
        }
        dispatch(playing(!isPlaying))
    }

    // ** DRUM MACHINE ENGINE **
    let currentNote = 0; // The note we are currently playing
    let nextNoteTime = 0.0; // when the next note is due.

    function startDrumMachine() {
        // check if context is in suspended state (autoplay policy)
        if (audioCtx.state === 'suspended') {
        audioCtx.resume();
        }

        currentNote = 0;
        nextNoteTime = audioCtx.currentTime;
        scheduler(); // kick off scheduling notes
        dispatch(setTimerID(setInterval(() => scheduler(), lookahead)))
    }

    function stopDrumMachine() {
        clearInterval(timerID);
    }


    // calculates time for next note and advances the current note
    function nextNote() {
        dispatch(setBeatNumber(currentNote))
        // console.log('currentNote: ', currentNote)
        // console.log('nextNoteTime: ', nextNoteTime)
        const secondsPerBeat = 60.0 / tempo / 4;
        // console.log(tempo)
        nextNoteTime += secondsPerBeat; // Add beat length to last beat time
        // Advance the beat number, wrap to zero
        currentNote++;
        if (currentNote === 16) {
            currentNote = 0;
        }
    }

    function scheduler() {
        // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
        
        while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime ) {
            scheduleNote(currentNote, nextNoteTime);
            nextNote();
        }
    }

    function scheduleNote(beatNumber, time) {
        // console.log(beatNumber, time);
        // console.log(typeof pad1.sequence.split('')[beatNumber])

        if (pad1.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, kick1Sample, time, pad1.volume);
        }
        if (pad2.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, kick2Sample, time, pad2.volume);
        }
        if (pad3.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, snareSample, time, pad3.volume);
        }
        if (pad4.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, clapSample, time, pad4.volume);
        }
        if (pad5.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, rimSample, time, pad5.volume);
        }
        if (pad6.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, hh1Sample, time, pad6.volume);
        }
        if (pad7.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, hh2Sample, time, pad7.volume);
        }
        if (pad8.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, hhOpenSample, time, pad8.volume);
        }
        if (pad9.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, rideSample, time, pad9.volume);
        }
        if (pad10.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, shakerSample, time, pad10.volume);
        }
    }

    // creates a buffer, adds in buffered sample, connects and plays
    //! panning node will have to be added here later
    function playSample(audioContext, audioBuffer, time, volume) {
        const sampleSource = audioContext.createBufferSource();
        sampleSource.buffer = audioBuffer;
        const gainNode = audioContext.createGain()
        gainNode.gain.value = volume
        sampleSource.connect(gainNode).connect(audioContext.destination)
        sampleSource.start(time);
        return sampleSource;
    }

    // renders sequence pads and adds class based on whether pad is selected and what beat were on
    const renderSequencePads = () => {
        return drumMachine[selectedPad].sequence.split('').map((pad, i) => {
            if (pad === '0' && i === beatNumber) {
                return <div key={i} className="sequence-pad current-note" onClick={(e) => handleSequencePadClick(i)}></div>
            } else if (pad === '0') {
                return <div key={i} className="sequence-pad" onClick={(e) => handleSequencePadClick(i)}></div>
            } else if (pad === '1' && i === beatNumber) {
                return <div key={i} className="sequence-pad selected current-note" onClick={(e) => handleSequencePadClick(i)}></div>
            } else {
                return <div key={i} className="sequence-pad selected " onClick={(e) => handleSequencePadClick(i)}></div>
            }
        })
    }


    return (
        // TODO: add loading element; display while samples are being buffered

        <div className="drum-machine">
            <div className="global-controls">
                <div className="tempo-control">
                    <div>
                        <label htmlFor="tempo">TEMPO</label>
                        <div className="digital-display">
                            <p>{tempo}</p>
                        </div>
                    </div>
                    <input 
                        name="tempo" 
                        id="tempo" 
                        type="range" 
                        min="40" 
                        max="280" 
                        step="0.5"
                        value={tempo}
                        onChange={(e) => handleChangeTempo(e)} 
                    />
                </div>
                <div className="play-btn" onClick={(e) => handlePlayBtnClick(e)}>
                    {isPlaying ? <p>STOP</p> : <p>PLAY</p>}
                </div>
            </div>
            <div className="pads-container">
                <div className="drum-pad" id="pad1" onClick={(e)=> handleDrumPadClick(e)}>
                </div>
                <div className="drum-pad" id="pad2" onClick={(e)=> handleDrumPadClick(e)}>
                </div>
                <div className="drum-pad" id="pad3" onClick={(e)=> handleDrumPadClick(e)}>
                </div>
                <div className="drum-pad" id="pad4" onClick={(e)=> handleDrumPadClick(e)}>
                </div>
                <div className="drum-pad" id="pad5" onClick={(e)=> handleDrumPadClick(e)}>
                </div>
                <div className="drum-pad" id="pad6" onClick={(e)=> handleDrumPadClick(e)}>
                </div>
                <div className="drum-pad" id="pad7" onClick={(e)=> handleDrumPadClick(e)}>
                </div>
                <div className="drum-pad" id="pad8" onClick={(e)=> handleDrumPadClick(e)}>
                </div>
                <div className="drum-pad" id="pad9" onClick={(e)=> handleDrumPadClick(e)}>
                </div>
                <div className="drum-pad" id="pad10" onClick={(e)=> handleDrumPadClick(e)}>
                </div>
            </div>
            <div className="drum-controls">
                <div className="selected-drum-show">
                    <div className="digital-display">
                        <p>{drumMachine[selectedPad].name}</p>
                    </div>
                </div>
                <div className="volume-control">
                    <label htmlFor="volume">VOLUME</label>
                    <input 
                        name="volume" 
                        id="volume" 
                        type="range" 
                        min="0" 
                        max="1.5" 
                        step="0.01" 
                        value={volume}
                        onChange={(e) => handleChangeVolume(e)}
                    />
                </div>
            </div>
            <div className="pads-container">
                {renderSequencePads()}
            </div>
        </div>
    )
}

export default DrumContainer