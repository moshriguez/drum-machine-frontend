import { combineReducers } from "redux";
import { userReducer } from "./user";
import { selectedPadReducer } from "./selectedPad";

const rootReducer = combineReducers({
    user: userReducer, 
    selectedPad: selectedPadReducer
})

export default rootReducer
// shape of state
// {
//     user: {},
//     selectedPad: ''
// }