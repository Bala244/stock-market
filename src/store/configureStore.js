import {createStore} from "redux";
import symbolReducer from "../reducers/symbolReducer"





//store
const store = createStore(symbolReducer)

export default store