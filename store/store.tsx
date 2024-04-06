import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";
import SimpleSearchReducer from './reducers/simpleSearch';
import ErrorSummeryReducer from './reducers/errorSummary';
import feedMiddleware from './middlewares/feed';
import FeedReducer from './reducers/feed';
import ChaptersReducer from './reducers/chapters';

//const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialiseSagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  SimpleSearchResponse: SimpleSearchReducer,
  FeedResponse: FeedReducer,
  ErrorResponse: ErrorSummeryReducer,
  ChaptersResponse: ChaptersReducer
});
  
const configureStore = () => {
    return { ...createStore(
      rootReducer,
      applyMiddleware(initialiseSagaMiddleware, feedMiddleware)), 
      runSaga: initialiseSagaMiddleware.run
    }
}

export default configureStore;