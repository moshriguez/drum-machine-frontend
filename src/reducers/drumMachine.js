const initialState = {
    selectedPad: 'pad1',
    tempo: 120,
    isPlaying: false,
    pad1: {
        volume: 2,
        sequence: '0000'
    },
    pad2: {
        volume: 2,
        sequence: '0000'
    },
    pad3: {
        volume: 2,
        sequence: '0000'
    },
    pad4: {
        volume: 2,
        sequence: '0000'
    },
}

export const drumMachineReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_PAD':
            return {...state, selectedPad: action.payload}
        case 'SET_TEMPO':
            return {...state, tempo: action.payload}
        case 'IS_PLAYING':
            console.log(action.payload)
            return {...state, isPlaying: action.payload}

        default:
            return state
    }
}