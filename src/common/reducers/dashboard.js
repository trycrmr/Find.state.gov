import { 
  GET_USER_DATA, RECEIVE_USER_DATA,
  REQUEST_INDICATORS, RECEIVE_INDICATORS
} from '../actions/dashboard';

// Build our Reducer with a default state of an empty array:
const initialState = {
  indicators: [],
  indicatorsLoaded: false,
  loaded: false,
  loading: false,
  userData: {}
};

export default function dashboard(state = initialState, action) {
  switch (action.type) {
  case REQUEST_INDICATORS:
    return state;
  case RECEIVE_INDICATORS:
    return {
      ...state,
      indicators: action.indicators,
      indicatorsLoaded: true
    };
  case GET_USER_DATA:
    return {
      ...state,
      loading: true
    };
  case RECEIVE_USER_DATA:
    return {
      ...state,
      loading: false,
      loaded: true,
      user: action.user
    };
  default:
    return state;
  }
}
