import { GET_READ_LIST_LOADED } from "../action-type";
import initialState from "../state";

const GetReadListReducer = (state = initialState, action: any) => {
    if (action.type == GET_READ_LIST_LOADED) {
        return Object.assign({}, state, {
            getReadListResponse: state.getReadListResponse = action.payload
        });
    }

    return state;
}

export default GetReadListReducer;