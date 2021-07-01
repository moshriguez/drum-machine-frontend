const initialState = 'pad1'

export const selectedPadReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_PAD':
            return action.payload
        default:
            return state
    }
}