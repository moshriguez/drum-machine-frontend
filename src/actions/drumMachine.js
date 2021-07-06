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

export function playing(bool) {
    return {
        type: 'IS_PLAYING',
        payload: bool
    }
}

export function setVolume(volume) {
    return {
        type: 'SET_VOLUME',
        payload: volume
    }
}

export function loading(bool) {
    return {
        type: 'IS_LOADING',
        payload: bool
    }
}

export function setTimerID(timerID) {
    return {
        type: 'SET_TIMER_ID',
        payload: timerID
    }
}

export function setBeatNumber(beatNumber) {
    return {
        type: 'SET_BEAT_NUMBER',
        payload: beatNumber
    }
}

export function setSequence(i) {
    return {
        type: 'SET_SEQUENCE',
        payload: i
    }
}

export function loadBeat(beat) {
    return {
        type: 'LOAD_BEAT',
        payload: beat
    }
}