import fetch from 'isomorphic-fetch';

// Create our Action Types:
export const GET_SETUP = 'GET_SETUP';
export const GET_SETUP_SUCCESS = 'GET_SETUP_SUCCESS';
export const SELECT_SETUP = 'SELECT_SETUP';
export const DESELECT_SETUP = 'DESELECT_SETUP';
export const GET_DATA = 'GET_DATA';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const MODAL_TOGGLE = 'MODAL_TOGGLE';


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
        value: value
    };
}

function removeSelect(value, setType) {
    return {
        type: DESELECT_SETUP,
        setType: setType,
        value: value
    };
}

// action creators
export function displayModal() {
  return (dispatch, getState) => {
    return dispatch(toggleModal(getState().visualize.present.showModal));
  };
}

export function selectIndicator(indicator) {
  return (dispatch, getState) => {
    var list = getState().visualize.present.setupSelected;
    var pos = list.map(function(e) { return e.value }).indexOf(indicator)
    console.log(pos)
    if ( pos != -1 ) {
        // remove from state
        return dispatch(removeSelect(indicator, "indicators"));
    } else {
        // add to state
        return dispatch(addSelect(indicator, "indicators"));
    }
  }
}

export function selectCountry(country) {
  return (dispatch, getState) => {
    var list = getState().visualize.present.setupSelected;
    var pos = list.map(function(e) { return e.value }).indexOf(country)
    console.log(pos)
    if ( pos != -1 ) {
        // remove from state
        return dispatch(removeSelect(country, "countries"));
    } else {
        // add to state
        return dispatch(addSelect(country, "countries"));
    }
  }
}

export function selectChart(chart) {
    return (dispatch, getState) => {
        // there can be only one chart
        // in the reducer make sure you just replace it
        return dispatch(addSelect(chart, "chart"));
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


     