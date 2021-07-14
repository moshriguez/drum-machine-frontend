const initialState = []

export const sampleReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'GRAB_SAMPLES':
            return action.payload
        case 'ADD_SAMPLE':
            return [...state, action.payload]
        default:
            return state
    }
}