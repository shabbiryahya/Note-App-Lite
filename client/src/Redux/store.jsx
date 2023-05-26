import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './AuthReducer/reducer';
import noteReducer from './NoteReducer/reducer';
import logger from 'redux-logger';

const combinedReducers=combineReducers({
    authReducer,
    noteReducer,
})

const reduxStore=legacy_createStore(combinedReducers,applyMiddleware(thunk,logger));

export default reduxStore;
