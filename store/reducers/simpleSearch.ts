
import { GET_SIMPLE_SEARCH_LOADED } from "../action-type";
import initialState from "../state";

const SimpleSearchReducer = (state = initialState, action2: any) => {
    const type: string = action2.type.toString();
    const res = action2.type.toString() === 'GET_SIMPLE_SEARCH_LOADED';

    if (type == 'GET_SIMPLE_SEARCH_LOADED') {
        return Object.assign({}, state, {
            simpleSearchResponse: state.simpleSearchResponse = action2.payload
        });
    }

    return state;
}

export default SimpleSearchReducer;