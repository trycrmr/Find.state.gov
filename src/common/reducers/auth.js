import { 
  VALIDATE_USER, VALIDATE_USER_COMPLETE,
  LOGOUT_USER, LOGOUT_USER_COMPLETE
} from '../actions/auth';

// Build our Reducer with a default state of an empty array:
const initialState = {
  validating: false,
  loggingOut: false,
  loggedIn: false,
  token: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {
  case VALIDATE_USER:
    return {
      ...state,
      validating: true
    };
  case VALIDATE_USER_COMPLETE:
    return {
      ...state,
      validating: false,
      loggedIn: true,
      token: action.token
    };
  case LOGOUT_USER:
    return {
      ...state,
      loggingOut: true,
    };
  case LOGOUT_USER_COMPLETE:
    return {
      ...state,
      validating: false,
      loggingOut: false,
      loggedIn: false,
      token: null
    };
  default:
    return state;
  }
}