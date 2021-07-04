const initialState = {
    isLoading: true,
    selectedPad: 'pad1',
    tempo: 120,
    isPlaying: false,
    timerID: null,
    pad1: {
        volume: 2,
        sequence: '1010'
    },
    pad2: {
        volume: 2,
        sequence: '0101'
    },
    pad3: {
        volume: 2,
        sequence: '1111'
    },
    pad4: {
        volume: 2,
        sequence: '0001'
    },
}

export const drumMachineReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'IS_LOADING':
            return {...state, isLoading: action.payload}
        case 'SET_PAD':
            return {...state, selectedPad: action.payload}
        case 'SET_TEMPO':
            return {...state, tempo: action.payload}
        case 'IS_PLAYING':
            return {...state, isPlaying: action.payload}
        case 'SET_VOLUME': 
            return {...state, [state.selectedPad]: {...state[state.selectedPad], volume: action.payload}}
        case 'SET_TIMER_ID':
            return {...state, timerID: action.payload}
            
        default:
            return state
    }
}