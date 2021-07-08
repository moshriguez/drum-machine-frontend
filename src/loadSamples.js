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
export let kick1Sample
export let kick2Sample
export let snareSample
export let clapSample
export let rimSample
export let hh1Sample
export let hh2Sample
export let hhOpenSample
export let rideSample
export let shakerSample
setupSample(audioCtx, kick1FileName)
.then(res => kick1Sample = res)
setupSample(audioCtx, kick2FileName)
.then(res => kick2Sample = res)
setupSample(audioCtx, snareFileName)
.then(res => snareSample = res)
setupSample(audioCtx, clapFileName)
.then(res => clapSample = res)
setupSample(audioCtx, rimFileName)
.then(res => rimSample = res)
setupSample(audioCtx, hh1FileName)
.then(res => hh1Sample = res)
setupSample(audioCtx, hh2FileName)
.then(res => hh2Sample = res)
setupSample(audioCtx, hhOpenFileName)
.then(res => hhOpenSample = res)
setupSample(audioCtx, rideFileName)
.then(res => rideSample = res)
setupSample(audioCtx, shakerFileName)
.then(res => shakerSample = res)



