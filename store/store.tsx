import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";
import SimpleSearchReducer from './reducers/simpleSearch';
import ErrorSummeryReducer from './reducers/errorSummary';

//const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialiseSagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  SimpleSearchResponse: SimpleSearchReducer,
  ErrorResponse: ErrorSummeryReducer,
});
  
const configureStore = () => {
    return { ...createStore(
      rootReducer,
      applyMiddleware(initialiseSagaMiddleware)), 
      runSaga: initialiseSagaMiddleware.run
    }
}

export default configureStore;