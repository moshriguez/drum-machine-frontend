import { combineReducers } from "redux";
import { userReducer } from "./user";
import { otherUserReducer } from "./otherUser";
import { feedReducer } from "./feed";
import { drumMachineReducer } from "./drumMachine";
import { sampleReducer } from "./samples";

const rootReducer = combineReducers({
    user: userReducer, 
    drumMachine: drumMachineReducer,
    samples: sampleReducer,
    feed: feedReducer,
    otherUser: otherUserReducer
})

export default rootReducer
// shape of state
// {
//     user: {},
//     feed: [],
//     otherUser: {},
//     samples: [],
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