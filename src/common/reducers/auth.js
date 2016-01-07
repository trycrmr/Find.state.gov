import { 
  VALIDATE_USER, VALIDATE_COMPLETE_FAILED, VALIDATE_COMPLETE_SUCCESS,
  LOGIN_USER, LOGOUT_USER
} from '../actions/auth';

// Build our Reducer with a default state of an empty array:
const initialState = {
  validating: false,
  loggedIn: false,
  invalidMsg: '',
  user: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
  case VALIDATE_USER:
    return {
      ...state,
      validating: true
    };
  case VALIDATE_COMPLETE_SUCCESS:
    return {
      ...state,
      validating: false,
      loggedIn: true,
      user: action.user
    };
  case VALIDATE_COMPLETE_FAILURE:
    return {
      ...state,
      invalidMsg: action.message
    };
  case LOGIN_USER:
    return {
      ...state,
      loggedIn: true,
    };
  case LOGOUT_USER:
    return {
      ...state,
      loggedIn: false,
      user: null
    };
  default:
    return state;
  }
}