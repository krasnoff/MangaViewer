import { API_ERRORED } from "../action-type";
import initialState from "../state";

function ErrorSummeryReducer(state = initialState, action: any) {
    if (action.type === API_ERRORED) {
        return Object.assign({}, state, {
            error: state.error = action.payload
        });
    }

    return state;
}

export default ErrorSummeryReducer;