import { FEED_LOADED } from "../action-type";
import initialState from "../state";

const FeedReducer = (state = initialState, action: any) => {
    if (action.type == FEED_LOADED) {
        return Object.assign({}, state, {
            feedResponse: state.feedResponse = action.payload
        });
    }

    return state;
}

export default FeedReducer;