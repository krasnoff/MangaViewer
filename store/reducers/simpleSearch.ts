
import { GET_SIMPLE_SEARCH_LOADED } from "../action-type";
import initialState from "../state";

function SimpleSearchReducer(state = initialState, action: any) {
    console.log('reducer', action.payload)
    if (action.type === GET_SIMPLE_SEARCH_LOADED) {
        return Object.assign({}, state, {
            simpleSearchResponse: state.simpleSearchResponse = action.payload
        });
    }

    return state;
}

export default SimpleSearchReducer;