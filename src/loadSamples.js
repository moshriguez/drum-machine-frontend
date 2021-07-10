import { storage } from "./firebase/firebase";

export let audioCtx = new AudioContext()


// ** LOADING SAMPLES **
// fetch the audio file and decode the data  
async function setupSample(audioContext, fileName) {
    console.log('Loading sample: ', fileName)
    const storageRef = storage.ref()
    const filePath = await storageRef.child(fileName).getDownloadURL()
    const response = await fetch(filePath)
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
}

let kick1FileName = 'SB15_Drm_bd.wav'
let kick2FileName = 'kick13.wav'
let snareFileName = 'tracks_15 #006.wav'
let clapFileName = 'lil j clap 6.wav'
let rimFileName = 'mobb-snare1-qbh.wav'
let hh1FileName = 'tracks_19 #004.wav'
let hh2FileName = 'tight ass hat 3.wav'
let hhOpenFileName = 'tracks_61 #008.wav'
let rideFileName = 'c22 CshRd R02   x.wav' 
let shakerFileName = 'JBlaze_shaker5.wav'
export let pad1Sample
export let pad2Sample
export let pad3Sample
export let pad4Sample
export let pad5Sample
export let pad6Sample
export let pad7Sample
export let pad8Sample
export let pad9Sample
export let pad10Sample

setupSample(audioCtx, kick1FileName)
.then(res => pad1Sample = res)
setupSample(audioCtx, kick2FileName)
.then(res => pad2Sample = res)
setupSample(audioCtx, snareFileName)
.then(res => pad3Sample = res)
setupSample(audioCtx, clapFileName)
.then(res => pad4Sample = res)
setupSample(audioCtx, rimFileName)
.then(res => pad5Sample = res)
setupSample(audioCtx, hh1FileName)
.then(res => pad6Sample = res)
setupSample(audioCtx, hh2FileName)
.then(res => pad7Sample = res)
setupSample(audioCtx, hhOpenFileName)
.then(res => pad8Sample = res)
setupSample(audioCtx, rideFileName)
.then(res => pad9Sample = res)
setupSample(audioCtx, shakerFileName)
.then(res => pad10Sample = res)



