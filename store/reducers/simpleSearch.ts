
import { GET_SIMPLE_SEARCH_LOADED } from "../action-type";
import initialState from "../state";

const SimpleSearchReducer = (state = initialState, action: any) => {
    if (action.type == GET_SIMPLE_SEARCH_LOADED) {
        return Object.assign({}, state, {
            simpleSearchResponse: state.simpleSearchResponse = action.payload
        });
    }

    return state;
}

export default SimpleSearchReducer;