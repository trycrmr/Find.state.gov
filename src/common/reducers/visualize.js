import { 
  GET_SETUP, GET_SETUP_SUCCESS, SELECT_SETUP, DESELECT_SETUP,
  GET_DATA, GET_DATA_SUCCESS,
  MODAL_TOGGLE
} from '../actions/visualize';

// Build our Reducer with a default state of an empty array:
const initialState = {
  setupLoaded: false,  // got setup from server
  dataLoaded: false, // got data from server
  categories: [],  // the loading of the menu
  countries: [],
  setupSelected: {
    indicators: [],
    countries: [],
    chart: ''
  }, // user setup choices 
  data: {}, // data used to draw current viz
  showModal: false // used for toggling the vizualization modal
};

export default function Visualize(state = initialState, action) {
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
      countries: action.setup.countries,
      categories: action.setup.categories
    };
  case SELECT_SETUP:
    var newSelect = state.setupSelected
    if ( action.setType === 'indicators') {
      newSelect.indicators.push({
          name: action.name
      })
    }
    if ( action.setType === 'countries') {
      newSelect.countries.push({
          name: action.name
      })
    }
    if ( action.setType === 'chart') {
      newSelect.chart = action.name
    }
    return {
      ...state,
      setupSelected: newSelect
    };
  case DESELECT_SETUP:
    return {
      state
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