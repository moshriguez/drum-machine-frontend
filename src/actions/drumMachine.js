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

export function setPanning(panning) {
    return {
        type: 'SET_PANNING',
        payload: panning
    }
}

export function setPitch(pitch) {
    return {
        type: 'SET_PITCH',
        payload: pitch
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

export function loadBeat(id) {
    return (dispatch) => {
        dispatch(loading(true))
        const beatURL = 'http://localhost:3000/api/v1/beats/'
        const token = localStorage.getItem("jwt")
        fetch(beatURL + id, {
            method: "GET",
            headers: {
                "Content-Type": "appliction/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(data => {
            dispatch({type: 'LOAD_BEAT', payload: data.beat})
            dispatch(loading(false))
        })
    }
}

export function reset() {
    return (dispatch) => {
        dispatch(loading(true))
        dispatch({type: 'RESET'})
        dispatch(loading(false))
    }
}

export function addCommentRedux(comment) {
    return {
        type: 'ADD_COMMENT',
        payload: comment
    }
}

export function setSample(sampleObj) {
    return {
        type: 'SET_SAMPLE',
        payload: sampleObj
    }
}