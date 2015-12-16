import { 
  GET_STORIES, GET_STORIES_SUCCESS
} from '../actions/datastory';

// Build our Reducer with a default state of an empty array:
const initialState = {
  loaded: false,
  stories: []
};

export default function storiesReducer(state = initialState, action) {
  switch (action.type) {
  case GET_STORIES:
    return {
      ...state,
      loading: true
    };
  case GET_STORIES_SUCCESS:
    return {
      ...state,
      loading: false,
      loaded: true,
      lastUpdated: Date.now(),
      stories: action.stories
    };
  default:
    return state;
  }
}
