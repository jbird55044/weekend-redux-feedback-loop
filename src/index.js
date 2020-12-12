import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';


const getFeedback = (state=[], action) => {
    if (action.type === 'GET_FEEDBACK') {
        console.log (`in getFeedback`);
        return [action.payload];
    }
    return state;
};


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

const currentComment = (state = '', action) => {
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
        currentComment
    }),
    applyMiddleware(logger),

);




ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
 