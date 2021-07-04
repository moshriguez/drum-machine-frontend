import { storage } from "./firebase/firebase";

export let audioCtx = new AudioContext()
const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)


// LOADING SAMPLES
// fetch the audio file and decode the data  
async function setupSample(audioContext, fileName) {
    console.log('Loading sample')
    const storageRef = storage.ref()
    const filePath = await storageRef.child(fileName).getDownloadURL()
    const response = await fetch(filePath)
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
}

let bdFileName = 'SB15_Drm_bd.wav'
let snareFileName = 'tracks_15 #006.wav'
let hhFileName = 'tracks_19 #004.wav'
let hhOpenFileName = 'tracks_61 #008.wav'
export let bdSample
export let snareSample
export let hhSample
export let hhOpenSample
setupSample(audioCtx, bdFileName)
.then(res => bdSample = res)
setupSample(audioCtx, snareFileName)
.then(res => snareSample = res)
setupSample(audioCtx, hhFileName)
.then(res => hhSample = res)
setupSample(audioCtx, hhOpenFileName)
.then(res => hhOpenSample = res)

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

function scheduler() {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime ) {
        scheduleNote(currentNote, nextNoteTime);
        nextNote(currentTempo);
    }
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

// creates a buffer, adds in buffered sample, connects and plays
//! gain node and panning node will have to be added here later
export function playSample(audioContext, audioBuffer, time) {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination)
    sampleSource.start(time);
    return sampleSource;
}

let timerID;
export function startStopDrumMachine() {
    if (!isPlaying) { // if we're not currently playing, start playing...

        // check if context is in suspended state (autoplay policy)
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        currentNote = 0;
        nextNoteTime = audioCtx.currentTime;
        scheduler(); // kick off scheduling notes
        timerID = window.setInterval(scheduler, lookahead);

        requestAnimationFrame(draw); // start the drawing loop.
    } else {
        console.log('fired from play btn: ',timerID)
        window.clearInterval(timerID);
    }
}

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