import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setPad, setTempo, playing, setVolume, loading } from "../actions/drumMachine";
import { audioCtx, bdSample, hhOpenSample, hhSample, snareSample } from "../drumMachineLogic";

const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)


// We also need a draw function to update the UI, so we can see when the beat progresses.

let lastNoteDrawn = 3;
function draw() {
  let drawNote = lastNoteDrawn;
  const currentTime = audioCtx.currentTime;

//   while (notesInQueue.length && notesInQueue[0].time < currentTime) {
//     drawNote = notesInQueue[0].note;
//     notesInQueue.splice(0,1);   // remove note from queue
//   }

  // We only need to draw if the note has moved.
//   if (lastNoteDrawn !== drawNote) {
//     pads.forEach(el => {
//       el.children[lastNoteDrawn].style.borderColor = 'hsla(0, 0%, 10%, 1)';
//       el.children[drawNote].style.borderColor = 'hsla(49, 99%, 50%, 1)';
//     });

//     lastNoteDrawn = drawNote;
//   }
  // set up to draw again
  requestAnimationFrame(draw);
}

const DrumContainer = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.drumMachine.isLoading)
    const selectedPad = useSelector(state => state.drumMachine.selectedPad)
    const currentTempo = useSelector(state => state.drumMachine.tempo)
    const isPlaying = useSelector(state => state.drumMachine.isPlaying)
    const volume = useSelector(state => state.drumMachine[selectedPad].volume)
    const pad1 = useSelector(state => state.drumMachine.pad1)
    const pad2 = useSelector(state => state.drumMachine.pad2)
    const pad3 = useSelector(state => state.drumMachine.pad3)
    const pad4 = useSelector(state => state.drumMachine.pad4)
  
    // drum sample URLs
    // const bdURL = 'https://firebasestorage.googleapis.com/v0/b/drum-machine-27.appspot.com/o/SB15_Drm_bd.wav?alt=media&token=cf875504-7d60-4ae8-88ca-13192ea16d84'
    // const snareURL = 'https://firebasestorage.googleapis.com/v0/b/drum-machine-27.appspot.com/o/tracks_15%20%23006.wav?alt=media&token=decfdcaa-0761-447e-be62-a86ea91207f5'
    // const hhURL = 'https://firebasestorage.googleapis.com/v0/b/drum-machine-27.appspot.com/o/tracks_19%20%23004.wav?alt=media&token=90e8fac2-5f2a-45f5-a4e6-dc8762c0ba41'
    // const hhOpenURL = 'https://firebasestorage.googleapis.com/v0/b/drum-machine-27.appspot.com/o/tracks_61%20%23008.wav?alt=media&token=f72ab516-80e9-47f5-9a39-f2e357c5a3e6'


    


    useEffect(()=> {
        // when the sample has loaded allow play
        // setupSample(audioCtx, bdFileName)
        // .then(res => bdSample = res)
        // setupSample(audioCtx, snareFileName)
        // .then(res => snareSample = res)
        // setupSample(audioCtx, hhFileName)
        // .then(res => hhSample = res)
        // setupSample(audioCtx, hhOpenFileName)
        // .then(res => hhOpenSample = res)
        //     .then(() => {
        //         dispatch(loading(!isLoading))
        //     })
    }, [])
    
    const handleDrumPadClick = (e) => {
        playSample(audioCtx, hhOpenSample, 0)
        dispatch(setPad(e.target.id))
    }

    const handleChangeTempo = (e) => {
        dispatch(setTempo(e.target.value))
    }

    const handleChangeVolume = (e) => {
        dispatch(setVolume(e.target.value))
    }

    const handlePlayBtnClick = (e) => {
        if (!isPlaying) { // if we're not currently playing, start playing...

            // check if context is in suspended state (autoplay policy)
            if (audioCtx.state === 'suspended') {
              audioCtx.resume();
            }

            currentNote = 0;
            nextNoteTime = audioCtx.currentTime;
            scheduler(); // kick off scheduling notes
            requestAnimationFrame(draw); // start the drawing loop.
        } else {
            window.clearTimeout(timerID);
        }
        dispatch(playing(!isPlaying))
    }
    
    let currentNote = 0; // The note we are currently playing
    let nextNoteTime = 0.0; // when the next note is due.
    
    // calculates time for next note and advances the current note
    function nextNote(tempo) {
        const secondsPerBeat = 60.0 / tempo;
        nextNoteTime += secondsPerBeat; // Add beat length to last beat time
        
        // Advance the beat number, wrap to zero
        currentNote++;
        if (currentNote === 4) {
          currentNote = 0;
        }
    }

    let timerID;
    function scheduler() {
        // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
        
        while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime ) {
            scheduleNote(currentNote, nextNoteTime);
            nextNote(currentTempo);
        }
        timerID = window.setTimeout(scheduler, lookahead);
        console.log(timerID)
    }

    // Create a queue for the notes that are to be played, with the current time that we want them to play:
    const notesInQueue = [];

    function scheduleNote(beatNumber, time) {
        // push the note on the queue, even if we're not playing.
        notesInQueue.push({note: beatNumber, time: time});
        // console.log(beatNumber, time);

        if (pad1.sequence.split()[beatNumber] === '1') {
            playSample(audioCtx, bdSample, time);
        }
        if (pad2.sequence.split()[beatNumber] === '1') {
            playSample(audioCtx, snareSample, time);
        }
        if (pad3.sequence.split()[beatNumber] === '1') {
            playSample(audioCtx, hhSample, time);
        }
        if (pad4.sequence.split()[beatNumber] === '1') {
            playSample(audioCtx, hhOpenSample, time);
        }
    }

    // create a buffer, plop in data, connect and play -> modify graph here if required
    function playSample(audioContext, audioBuffer, time) {
        const sampleSource = audioContext.createBufferSource();
        sampleSource.buffer = audioBuffer;
        sampleSource.connect(audioContext.destination)
        sampleSource.start(time);
        return sampleSource;
    }

    return (
        // add loading element; display while samples are being buffered

        <div className="drum-container">
            <div className="global-controls">
                <div className="tempo-control">
                    <div>
                        <label htmlFor="tempo">TEMPO</label>
                        <div className="digital-display">
                            <p>{currentTempo}</p>
                        </div>
                    </div>
                    <input 
                        name="tempo" 
                        id="tempo" 
                        type="range" 
                        min="40" 
                        max="280" 
                        step="0.5"
                        value={currentTempo}
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
            </div>
            <div className="drum-controls">
                <div className="selected-drum-show">
                    <div className="digital-display">
                        <p>{selectedPad}</p>
                    </div>
                </div>
                <div className="volume-control">
                    <label htmlFor="volume">VOLUME</label>
                    <input 
                        name="volume" 
                        id="volume" 
                        type="range" 
                        min="0" 
                        max="2" 
                        step="0.01" 
                        value={volume}
                        onChange={(e) => handleChangeVolume(e)}
                    />
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