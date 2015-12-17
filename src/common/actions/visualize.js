import fetch from 'isomorphic-fetch';

// Create our Action Types:
export const GET_SETUP = 'GET_SETUP';
export const GET_SETUP_SUCCESS = 'GET_SETUP_SUCCESS';
export const GET_DATA = 'GET_DATA';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';

// Build our actions
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

// Build action creaters that return a function instead of the
// actions above (thanks to redux-thunk middleware):

function fetchSetup() {
  // thunk middleware knows how to handle functions
  return function (dispatch) {
    dispatch(requestSetup());

    // Return a promise to wait for
    return fetch('http://localhost:3000/visualize/setup')
      .then(response => response.json())
      .then(json => {
        var array = json;
        console.log("============================================");
        console.log(json);
        dispatch(receiveSetup(array))
      });
  };
}

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

export function setupLoaded(globalState) {
  return globalState.setup && globalState.setup.loaded;
}

export function dataLoaded(globalState) {
  return globalState.data && globalState.data.loaded;
}

// No need to call the external API if data is already in memory:
export function fetchSetupIfNeeded() {
  return (dispatch, getState) => {
    if ( setupLoaded(getState()) ) {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    } else {
      // not loaded, request from api
      return dispatch(fetchSetup());
    }
  };
}

// No need to call the external API if data is already in memory:
export function fetchDataIfNeeded() {
  return (dispatch, getState) => {
    if ( dataLoaded(getState()) ) {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    } else {
      // not loaded, request from api
      return dispatch(fetchData());
    }
  };
}