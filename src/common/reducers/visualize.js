import { 
  GET_SETUP, GET_SETUP_SUCCESS, SELECT_SETUP, DESELECT_SETUP,
  GET_DATA, GET_DATA_SUCCESS,
  MODAL_TOGGLE
} from '../actions/visualize';

// Build our Reducer with a default state of an empty array:
const initialState = {
  setupLoaded: false,  // got setup from server
  dataLoaded: false, // got data from server
  setup: {},  // the loading of the menu
  setupSelected: [], // user setup choices 
  currentSetup: {}, // setup used to draw current viz
  data: {}, // data used to draw current viz
  showModal: false // used for toggling the vizualization modal
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
  case SELECT_SETUP:
    var newSelect = state.setupSelected
    newSelect.push({
        setType: action.setType,
        value: action.value
    })
    return {
      ...state,
      setupSelected: newSelect
    };
  case DESELECT_SETUP:
    newSelect = state.setupSelected
    var pos = newSelect.map(function(e) { return e.value }).indexOf(action.value)
    newSelect.splice(pos, 1)
    return {
      ...state,
      setupSelected: newSelect
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