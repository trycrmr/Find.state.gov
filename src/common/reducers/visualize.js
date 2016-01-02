import { 
  GET_SETUP, GET_SETUP_SUCCESS, SELECT_SETUP, DESELECT_SETUP,
  GET_DATA, GET_DATA_SUCCESS,
  MODAL_TOGGLE,
  ENABLE_BUILD
} from '../actions/visualize';

// Build our Reducer with a default state of an empty array:
const initialState = {
  setupLoaded: false,  // got setup from server
  dataLoaded: false, // got data from server
  categories: [],  // the loading of the menu
  countries: [],
  selectedIndicators: [],
  selectedCountries: [],
  selectedChart: '', // user setup choices 
  data: {}, // data used to draw current viz
  showModal: false, // used for toggling the vizualization modal
  buildReady: false
};

export default function visualize(state = initialState, action) {
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
    if ( action.setType === 'indicators') {
        return {
            ...state,
            selectedIndicators: state.selectedIndicators.concat( action.name )
        };
    }
    if ( action.setType === 'countries') {
        return {
            ...state,
            selectedCountries: state.selectedCountries.concat( action.name )
        };
    }
    if ( action.setType === 'chart') {
        return {
            ...state,
            selectedChart: action.name
        };
    }
    return state;
  case DESELECT_SETUP:
    if ( action.setType === 'indicators') {
        var inds = state.selectedIndicators.slice()
        inds.splice(action.index, 1)
        return {
            ...state,
            selectedIndicators: inds
        };
    }
    if ( action.setType === 'countries') {
        var ctys = state.selectedCountries.slice()
        ctys.splice(action.index, 1)
        return {
            ...state,
            selectedCountries: ctys
        };
    }
    return state;
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
      showModal: true,
      data: action.data
    };
  case MODAL_TOGGLE:
    return {
      ...state,
      showModal: action.showModal
    };
  case ENABLE_BUILD:
    return {
      ...state,
      buildReady: action.value
    };
  default:
    return state;
  }
}