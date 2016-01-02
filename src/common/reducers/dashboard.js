import { 
  GET_USER_DATA, RECIEVE_USER_DATA
} from '../actions/dashboard';

// Build our Reducer with a default state of an empty array:
const initialState = {
  loaded: false,
  loading: false,
  userData: {}
};

export default function dashboard(state = initialState, action) {
  switch (action.type) {
  case GET_USER_DATA:
    return {
      ...state,
      loading: true
    };
  case RECIEVE_USER_DATA:
    return {
      ...state,
      loading: false,
      loaded: true,
      userData: action.userData
    };
  default:
    return state;
  }
}
