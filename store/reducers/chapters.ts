import { CHAPTERS_LOADED } from "../action-type";
import initialState from "../state";

const ChaptersReducer = (state = initialState, action: any) => {
    if (action.type == CHAPTERS_LOADED) {
        return Object.assign({}, state, {
            chaptersResponse: state.chaptersResponse = action.payload
        });
    }

    return state;
}

export default ChaptersReducer;