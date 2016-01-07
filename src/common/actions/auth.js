import fetch from 'isomorphic-fetch';
import validator from 'validator';


export const VALIDATE_USER = 'VALIDATE_USER';
export const VALIDATE_USER_COMPLETE = 'VALIDATE_USER_COMPLETE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const INVALID_INPUT = 'INVALID_INPUT';

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

function invalidInput(message) {
  return {
    type: INVALID_INPUT
  };
}

function logoutUser() {
  return {
    type: LOGOUT_USER
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
        dispatch(invalidInput(json.message))
      }
    });
  };
}

export function loggedInUserStatus(input) {
  // the process needs to happen in the browser
  if( process.env.BROWSER ) {
    // first check if token exists
    let token = localStorage.getItem('token');
    if (!token) {
      // user not logged in, just dispatch logout 
      return function (dispatch) {
        // the reducer will clear the user state
        dispatch(logoutUser())
      }
    } else {
      // user claims to already have token
      // process the rest of auth actions
      return function (dispatch, getState) {
        // check to see if user object already exists
        // now validate it with the server
        if (getState().auth.user) {
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


export function loginUserSubmit(input) {
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
