import {createStore} from "redux";
import symbolReducer from "../reducers/symbolReducer"



// export default () => {
// 	const store = createStore(symbolReducer)

// 	return store;
// }


//store
const store = createStore(symbolReducer)

export default store