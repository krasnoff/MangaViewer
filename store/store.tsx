import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";
import SimpleSearchReducer from './reducers/simpleSearch';
import ErrorSummeryReducer from './reducers/errorSummary';
import feedMiddleware from './middlewares/feed';
import FeedReducer from './reducers/feed';
import ChaptersReducer from './reducers/chapters';
import simpleSearchMiddleware from './middlewares/simpleSearch';
import TagsListReducer from './reducers/tags-list';
import LoginReducer from './reducers/login';
import AddToReadListReducer from './reducers/add-to-read-list';
import GetReadListReducer from './reducers/get-read-list';
import { thunk } from 'redux-thunk';

//const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialiseSagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  SimpleSearchResponse: SimpleSearchReducer,
  FeedResponse: FeedReducer,
  ErrorResponse: ErrorSummeryReducer,
  ChaptersResponse: ChaptersReducer,
  TagsListResponse: TagsListReducer,
  LoginResponse: LoginReducer,
  AddToReadListResponse: AddToReadListReducer,
  GetReadListReducerResponse: GetReadListReducer
});
  
const configureStore = () => {
    return { ...createStore(
      rootReducer,
      applyMiddleware(initialiseSagaMiddleware, feedMiddleware, simpleSearchMiddleware, thunk)), 
      runSaga: initialiseSagaMiddleware.run
    }
}

export default configureStore;