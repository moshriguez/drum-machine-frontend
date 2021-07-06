const initialState = {
    username: 'defaultUser',
    bio: 'default',
    beats: []
}

export const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload
        default:
            return state
    }
}