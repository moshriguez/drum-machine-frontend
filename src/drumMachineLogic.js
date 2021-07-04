import { storage } from "./firebase/firebase";

// LOADING SAMPLES
// fetch the audio file and decode the data  
export async function setupSample(audioContext, fileName) {
    // const configObj = {
    //     method: 'GET',
    //     mode: 'no-cors',
    //     headers: {
    //         'Content-Type': 'audio/wav'
    //     }
    // }
    const storageRef = storage.ref()
    const filePath = await storageRef.child(fileName).getDownloadURL()
    const response = await fetch(filePath)
    const arrayBuffer = await response.arrayBuffer();
    // console.log(arrayBuffer)
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
}

// export async function setupSample(audioContext, fileName) {
//     const storageRef = storage.ref()
//     const filePath = storageRef.child(fileName).getDownloadURL()
//     var request = new XMLHttpRequest();
//     request.open('GET', filePath, true);
//     request.responseType = 'arraybuffer';
//     // Decode asynchronously
//     request.onload = function() {
//         console.log(request.response)
//         audioContext.decodeAudioData(request.response)
//         // .then((decodedData) => console.log(decodedData))
//         // audioContext.decodeAudioData(request.response, function(theBuffer) {
//         // buffer = theBuffer;
//         // }, onError);
//     }
//     request.send();
// }   

    // create a buffer, plop in data, connect and play -> modify graph here if required
    function playSample(audioContext, audioBuffer, time) {
        const sampleSource = audioContext.createBufferSource();
        sampleSource.buffer = audioBuffer;
        sampleSource.connect(audioContext.destination)
        sampleSource.start(time);
        return sampleSource;
    }