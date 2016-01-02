import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import undoable from 'redux-undo'

import auth from './auth'
import stories from './datastory'
import visualize  from './visualize'
import dashboard  from './dashboard'


const rootReducer = combineReducers({
	auth : auth,
	datastories : undoable(stories),
	visualize: undoable(visualize),
	dashboard: undoable(dashboard),
	router : routerStateReducer
});

export default rootReducer;