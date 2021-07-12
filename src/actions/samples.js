export function grabSamples(samplesArray) {
    return {
        type: 'GRAB_SAMPLES',
        payload: samplesArray
    }
}