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
        sample_name: 'Kick1',
        sample_file: 'SB15_Drm_bd.wav',
        id: 0,
        pad_id: 5,
        panning: 0,
        pitch: 1
    },
    pad2: {
        volume: 1,
        sequence: '0000100000001000',
        sample_name: 'Kick2',
        sample_file: 'kick13.wav',
        id: 0,
        pad_id: 6,
        panning: 0,
        pitch: 1
    },
    pad3: {
        volume: 1,
        sequence: '0000001001000000',
        sample_name: 'Snare',
        sample_file: 'tracks_15 #006.wav',
        id: 0,
        pad_id: 7,
        panning: 0,
        pitch: 1
    },
    pad4: {
        volume: 1,
        sequence: '0000100000001000',
        sample_name: 'Clap',
        sample_file: 'lil j clap 6.wav',
        id: 0,
        pad_id: 8,
        panning: 0,
        pitch: 1
    },
    pad5: {
        volume: 1,
        sequence: '0001100000011000',
        sample_name: 'Rim',
        sample_file: 'mobb-snare1-qbh.wav',
        id: 0,
        pad_id: 9,
        panning: 0,
        pitch: 1
    },
    pad6: {
        volume: 1,
        sequence: '1000100010001000',
        sample_name: 'HH1',
        sample_file: 'tracks_19 #004.wav',
        id: 0,
        pad_id: 10,
        panning: 0,
        pitch: 1
    },
    pad7: {
        volume: 1,
        sequence: '0010001000100010',
        sample_name: 'HH2',
        sample_file: 'tight ass hat 3.wav',
        id: 0,
        pad_id: 11,
        panning: 0,
        pitch: 1
    },
    pad8: {
        volume: 1,
        sequence: '0000000000001000',
        sample_name: 'HH Open',
        sample_file: 'tracks_61 #008.wav',
        id: 0,
        pad_id: 12,
        panning: 0,
        pitch: 1
    },
    pad9: {
        volume: 1,
        sequence: '0100010001000100',
        sample_name: 'Ride',
        sample_file: 'c22 CshRd R02   x.wav',
        id: 0,
        pad_id: 13,
        panning: 0,
        pitch: 1
    },
    pad10: {
        volume: 1,
        sequence: '0001000100010001',
        sample_name: 'Shaker',
        sample_file: 'JBlaze_shaker5.wav',
        id: 0,
        pad_id: 14,
        panning: 0,
        pitch: 1
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
        case 'SET_PANNING':
            return {...state, [state.selectedPad]: {...state[state.selectedPad], panning: action.payload}}
        case 'SET_PITCH':
            return {...state, [state.selectedPad]: {...state[state.selectedPad], pitch: action.payload}}
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
                    sample_name: action.payload.beat_pads[0].sample_name,
                    sample_file: action.payload.beat_pads[0].sample_file,
                    id: action.payload.beat_pads[0].id,
                    pad_id: action.payload.beat_pads[0].pad_id,
                    panning: action.payload.beat_pads[0].panning,
                    pitch: action.payload.beat_pads[0].pitch
                },
                pad2: {
                    volume: action.payload.beat_pads[1].volume,
                    sequence: action.payload.beat_pads[1].sequence,
                    sample_name: action.payload.beat_pads[1].sample_name,
                    sample_file: action.payload.beat_pads[1].sample_file,
                    id: action.payload.beat_pads[1].id,
                    pad_id: action.payload.beat_pads[1].pad_id,
                    panning: action.payload.beat_pads[1].panning,
                    pitch: action.payload.beat_pads[1].pitch
                },
                pad3: {
                    volume: action.payload.beat_pads[2].volume,
                    sequence: action.payload.beat_pads[2].sequence,
                    sample_name: action.payload.beat_pads[2].sample_name,
                    sample_file: action.payload.beat_pads[2].sample_file,
                    id: action.payload.beat_pads[2].id,
                    pad_id: action.payload.beat_pads[2].pad_id,
                    panning: action.payload.beat_pads[2].panning,
                    pitch: action.payload.beat_pads[2].pitch
                },
                pad4: {
                    volume: action.payload.beat_pads[3].volume,
                    sequence: action.payload.beat_pads[3].sequence,
                    sample_name: action.payload.beat_pads[3].sample_name,
                    sample_file: action.payload.beat_pads[3].sample_file,
                    id: action.payload.beat_pads[3].id,
                    pad_id: action.payload.beat_pads[3].pad_id,
                    panning: action.payload.beat_pads[3].panning,
                    pitch: action.payload.beat_pads[3].pitch
                },
                pad5: {
                    volume: action.payload.beat_pads[4].volume,
                    sequence: action.payload.beat_pads[4].sequence,
                    sample_name: action.payload.beat_pads[4].sample_name,
                    sample_file: action.payload.beat_pads[4].sample_file,
                    id: action.payload.beat_pads[4].id,
                    pad_id: action.payload.beat_pads[4].pad_id,
                    panning: action.payload.beat_pads[4].panning,
                    pitch: action.payload.beat_pads[4].pitch
                },
                pad6: {
                    volume: action.payload.beat_pads[5].volume,
                    sequence: action.payload.beat_pads[5].sequence,
                    sample_name: action.payload.beat_pads[5].sample_name,
                    sample_file: action.payload.beat_pads[5].sample_file,
                    id: action.payload.beat_pads[5].id,
                    pad_id: action.payload.beat_pads[5].pad_id,
                    panning: action.payload.beat_pads[5].panning,
                    pitch: action.payload.beat_pads[5].pitch
                },
                pad7: {
                    volume: action.payload.beat_pads[6].volume,
                    sequence: action.payload.beat_pads[6].sequence,
                    sample_name: action.payload.beat_pads[6].sample_name,
                    sample_file: action.payload.beat_pads[6].sample_file,
                    id: action.payload.beat_pads[6].id,
                    pad_id: action.payload.beat_pads[6].pad_id,
                    panning: action.payload.beat_pads[6].panning,
                    pitch: action.payload.beat_pads[6].pitch
                },
                pad8: {
                    volume: action.payload.beat_pads[7].volume,
                    sequence: action.payload.beat_pads[7].sequence,
                    sample_name: action.payload.beat_pads[7].sample_name,
                    sample_file: action.payload.beat_pads[7].sample_file,
                    id: action.payload.beat_pads[7].id,
                    pad_id: action.payload.beat_pads[7].pad_id,
                    panning: action.payload.beat_pads[7].panning,
                    pitch: action.payload.beat_pads[7].pitch
                },
                pad9: {
                    volume: action.payload.beat_pads[8].volume,
                    sequence: action.payload.beat_pads[8].sequence,
                    sample_name: action.payload.beat_pads[8].sample_name,
                    sample_file: action.payload.beat_pads[8].sample_file,
                    id: action.payload.beat_pads[8].id,
                    pad_id: action.payload.beat_pads[8].pad_id,
                    panning: action.payload.beat_pads[8].panning,
                    pitch: action.payload.beat_pads[8].pitch
                },
                pad10: {
                    volume: action.payload.beat_pads[9].volume,
                    sequence: action.payload.beat_pads[9].sequence,
                    sample_name: action.payload.beat_pads[9].sample_name,
                    sample_file: action.payload.beat_pads[9].sample_file,
                    id: action.payload.beat_pads[9].id,
                    pad_id: action.payload.beat_pads[9].pad_id,
                    panning: action.payload.beat_pads[9].panning,
                    pitch: action.payload.beat_pads[9].pitch
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