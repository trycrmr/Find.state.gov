import fetch from 'isomorphic-fetch';



//
//  INDICATORS
//
//



/** 1 Create our Action Types **/
// this is the action type that means we are currently getting indicators for the view
export const REQUEST_INDICATORS = 'REQUEST_INDICATORS'
// this is the action type that means the indicators were received
export const RECEIVE_INDICATORS = 'RECEIVE_INDICATORS'

/** 2 Build our actions **/

// this is what is given to the reducer to change state (if applicable)
// in this case it shouldn't do anything
function requestIndicators() {
  return {
    type: REQUEST_INDICATORS
  };
}
// this is what is given to the reducer to change state (if applicable)
// ithis means the indicators were recieved, send those to reducer
// so it can change the state
function receiveIndicators(indicators) {
  return {
    type: RECEIVE_INDICATORS,
    indicators: indicators
  };
}


/** 3 Build action creaters that return a function instead of the **/

function fetchIndicators() {
  // thunk middleware knows how to handle functions
  return function (dispatch) {
    dispatch(requestIndicators());

    // Return a promise to wait for
    return fetch('http://localhost:8080/setup/indicators')
      .then(response => response.json())
      .then(indicators => {
        console.log(indicators)
        dispatch(receiveIndicators(indicators))
      });
  };
}

// No need to call the external API if data is already in memory:
export function fetchIndicatorsIfNeeded() {
  return (dispatch, getState) => {
    if ( getState().dashboard.present.indicatorsLoaded ) {
      // indicators loaded, do nothing
      return Promise.resolve();
    } else {
      // Dispatch a thunk from thunk!
      return dispatch(fetchIndicators());
    }
  };
}


//
//  USER DATA
//
//

/** 1 Create our Action Types **/
export const REQUEST_USER_DATA = 'REQUEST_USER_DATA';
export const RECIEVE_USER_DATA = 'RECIEVE_USER_DATA';



function requestUserData() {
  return {
    type: REQUEST_USER_DATA
  };
}

function receiveUserData(json) {
  return {
    type: RECIEVE_USER_DATA,
    user: json
  };
}


function fetchUserData() {
  // thunk middleware knows how to handle functions
  return function (dispatch) {
    dispatch(requestUserData());

    // Return a promise to wait for
    return fetch('http://localhost:8080/setup/datastories')
      .then(response => response.json())
      .then(json => {
        dispatch(receiveUserData(json))
      });
  };
}

// No need to call the external API if data is already in memory:
export function fetchUserDataIfNeeded() {
  return (dispatch, getState) => {
    if ( getState() ) {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    } else {
      // Dispatch a thunk from thunk!
      return dispatch(fetchUserData());
    }
  };
}