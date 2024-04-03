import { Middleware } from 'redux';
import { FEED_LOADED, FEED_PARSE } from '../action-type';
import { Daum } from '../../types/search-results';

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
    let feedArray = data.data.data as Daum[];
    feedArray = feedArray.filter(el => el.attributes.translatedLanguage === 'en');
    feedArray = feedArray.sort((a, b) => {
      if (a.attributes.chapter && b.attributes.chapter) {
        return +b.attributes.chapter - +a.attributes.chapter
      }     
      
      return 0;
    })
    
    data.data.data = feedArray;
    return data;
  } catch (error) {
    console.error('Error parsing data:', error);
    return null;
  }
};

export default feedMiddleware;