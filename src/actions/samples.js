export function grabSamples(samplesArray) {
    return {
        type: 'GRAB_SAMPLES',
        payload: samplesArray
    }
}

export function addSample(sampleObj) {
    return {
        type: 'ADD_SAMPLE',
        payload: sampleObj
    }
}