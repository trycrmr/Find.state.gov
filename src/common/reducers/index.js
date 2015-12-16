import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import undoable from 'redux-undo';

import layout from './layout';
import user from './user';

import storiesReducer from './datastory';
import visualizeReducer from './visualize';


const rootReducer = combineReducers({
	user : user,
	layout : undoable(layout),
	storiesReducer : undoable(storiesReducer),
	visualizeReducer: undoable(visualizeReducer),
	router : routerStateReducer
});

export default rootReducer;