import { Middleware } from "redux";
import { GET_SIMPLE_SEARCH_LOADED, PARSE_SIMPLE_SEARCH } from "../action-type";
import { Daum } from "../../types/search-results";

const simpleSearchMiddleware: Middleware = store => next => (action: any) => {
    switch (action.type) {
      case PARSE_SIMPLE_SEARCH:
        // Assuming action.payload contains the data fetched from the API
        const parsedData = parseData(action.payload);
        // Dispatch a new action with the parsed data
        store.dispatch({ type: GET_SIMPLE_SEARCH_LOADED, payload: parsedData });
        break;
      default:
        // If the action is not relevant to data parsing, proceed to the next middleware
        return next(action);
    }
};

// Function to parse data (You can replace this with your custom data parsing logic)
const parseData = (data: any): any => {
    // Example: Parsing JSON data
    try {
        let array = data.data.data as Daum[];

        data.data.data = array;
        return data;
    } catch (error) {
        console.error('Error parsing data:', error);
        return null;
    }

    return data;
};

export default simpleSearchMiddleware;