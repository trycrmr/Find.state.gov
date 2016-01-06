import fetch from 'isomorphic-fetch';
import validator from 'validator';


export const VALIDATE_USER = 'VALIDATE_USER';
export const VALIDATE_USER_COMPLETE = 'VALIDATE_USER_COMPLETE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_COMPLETE = 'LOGOUT_USER_COMPLETE';

function requestValidation() {
  return {
    type: VALIDATE_USER
  };
}

function receiveValidation(json) {
  return {
    type: VALIDATE_USER_COMPLETE
  };
}

function invalidInput(input) {
  return {
    type: VALIDATE_USER_COMPLETE,
    message: json.msg,
    token: json.jwt
  };
}

// TODO : Add logout actions

// Build action creaters (export funcs) that return a function instead of the
// actions above (thanks to redux-thunk middleware):

function setSessionToken(json) {
  if (json || json.token != null || !json.valid) {
    localStorage.setItem('token', json.token);
  }
}

function fetchUser(token) {
  // thunk middleware knows how to handle functions
  return function (dispatch) {
    dispatch(requestValidation());

    let savedToken = localStorage.getItem('token');
    if (savedToken !== token) {
    // if the jwt passed in and the jwt in localStorage don't match, then we redirect them to the manual login page to reprompt for password
    // TODO: AUTO LOGIN FAILURE, CLEAR JWT AND USER STATE
    } else {
      // Return a promise to wait for
      return fetch('http://localhost:8080/user/validate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token
        })
      })
      .then(response => response.json())
      .then(json => {
        setSessionToken(json)
        dispatch(receiveValidation(json))
      });
    }
  };
}

export function fetchUserIfNeeded() {
  return (dispatch, getState) => {

    // session token
    let token = localStorage.getItem('token');
    
    // if no session exits, then there is no user
    if ( !token ) {
      // no user token, not logged in
      return Promise.resolve();
    } else if(getState().auth.present.loggedIn) {
      // there is a token and stored user state
      return Promise.resolve();
    } else {
      // theres a token but no user state
      return dispatch(fetchUser(token));
    }
  };
}

export function loginUser(input) {
  // thunk middleware knows how to handle functions
  return function (dispatch) {
    //dispatch(requestValidation());
    console.log(input)

    // Return a promise to wait for
    return fetch('http://localhost:8080/user/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: input.email,
        password: input.pass
      })
    }).then(response => response.json())
      .then(json => {
        setSessionToken(json)
        dispatch(receiveValidation(json))
      });
  };
}

export function registerUser(input) {
  // thunk middleware knows how to handle functions
  return function (dispatch) {
    dispatch(requestValidation());

    // Return a promise to wait for
    return fetch('http://localhost:8080/user/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: input.reg_email,
        name: input.reg_name,
        password: input.reg_pass
      })
    }).then(response => response.json())
      .then(json => {
        // on a successful registration lets log them in
        console.log(json)
        setSessionToken(json)
        dispatch(receiveValidation(json))
      });
  };
}
