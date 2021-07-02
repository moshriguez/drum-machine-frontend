import { combineReducers } from "redux";
import { userReducer } from "./user";
import { drumMachineReducer } from "./drumMachine";

const rootReducer = combineReducers({
    user: userReducer, 
    drumMachine: drumMachineReducer
})

export default rootReducer
// shape of state
// {
//     user: {},
//     drumMachine: {
//       selectedPad: '',
//       tempo: 120,
//       isPlaying: false,
//       pad1: {
//          volume: 2,
//          sequence: '0000'
//          },
//       pad2: {
//          volume: 2,
//          sequence: '0000'
//          },
//       pad3: {
//          volume: 2,
//          sequence: '0000'
//          },
//       pad4: {
//          volume: 2,
//          sequence: '0000'
//          },
//      }
// }