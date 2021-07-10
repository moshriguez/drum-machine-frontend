const initialState = {
    username: 'defaultUser',
    bio: 'default',
    musical_influences: '',
    beats: []
}

export const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            if (action.payload === null) {
                return initialState
            } else {
                return action.payload
            }
        case 'SAVE_BEAT':
            return {...state, beats: [...state.beats, action.payload]}
        case 'UPDATE_BEAT':
            const updatedBeatArray = state.beats.filter(beat => beat.id !== action.payload.id)
            updatedBeatArray.push(action.payload)
            return {...state, beats: updatedBeatArray}
        default:
            return state
    }
}