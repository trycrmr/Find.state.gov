import fetch from 'isomorphic-fetch';

// Create our Action Types:
export const GET_SETUP = 'GET_SETUP';
export const GET_SETUP_SUCCESS = 'GET_SETUP_SUCCESS';
export const SELECT_SETUP = 'SELECT_SETUP';
export const DESELECT_SETUP = 'DESELECT_SETUP';
export const GET_DATA = 'GET_DATA';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const MODAL_TOGGLE = 'MODAL_TOGGLE';
export const ENABLE_BUILD = 'ENABLE_BUILD';


/*************************
 *   Build Menu Actions  *
 *************************/

 // actions to be dispatched
function toggleModal(current) {
  return {
    type: MODAL_TOGGLE,
    showModal: !current
  };
}

function addSelect(value, setType) {
    return {
        type: SELECT_SETUP,
        setType: setType,
        name: value
    };
}

function removeSelect(value, setType, index) {
    return {
        type: DESELECT_SETUP,
        setType: setType,
        value: value,
        index: index
    };
}

function buildGate(pass) {
  return {
    type: ENABLE_BUILD,
    value: pass
  }
}

let build_rules = {
  charts: {
    bar: {
      min_indicators: 1,
      min_countries: 1,
      max_indicators: 1,
      max_countries: 100
    },
    line: {
      min_indicators: 1,
      min_countries: 1,
      max_indicators: 4,
      max_countries: 100
    }
  }
}

function checkBuildReady (state) {
    let { 
    selectedIndicators, 
    selectedCountries, 
    selectedChart
    } = state.visualize.present;

    // basic reqs
    if ( selectedChart === '' || !selectedChart )
        return false
    if ( selectedIndicators === [] || !selectedIndicators )
        return false
    if ( selectedCountries === [] || !selectedCountries )
        return false
    // chart specifics
    if (selectedIndicators.length < build_rules.charts[selectedChart].min_indicators) 
        return false
    if (selectedIndicators.length > build_rules.charts[selectedChart].max_indicators)
        return false
    if (selectedCountries.length < build_rules.charts[selectedChart].min_countries)
        return false
    if (selectedCountries.length > build_rules.charts[selectedChart].max_countries)
        return false
    return true
}

// action creators
export function displayModal() {
  return (dispatch, getState) => {
    return dispatch(toggleModal(getState().visualize.present.showModal));
  };
}

export function selectIndicator(indicator) {
    return (dispatch, getState) => {
        var index = getState().visualize.present.selectedIndicators.indexOf(indicator)
        if ( index === -1 ) {
            dispatch(addSelect(indicator, "indicators"));
        } else {
            dispatch(removeSelect(indicator, "indicators", index));
        }

        dispatch(buildGate(checkBuildReady(getState())))
    }
}

export function selectCountry(country) {
    return (dispatch, getState) => {
        var index = getState().visualize.present.selectedCountries.indexOf(country)
        if ( index === -1 ) {
            dispatch(addSelect(country, "countries"));
        } else {
            dispatch(removeSelect(country, "countries", index));
        }

        dispatch(buildGate(checkBuildReady(getState())))
    }
}

export function selectChart(chart) {
    return (dispatch, getState) => {
        // there can be only one chart
        // in the reducer make sure you just replace it
        dispatch(addSelect(chart, "chart"));
        dispatch(buildGate(checkBuildReady(getState())))
    }
}

/***************************
 *   Setup-Server Actions  *
 ***************************/

// actions to be dispatched to reducer
function requestSetup() {
  return {
    type: GET_SETUP
  };
}

function receiveSetup(json) {
  return {
    type: GET_SETUP_SUCCESS,
    setup: json,
    receivedAt: Date.now()
  };
}

// action creator functionality
function fetchSetup() {
  // thunk middleware knows how to handle functions
  return function (dispatch) {
    dispatch(requestSetup());

    // Return a promise to wait for
    return fetch('http://localhost:3000/visualize/setup')
      .then(response => response.json())
      .then(json => {
        dispatch(receiveSetup(json))
      });
  };
}

// action creator
export function fetchSetupIfNeeded() {
  return (dispatch, getState) => {
    // No need to call the external API if data is already in memory:
    if ( getState().visualize.present.setupLoaded ) {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    } else {
      return dispatch(fetchSetup());
    }
  };
}

/********************
 *   Data Actions   *
 ********************/

// actions to be dispatched
function requestData() {
  return {
    type: GET_DATA
  };
}

function receiveData(json) {
  return {
    type: GET_DATA_SUCCESS,
    data: json,
    receivedAt: Date.now()
  };
}

// action functionality
function fetchData() {
  // thunk middleware knows how to handle functions
  return function (dispatch) {
    dispatch(requestData());

    // Return a promise to wait for
    return fetch('http://localhost:3000/visualize/data')
      .then(response => response.json())
      .then(json => {
        var array = json;
        dispatch(receiveData(array))
      });
  };
}

// action creators
export function fetchDataIfNeeded() {
  return (dispatch, getState) => {
    // No need to call the external API if data is already in memory:
    if ( getState().data && getState().data.loaded ) {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    } else {
      return dispatch(fetchData());
    }
  };
}


     