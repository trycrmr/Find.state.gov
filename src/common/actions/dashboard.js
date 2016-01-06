import fetch from 'isomorphic-fetch';

// Create our Action Types
export const GET_USER_DATA = 'GET_USER_DATA';
export const RECIEVE_USER_DATA = 'RECIEVE_USER_DATA';

// Build our actions
function requestUserData() {
  return {
    type: GET_USER_DATA
  };
}

function receiveUserData(json) {
  return {
    type: RECIEVE_USER_DATA,
    user: json
  };
}

// Build action creaters that return a function instead of the
// actions above (thanks to redux-thunk middleware):
function fetchUserData() {
  // thunk middleware knows how to handle functions
  return function (dispatch) {
    dispatch(requestUserData());

    // Return a promise to wait for
    return fetch('http://localhost:3000/setup/datastories')
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