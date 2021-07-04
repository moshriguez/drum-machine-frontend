import { storage } from "./firebase/firebase";

export let audioCtx = new AudioContext()


// ** LOADING SAMPLES **
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


// Create a queue for the notes that are to be played, with the current time that we want them to play:
// const notesInQueue = [];

// function scheduleNote(beatNumber, time) {
//     // push the note on the queue, even if we're not playing.
//     notesInQueue.push({note: beatNumber, time: time});
//     // console.log(beatNumber, time);

//     if (pad1.sequence.split()[beatNumber] === '1') {
//         playSample(audioCtx, bdSample, time);
//     }
//     if (pad2.sequence.split()[beatNumber] === '1') {
//         playSample(audioCtx, snareSample, time);
//     }
//     if (pad3.sequence.split()[beatNumber] === '1') {
//         playSample(audioCtx, hhSample, time);
//     }
//     if (pad4.sequence.split()[beatNumber] === '1') {
//         playSample(audioCtx, hhOpenSample, time);
//     }
// }

// creates a buffer, adds in buffered sample, connects and plays
//! gain node and panning node will have to be added here later
export function playSample(audioContext, audioBuffer, time) {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination)
    sampleSource.start(time);
    return sampleSource;
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