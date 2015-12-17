import { 
  GET_SETUP, GET_SETUP_SUCCESS,
  GET_DATA, GET_DATA_SUCCESS,
  MODAL_TOGGLE
} from '../actions/visualize';

// Build our Reducer with a default state of an empty array:
const initialState = {
  setupLoaded: false,
  dataLoaded: false,
  setup: {},
  setupSelected: {},
  data: {},
  showModal: false
};

export default function visualizeReducer(state = initialState, action) {
  switch (action.type) {
  case GET_SETUP:
    return {
      ...state,
      setupLoading: true
    };
  case GET_SETUP_SUCCESS:
    return {
      ...state,
      setupLoading: false,
      setupLoaded: true,
      lastUpdated: Date.now(),
      setup: action.setup
    };
  case GET_DATA:
    return {
      ...state,
      dataLoading: true
    };
  case GET_DATA_SUCCESS:
    return {
      ...state,
      dataLoading: false,
      dataLoaded: true,
      lastUpdated: Date.now(),
      data: action.data
    };
  case MODAL_TOGGLE:
    return {
      ...state,
      showModal: action.showModal
    };
  default:
    return state;
  }
}