import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import createBrowserHistory from 'history/lib/createBrowserHistory'

import configureStore from '../common/store/configureStore';
import routes from '../common/routes';

import "../assets/styles/index.css";

const history = createBrowserHistory();
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

/**
 * IMPORTANT
 * if you need to run code on the client use this variable
 * example: process.env.BROWSER ? //client-code : //server-code
 */
process.env.BROWSER = true;

ReactDOM.render(
  <Provider store={store}>
        <ReduxRouter>
  			<Router children={routes} history={history} />
        </ReduxRouter>
  </Provider>,
  document.getElementById('root')
);
