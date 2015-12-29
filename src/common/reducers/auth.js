import { GET_USER } from '../actions/auth';

export default function user(state = {}, action) {
  switch (action.type) {
  case GET_USER:
    return state;
  default:
    return state;
  }
}