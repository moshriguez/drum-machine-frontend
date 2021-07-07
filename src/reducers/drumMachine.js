const initialState = {
    isLoading: true,
    selectedPad: 'pad1',
    tempo: 120,
    isPlaying: false,
    timerID: null,
    beatNumber: 0,
    name: 'untitled',
    description: 'undescribed',
    user: {},
    comments: [],
    pad1: {
        volume: 1,
        sequence: '0000'
    },
    pad2: {
        volume: 1,
        sequence: '0000'
    },
    pad3: {
        volume: 1,
        sequence: '0000'
    },
    pad4: {
        volume: 1,
        sequence: '0000'
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
        case 'SET_BEAT_NUMBER':
            return {...state, beatNumber: action.payload}
        case 'SET_SEQUENCE':
            let updatedSequence = state[state.selectedPad].sequence
            if (updatedSequence[action.payload] === '0') {
                updatedSequence = updatedSequence.slice(0, action.payload) + '1' + updatedSequence.slice(parseInt(action.payload, 10) + 1)
                console.log(updatedSequence)
            } else {
                updatedSequence = updatedSequence.slice(0, action.payload) + '0' + updatedSequence.slice(parseInt(action.payload, 10) + 1)
                console.log(updatedSequence)
            }
            return {...state, [state.selectedPad]: {...state[state.selectedPad], sequence: updatedSequence}}
        case 'LOAD_BEAT':
            return {
                ...state, 
                tempo: action.payload.tempo, 
                name: action.payload.name, 
                description: action.payload.description,
                user: action.payload.user,
                comments: action.payload.comments,
                pad1: {
                    volume: action.payload.beat_pads[0].volume,
                    sequence: action.payload.beat_pads[0].sequence
                },
                pad2: {
                    volume: action.payload.beat_pads[1].volume,
                    sequence: action.payload.beat_pads[1].sequence
                },
                pad3: {
                    volume: action.payload.beat_pads[2].volume,
                    sequence: action.payload.beat_pads[2].sequence
                },
                pad4: {
                    volume: action.payload.beat_pads[3].volume,
                    sequence: action.payload.beat_pads[3].sequence
                }
            }
        case 'ADD_COMMENT':
            const updatedComments = state.comments
            updatedComments.push(action.payload)
            return {...state, comments: updatedComments}
            
        default:
            return state
    }
}