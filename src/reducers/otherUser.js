const initialState = {
    username: 'defaultUser',
    bio: 'default',
    beats: [],
    comments: [],
    commented_beats: []
}

export const otherUserReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_OTHER_USER':
            if (action.payload === null) {
                return initialState
            } else {
                return action.payload
            }
        default:
            return state
    }
}