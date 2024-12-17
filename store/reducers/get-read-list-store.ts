import { GET_READ_LIST_STORED } from "../action-type";
import initialState from "../state";

const GetReadListStoreReducer = (state = initialState, action: any) => {
    if (action.type == GET_READ_LIST_STORED) {
        return Object.assign({}, state, {
            readListStoredResponse: state.readListStoredResponse = action.payload
        });
    }

    return state;
}

export default GetReadListStoreReducer;
