import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Populates with db data upon load and db updates
const getFeedback = (state=[], action) => {
    if (action.type === 'GET_FEEDBACK') {
        console.log (`in getFeedback`);
        return action.payload;
    }
    return state;
};

// used to hold survey response between modules
const currentFeeling = (state = 0, action) => {
    // TODO: Products added to the cart
    if (action.type === 'CURRENT_FEELING') {
       return action.payload;
    }
    if (action.type === 'CURRENT_DELETE') {
        return state= 0;
    }
    return state;
};

// used to hold survey response between modules
const currentUnderstanding = (state = 0, action) => {
    // TODO: Products added to the cart
    if (action.type === 'CURRENT_UNDERSTANDING') {
       return action.payload;
    }
    if (action.type === 'CURRENT_DELETE') {
        return state = 0;
    }
    return state;
};

// used to hold survey response between modules
const currentSupported = (state = 0, action) => {
    // TODO: Products added to the cart
    if (action.type === 'CURRENT_SUPPORTED') {
       return action.payload;
    }
    if (action.type === 'CURRENT_DELETE') {
        return state = 0;
    }
    return state;
};

// used to hold survey response between modules
const currentComments = (state = '', action) => {
    // TODO: Products added to the cart
    if (action.type === 'CURRENT_COMMENT') {
       return action.payload;
    }
    if (action.type === 'CURRENT_DELETE') {
        return state='';
    }
    return state;
};

// The store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    combineReducers({
        getFeedback,
        currentFeeling, 
        currentUnderstanding,
        currentSupported,
        currentComments
    }),
    applyMiddleware(logger),

);




ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
 