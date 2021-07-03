

// LOADING SAMPLES
// fetch the audio file and decode the data  
export async function setupSample(audioContext, filePath) {
    const configObj = {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'audio/wav'
        }
    }
    const response = await fetch(filePath, configObj);
    const arrayBuffer = await response.arrayBuffer();
    console.log(arrayBuffer)
    // const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    // return audioBuffer;
}

