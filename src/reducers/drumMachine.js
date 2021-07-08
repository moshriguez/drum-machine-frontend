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
        sequence: '0000100000001000',
        name: 'Kick1'
    },
    pad2: {
        volume: 1,
        sequence: '0000100000001000',
        name: 'Kick2'
    },
    pad3: {
        volume: 1,
        sequence: '0000001001000000',
        name: 'Snare'
    },
    pad4: {
        volume: 1,
        sequence: '0000100000001000',
        name: 'Clap'
    },
    pad5: {
        volume: 1,
        sequence: '0001100000011000',
        name: 'Rim'
    },
    pad6: {
        volume: 1,
        sequence: '1000100010001000',
        name: 'HH1'
    },
    pad7: {
        volume: 1,
        sequence: '0010001000100010',
        name: 'HH2'
    },
    pad8: {
        volume: 1,
        sequence: '0000000000001000',
        name: 'HH Open'
    },
    pad9: {
        volume: 1,
        sequence: '0100010001000100',
        name: 'Ride'
    },
    pad10: {
        volume: 1,
        sequence: '0001000100010001',
        name: 'Shaker'
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
            } else {
                updatedSequence = updatedSequence.slice(0, action.payload) + '0' + updatedSequence.slice(parseInt(action.payload, 10) + 1)
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
                    sequence: action.payload.beat_pads[0].sequence,
                    name: action.payload.beat_pads[0].sample_name
                },
                pad2: {
                    volume: action.payload.beat_pads[1].volume,
                    sequence: action.payload.beat_pads[1].sequence,
                    name: action.payload.beat_pads[1].sample_name
                },
                pad3: {
                    volume: action.payload.beat_pads[2].volume,
                    sequence: action.payload.beat_pads[2].sequence,
                    name: action.payload.beat_pads[2].sample_name
                },
                pad4: {
                    volume: action.payload.beat_pads[3].volume,
                    sequence: action.payload.beat_pads[3].sequence,
                    name: action.payload.beat_pads[3].sample_name
                },
                pad5: {
                    volume: action.payload.beat_pads[4].volume,
                    sequence: action.payload.beat_pads[4].sequence,
                    name: action.payload.beat_pads[4].sample_name
                },
                pad6: {
                    volume: action.payload.beat_pads[5].volume,
                    sequence: action.payload.beat_pads[5].sequence,
                    name: action.payload.beat_pads[5].sample_name
                },
                pad7: {
                    volume: action.payload.beat_pads[6].volume,
                    sequence: action.payload.beat_pads[6].sequence,
                    name: action.payload.beat_pads[6].sample_name
                },
                pad8: {
                    volume: action.payload.beat_pads[7].volume,
                    sequence: action.payload.beat_pads[7].sequence,
                    name: action.payload.beat_pads[7].sample_name
                },
                pad9: {
                    volume: action.payload.beat_pads[8].volume,
                    sequence: action.payload.beat_pads[8].sequence,
                    name: action.payload.beat_pads[8].sample_name
                },
                pad10: {
                    volume: action.payload.beat_pads[9].volume,
                    sequence: action.payload.beat_pads[9].sequence,
                    name: action.payload.beat_pads[9].sample_name
                }
            }
        case 'ADD_COMMENT':
            const updatedComments = state.comments
            updatedComments.push(action.payload)
            return {...state, comments: updatedComments}
        case 'RESET':
            return initialState
            
        default:
            return state
    }
}