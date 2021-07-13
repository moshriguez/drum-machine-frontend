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
    // console.log(fileName, audioBuffer)
    return audioBuffer;
}

export async function loadSamples(fileNameArray) {
    setupSample(audioCtx, fileNameArray[0])
    .then(res => pad1Sample = res)
    setupSample(audioCtx, fileNameArray[1])
    .then(res => pad2Sample = res)
    setupSample(audioCtx, fileNameArray[2])
    .then(res => pad3Sample = res)
    setupSample(audioCtx, fileNameArray[3])
    .then(res => pad4Sample = res)
    setupSample(audioCtx, fileNameArray[4])
    .then(res => pad5Sample = res)
    setupSample(audioCtx, fileNameArray[5])
    .then(res => pad6Sample = res)
    setupSample(audioCtx, fileNameArray[6])
    .then(res => pad7Sample = res)
    setupSample(audioCtx, fileNameArray[7])
    .then(res => pad8Sample = res)
    setupSample(audioCtx, fileNameArray[8])
    .then(res => pad9Sample = res)
    setupSample(audioCtx, fileNameArray[9])
    .then(res => pad10Sample = res)
}

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


