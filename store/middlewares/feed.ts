import { Middleware } from 'redux';
import { FEED_LOADED, FEED_PARSE } from '../action-type';

const feedMiddleware: Middleware = store => next => (action: any) => {
  switch (action.type) {
    case FEED_PARSE:
      // Assuming action.payload contains the data fetched from the API
      const parsedData = parseData(action.payload);
      // Dispatch a new action with the parsed data
      store.dispatch({ type: FEED_LOADED, payload: parsedData });
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
    return data;
  } catch (error) {
    console.error('Error parsing data:', error);
    return null;
  }
};

export default feedMiddleware;