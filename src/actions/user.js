export function setUser(userObj) {
    return {
        type: 'SET_USER',
        payload: userObj
    }
}

export function saveBeat(beat) {
    return {
        type: 'SAVE_BEAT',
        payload: beat
    }
}

export function updateBeat(beat) {
    return {
        type: 'UPDATE_BEAT',
        payload: beat
    }
}