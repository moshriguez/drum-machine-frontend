const initialState = {id: 1, username: 'marc'}

export const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload
        default:
            return state
    }
}