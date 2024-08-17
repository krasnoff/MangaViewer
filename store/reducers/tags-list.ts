import { TAGS_LIST_LOADED } from "../action-type";
import initialState from "../state";

const TagsListReducer = (state = initialState, action: any) => {
    if (action.type == TAGS_LIST_LOADED) {
        return Object.assign({}, state, {
            tagsResponse: state.tagsResponse = action.payload
        });
    }

    return state;
}

export default TagsListReducer;