const initialState = []

export const sampleReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'GRAB_SAMPLES':
            return action.payload
        default:
            return state
    }
}