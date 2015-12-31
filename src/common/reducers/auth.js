import { 
	USER_INPUT, GET_USER, GET_USER_SUCCESS
} from '../actions/auth';

// Build our Reducer with a default state of an empty array:
const initialState = {
  loggedIn: false,
  user: {}
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
  case GET_USER:
    return {
      ...state,
      validating: true
    };
  case GET_USER_SUCCESS:
    return {
      ...state,
      validating: false,
      loggedIn: true,
      stories: action.stories
    };
  default:
    return state;
  }
}