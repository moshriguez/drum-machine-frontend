export function setPad(pad) {
    return {
        type: 'SET_PAD',
        payload: pad
    }
}

export function setTempo(tempo) {
    return {
        type: 'SET_TEMPO',
        payload: tempo
    }
}