import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk'
import pace from './reducers/paceReducer';
import app from './reducers/appReducer';

const rootReducer = combineReducers({ app, pace});

const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose

const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(
        thunkMiddleware
    )));

export default store;
