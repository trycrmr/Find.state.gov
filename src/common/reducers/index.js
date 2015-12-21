import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import undoable from 'redux-undo';

import user from './user';

import stories from './datastory';
import visualize  from './visualize';


const rootReducer = combineReducers({
	user : user,
	datastories : undoable(stories),
	visualize: undoable(visualize),
	router : routerStateReducer
});

export default rootReducer;