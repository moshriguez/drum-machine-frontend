const initialState = {
    username: 'defaultUser',
    bio: 'default',
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
        default:
            return state
    }
}