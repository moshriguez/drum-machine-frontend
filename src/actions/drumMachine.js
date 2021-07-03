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