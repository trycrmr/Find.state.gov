import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import undoable from 'redux-undo';

import layout from './layout';
import storiesReducer from './datastory';
import user from './user';

const rootReducer = combineReducers({
	user : user,
  layout : undoable(layout),
  storiesReducer : undoable(storiesReducer),
  router : routerStateReducer
});

export default rootReducer;