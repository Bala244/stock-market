

//reducer
export default (state = {symbolData: []}, action = {}) => {
		switch(action.type){
			case "GET_SYMBOL_DATA":
				return {
					state: action.symbolData
				}

			default:
				return state
		}
	}

