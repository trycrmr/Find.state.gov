import { bindActionCreators } from 'redux'
import React, { Component} from 'react'
import { connect } from 'react-redux'
import Auth from '../components/Auth'
import * as AuthActions from '../actions/auth'

// Data that needs to be called before rendering the component
// This is used for server side rending via the fetchComponentDataBeforeRending() method
Auth.need = [
  AuthActions.loginUserProcess,
  AuthActions.loginUserSubmit,
  AuthActions.registerUserSubmit
]

function mapStateToProps(state) {
    
    let { auth } = state;

    auth = auth.present;

    const {
        validating,
        loggedIn,
        user,
        invalidMsg
    } = auth || {
        validating: false,
        loggedIn: false,
        user: {},
        invalidMsg: ''
    };
    return {
        validating,
        loggedIn,
        user,
        invalidMsg
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);