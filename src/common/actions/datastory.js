import fetch from 'isomorphic-fetch';

// Create our Action Types:
export const GET_STORIES = 'GET_STORIES';
export const GET_STORIES_SUCCESS = 'GET_STORIES_SUCCESS';

// Build our actions
function requestStories() {
  return {
    type: GET_STORIES
  };
}

function receiveStories(json) {
  return {
    type: GET_STORIES_SUCCESS,
    stories: json
  };
}

// Build action creaters that return a function instead of the
// actions above (thanks to redux-thunk middleware):
function fetchStories() {
  // thunk middleware knows how to handle functions
  return function (dispatch) {
    dispatch(requestStories());

    // Return a promise to wait for
    return fetch('http://localhost:8080/setup/datastories')
      .then(response => response.json())
      .then(json => {
        var array = json.datastories;
        dispatch(receiveStories(array))
      });
  };
}

export function isLoaded(globalState) {
  return globalState.datastories && globalState.datastories.loaded;
}

// No need to call the external API if data is already in memory:
export function fetchStoriesIfNeeded() {
  return (dispatch, getState) => {
    if ( isLoaded(getState()) ) {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    } else {
      // Dispatch a thunk from thunk!
      return dispatch(fetchStories());
    }
  };
}