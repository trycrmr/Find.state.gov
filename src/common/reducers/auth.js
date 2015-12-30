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
  case USER_INPUT:
  if(action.field === 'email') {
    return {
      ...state,
      email: action.value
    };
  }
  if(action.input.field === 'password') {
    return {
      ...state,
      password: action.input
    };
  }
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