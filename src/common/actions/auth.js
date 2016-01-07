import fetch from 'isomorphic-fetch';
import validator from 'validator';

export const VALIDATE_USER = 'VALIDATE_USER';
export const VALIDATE_COMPLETE_SUCCESS = 'VALIDATE_COMPLETE_SUCCESS';
export const VALIDATE_COMPLETE_FAILED = 'VALIDATE_COMPLETE_FAILED';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER = 'LOGIN_USER';

function requestValidation() {
  return {
    type: VALIDATE_USER
  };
}

function receiveValidation(user) {
  return {
    type: VALIDATE_COMPLETE_SUCCESS,
    user: user
  };
}

function receiveValidationFailed(message) {
  return {
    type: VALIDATE_COMPLETE_FAILED,
    message: message
  };
}

function loginUser() {
  return {
    type: LOGIN_USER
  };
}

function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}

// Build action creaters (export funcs) that return a function instead of the
// actions above (thanks to redux-thunk middleware):

function setSessionToken(json) {
  if (json || json.token != null || !json.valid) {
    localStorage.setItem('token', json.token);
  }
}

// TODO : Add logout actions -- tokens


function validateToken(token) {
  
  return function (dispatch) {
    // tell the reducer we are currently validating the user token
    dispatch(requestValidation());

    // ask the server to validate the current token
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
      if (json.valid) {
        dispatch(receiveValidation(json.user))
      } else {
        // server responded with invalid
        localStorage.removeItem('token');
        dispatch(receiveValidationFailed(json.message))
      }
    });
  };
}

export function loginUserProcess(input) {
  return function (dispatch) {
    // the process needs to happen in the browser
    if( process.env.BROWSER ) {
      // first check if token exists
      let token = localStorage.getItem('token');
      if (!token || token === "undefined") {
        // user not logged in, just dispatch logout 
        // the reducer will clear the user state
        localStorage.removeItem('token');
        dispatch(logoutUser())
      } else {
        // user claims to already have token
        // process the rest of auth actions
        return function (dispatch, getState) {
          // check to see if user object already exists
          // now validate it with the server
          var user = getState().auth.user
          if (user && user != undefined && user != {}) {
            // user exists, dispatch login granted
            return dispatch(loginUser())
          } else {
            // user object doesn't exist, but they have the token
            // so request the object from server, send along with token
            return validateToken(token);
          }
        } 
      } 
    }
  }
}

export function loginUserSubmit(input) {
  // thunk middleware knows how to handle functions
  return function (dispatch) {
    // let reducer know we are currently validating
    dispatch(requestValidation());
  
    // ask server to validate login info
    return fetch('http://localhost:8080/user/validateLogin', {
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
        if(json.valid) {
          // on a successful registration lets log them in
          setSessionToken(json.token)
          dispatch(receiveValidation(json.user))
        } else {
          localStorage.removeItem('token');
          dispatch(receiveValidationFailed(json.message))
        }
      });
  };
}

export function registerUserSubmit(input) {
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
        if(json.valid) {
          // on a successful registration lets log them in
          setSessionToken(json.token)
          dispatch(receiveValidation(json.user))
        } else {
          localStorage.removeItem('token');
          dispatch(receiveValidationFailed(json.message))
        }
      });
  };
}
