import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setPad, setTempo, playing, setVolume, setPitch, setPanning, loading, setTimerID, setBeatNumber, setSequence, setSample } from "../actions/drumMachine";
import { grabSamples } from "../actions/samples";
import { audioCtx, pad1Sample, pad2Sample, pad3Sample, pad4Sample, pad5Sample, pad6Sample, pad7Sample, pad8Sample, pad9Sample, pad10Sample, loadSamples } from "../loadSamples";

const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)

const sampleURL = 'http://localhost:3000/api/v1/pads'

const DrumContainer = () => {
    const dispatch = useDispatch();
    const samples = useSelector(state => state.samples)
    const drumMachine = useSelector(state => state.drumMachine)
    const { isLoading, selectedPad, tempo, isPlaying, timerID, beatNumber, pad1, pad2, pad3, pad4, pad5, pad6, pad7, pad8, pad9, pad10 } = useSelector(state => state.drumMachine)
    const volume = useSelector(state => state.drumMachine[selectedPad].volume)
    const pitch = useSelector(state => state.drumMachine[selectedPad].pitch)
    const panning = useSelector(state => state.drumMachine[selectedPad].panning)
    const sampleID = useSelector(state => state.drumMachine[selectedPad].pad_id)

    useEffect(()=> {
        const fileNameArray = [pad1.sample_file, pad2.sample_file, pad3.sample_file, pad4.sample_file, pad5.sample_file, pad6.sample_file, pad7.sample_file, pad8.sample_file, pad9.sample_file, pad10.sample_file]
        // load samples once the drum machine's state has been updated
        if (!isLoading) {
            loadSamples(fileNameArray)
            .then(() => {
                dispatch(loading(true))
            })
        }
    }, [pad1.sample_file, pad2.sample_file, pad3.sample_file, pad4.sample_file, pad5.sample_file, pad6.sample_file, pad7.sample_file, pad8.sample_file, pad9.sample_file, pad10.sample_file, isLoading])

    useEffect(() => {
        // load all available samples to store
        fetch(sampleURL)
        .then(r => r.json())
        .then(data => dispatch(grabSamples(data.samples)))
    }, [])
    
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

    const handleChangePanning = (e) => {
        dispatch(setPanning(e.target.value))
    }

    const handleChangePitch = (e) => {
        dispatch(setPitch(e.target.value))
    }

    const handleChangeSample = (e) => {
        const selectedSample = samples.find(sample => sample.id === parseInt(e.target.value, 10))
        dispatch(setSample(selectedSample))
        dispatch(loading(false))
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
            playSample(audioCtx, pad1Sample, time, pad1);
        }
        if (pad2.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, pad2Sample, time, pad2);
        }
        if (pad3.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, pad3Sample, time, pad3);
        }
        if (pad4.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, pad4Sample, time, pad4);
        }
        if (pad5.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, pad5Sample, time, pad5);
        }
        if (pad6.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, pad6Sample, time, pad6);
        }
        if (pad7.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, pad7Sample, time, pad7);
        }
        if (pad8.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, pad8Sample, time, pad8);
        }
        if (pad9.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, pad9Sample, time, pad9);
        }
        if (pad10.sequence.split('')[beatNumber] === '1') {
            playSample(audioCtx, pad10Sample, time, pad10);
        }
    }

    // creates a buffer, adds in buffered sample, connects and plays
    // panning values = -1 to 1; 0 is center
    // pitch control via playbackRate - sampleSource.playbackRate.value
    // what's actually happening is we're changing the playback rate, but due to time's relationship with frequencies and the shortness of the samples, we percieve the result as higher or lower in pitch
    function playSample(audioContext, audioBuffer, time, { volume, panning, pitch }) {
        const sampleSource = audioContext.createBufferSource();
        sampleSource.buffer = audioBuffer;
        sampleSource.playbackRate.value = pitch
        const gainNode = audioContext.createGain()
        gainNode.gain.value = volume
        const panNode = audioContext.createStereoPanner()
        panNode.pan.value = panning
        sampleSource.connect(gainNode).connect(panNode).connect(audioContext.destination)
        sampleSource.start(time);
        return sampleSource;
    }

    // renders sequence pads and adds class based on whether pad is selected and what beat were on
    const renderSequencePads = () => {
        const musicalCounting = '1e&a2e&a3e&a4e&a'.split('')
        return drumMachine[selectedPad].sequence.split('').map((pad, i) => {
            if (pad === '0' && i === beatNumber) {
                return <div key={i} className="sequence-pad" >
                    <div className="not-selected current-note">
                        <button onClick={(e) => handleSequencePadClick(i)}></button>
                    </div>
                    <span>{musicalCounting[i]}</span>
                </div>
            } else if (pad === '0') {
                return <div key={i} className="sequence-pad" >
                    <div className="not-selected">
                        <button onClick={(e) => handleSequencePadClick(i)}></button>
                    </div>
                    <span>{musicalCounting[i]}</span>
                </div>
            } else if (pad === '1' && i === beatNumber) {
                return <div key={i} className="sequence-pad" >
                    <div className="selected current-note">
                        <button onClick={(e) => handleSequencePadClick(i)}></button>
                    </div>
                    <span>{musicalCounting[i]}</span>
                </div>
            } else {
                return <div key={i} className="sequence-pad" >
                    <div className="selected">
                        <button onClick={(e) => handleSequencePadClick(i)}></button>
                    </div>
                    <span>{musicalCounting[i]}</span>
                </div>
            }
        })
    }

    const renderSampleDropdown = () => {
        return samples.map(sample => {
            return <option key={sample.id} value={sample.id}>{sample.name}</option>
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
                <div role="button" className="play-btn" onClick={(e) => handlePlayBtnClick(e)}>
                    {isPlaying ? <p>STOP</p> : <p>PLAY</p>}
                </div>
            </div>
            <div className="pads-container">
                <div className="drum-pad" >
                    <button className="retro-button blue-button" id="pad1" onClick={(e)=> handleDrumPadClick(e)} ></button>
                </div>
                <div className="drum-pad" >
                    <button className="retro-button blue-button" id="pad2" onClick={(e)=> handleDrumPadClick(e)} ></button>
                </div>
                <div className="drum-pad" >
                    <button className="retro-button blue-button" id="pad3" onClick={(e)=> handleDrumPadClick(e)} ></button>
                </div>
                <div className="drum-pad" >
                    <button className="retro-button blue-button" id="pad4" onClick={(e)=> handleDrumPadClick(e)} ></button>
                </div>
                <div className="drum-pad" >
                    <button className="retro-button blue-button" id="pad5" onClick={(e)=> handleDrumPadClick(e)} ></button>
                </div>
                <div className="drum-pad" >
                    <button className="retro-button blue-button" id="pad6" onClick={(e)=> handleDrumPadClick(e)} ></button>
                </div>
                <div className="drum-pad" >
                    <button className="retro-button blue-button" id="pad7" onClick={(e)=> handleDrumPadClick(e)} ></button>
                </div>
                <div className="drum-pad" >
                    <button className="retro-button blue-button" id="pad8" onClick={(e)=> handleDrumPadClick(e)} ></button>
                </div>
                <div className="drum-pad" >
                    <button className="retro-button blue-button" id="pad9" onClick={(e)=> handleDrumPadClick(e)} ></button>
                </div>
                <div className="drum-pad" >
                    <button className="retro-button blue-button" id="pad10" onClick={(e)=> handleDrumPadClick(e)} ></button>
                </div>
                
            </div>
            <div className="drum-controls">
                <div className="sample-selector">
                    <select name="samples" id="samples" value={sampleID} onChange={(e) => handleChangeSample(e)}>
                        {renderSampleDropdown()}
                    </select>
                </div>
                <div className="selected-drum-show">
                    <div className="digital-display">
                        <p>{drumMachine[selectedPad].sample_name}</p>
                    </div>
                </div>
                <div className="pitch-control">
                    <label htmlFor="pitch">PITCH</label>
                    <input 
                        name="pitch" 
                        id="pitch" 
                        type="range" 
                        min="0.25" 
                        max="2.0" 
                        step="0.01" 
                        value={pitch}
                        onChange={(e) => handleChangePitch(e)}
                    />
                </div>
                <div className="panning-control">
                    <label htmlFor="panning">PANNING</label>
                    <input 
                        name="panning" 
                        id="panning" 
                        type="range" 
                        min="-1.0" 
                        max="1.0" 
                        step="0.01" 
                        value={panning}
                        onChange={(e) => handleChangePanning(e)}
                    />
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