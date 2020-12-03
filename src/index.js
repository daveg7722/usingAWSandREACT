import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import searchReducer from './store/searchReducer';
import userReducer from './store/userReducer';
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import {watchSearch} from './store/sagas'
import {BrowserRouter} from 'react-router-dom'

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);


const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({search: searchReducer, user: userReducer});
const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(watchSearch);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
