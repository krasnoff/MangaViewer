import { ADD_TO_READ_LIST_LOADED } from "../action-type";
import initialState from "../state";

const AddToReadListReducer = (state = initialState, action: any) => {
    if (action.type == ADD_TO_READ_LIST_LOADED) {
        return Object.assign({}, state, {
            addToReadListResponse: state.addToReadListResponse = action.payload
        });
    }

    return state;
}

export default AddToReadListReducer;