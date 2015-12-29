import fetch from 'isomorphic-fetch';


export const GET_USER = 'GET_USER';

export function requestUser(value) {
  return {
    type: GET_USER,
    payload: value
  };
}

function receiveUser(json) {
  return {
    type: GET_USER_SUCCESS,
    user: json
  };
}

// Build action creaters that return a function instead of the
// actions above (thanks to redux-thunk middleware):
function fetchUser() {
  // thunk middleware knows how to handle functions
  return function (dispatch) {
    dispatch(requestStories());

    // Return a promise to wait for
    return fetch('http://localhost:3000/setup/datastories')
      .then(response => response.json())
      .then(json => {
        dispatch(receiveUser(json))
      });
  };
}

// No need to call the external API if data is already in memory
// or if user is not logged in yet
export function fetchStoriesIfNeeded() {
  return (dispatch, getState) => {
    if ( true === true ) {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    } else {
      // Dispatch a thunk from thunk!
      return dispatch(fetchUser());
    }
  };
}