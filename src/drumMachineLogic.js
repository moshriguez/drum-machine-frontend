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



