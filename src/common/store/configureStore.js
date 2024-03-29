import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const middlewareBuilder = () => {

  let middleware = {};
  let universalMiddleware = [thunk];
  let allComposeElements = [];
  
  if(process.browser){
    // production || testing
    if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'){
      middleware = applyMiddleware(...universalMiddleware);
      allComposeElements = [
        middleware,
        reduxReactRouter({
          createHistory
        })
      ]
    }else{
      // development
      middleware = applyMiddleware(...universalMiddleware,createLogger());
      allComposeElements = [
        middleware,
        reduxReactRouter({
          createHistory
        })
      ]
    }
  }else{
    middleware = applyMiddleware(...universalMiddleware);
    allComposeElements = [
      middleware
    ]
  }

  return allComposeElements;

}

const finalCreateStore = compose(...middlewareBuilder())(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}