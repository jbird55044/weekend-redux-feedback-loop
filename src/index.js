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

// TODO - 
// Items in the cart, this reducer is incomplete
// const checkoutReducer = (state = [], action) => {
//     // TODO: Products added to the cart
//     if (action.type === 'ADD_TO_CART') {
//         return [...state, action.payload];
//     } else if ( action.type === 'EMPTY_CART') {
//         return state = [];
//     }
//     return state;
// };


// The store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    combineReducers({
        getFeedback,
        // checkoutReducer
    }),
    applyMiddleware(logger),

);




ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
 